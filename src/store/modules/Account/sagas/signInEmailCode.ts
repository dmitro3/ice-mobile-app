// SPDX-License-Identifier: ice License 1.0

import {EMAIL_CODE_GET_STATUS_INTERVAL_SEC} from '@constants/timeouts';
import {
  getConfirmationStatus,
  persistToken,
  sendCustomSignInLinkToEmail,
} from '@services/auth';
import {logError} from '@services/logging';
import {AccountActions} from '@store/modules/Account/actions';
import {appLocaleSelector} from '@store/modules/Account/selectors';
import {deviceUniqueIdSelector} from '@store/modules/Devices/selectors';
import {t} from '@translations/i18n';
import {getErrorMessage} from '@utils/errors';
import {checkProp} from '@utils/guards';
import jwt_decode from 'jwt-decode';
import {
  call,
  delay,
  put,
  race,
  SagaReturnType,
  select,
  take,
} from 'redux-saga/effects';

enum ValidateError {
  InvalidEmail,
}

export function* signInEmailCodeSaga(
  startAction: ReturnType<
    typeof AccountActions.SIGN_IN_EMAIL_CODE.START.create
  >,
) {
  try {
    const email = startAction.payload.email;

    yield put(
      AccountActions.ADD_LOG.STATE.create(
        'signInEmailCode start for email: ' + email,
      ),
    );

    if (!email) {
      throw {code: ValidateError.InvalidEmail};
    }

    const deviceUniqueId: SagaReturnType<typeof deviceUniqueIdSelector> =
      yield select(deviceUniqueIdSelector);

    yield put(
      AccountActions.ADD_LOG.STATE.create('deviceUniqueId: ' + deviceUniqueId),
    );

    const language: SagaReturnType<typeof appLocaleSelector> = yield select(
      appLocaleSelector,
    );

    yield put(AccountActions.ADD_LOG.STATE.create('language: ' + language));

    const {loginSession}: SagaReturnType<typeof sendCustomSignInLinkToEmail> =
      yield call(sendCustomSignInLinkToEmail, {
        email,
        deviceUniqueId,
        language,
      });

    yield put(
      AccountActions.ADD_LOG.STATE.create(
        'getting login session success: ' + loginSession,
      ),
    );

    const loginSessionPayload = jwt_decode(loginSession);

    yield put(
      AccountActions.ADD_LOG.STATE.create(
        'loginSessionPayload: ' + JSON.stringify(loginSessionPayload),
      ),
    );

    if (!checkProp(loginSessionPayload, 'confirmationCode')) {
      throw new Error('confirmationCode is not found in loginSession');
    }

    if (typeof loginSessionPayload.confirmationCode !== 'string') {
      throw new Error('confirmationCode is not a string');
    }

    yield put(
      AccountActions.SIGN_IN_EMAIL_CODE.SET_TEMP_EMAIL.create({
        email,
        code: loginSessionPayload.confirmationCode,
      }),
    );

    while (true) {
      const {reset} = yield race({
        reset: take(AccountActions.SIGN_IN_EMAIL_CODE.RESET.type),
        delay: delay(EMAIL_CODE_GET_STATUS_INTERVAL_SEC * 1000),
      });

      if (reset) {
        return;
      }

      const status: SagaReturnType<typeof getConfirmationStatus> = yield call(
        getConfirmationStatus,
        {loginSession},
      );

      yield put(
        AccountActions.ADD_LOG.STATE.create(
          'confirmation status: ' + JSON.stringify(status.response),
        ),
      );

      if (
        status.confirmed &&
        checkProp(status, 'accessToken') &&
        checkProp(status, 'refreshToken')
      ) {
        yield call(persistToken, {
          accessToken: status.accessToken,
          refreshToken: status.refreshToken,
          issuer: 'custom',
        } as const);

        yield put(AccountActions.SIGN_IN_EMAIL_CODE.SUCCESS.create());
        yield put(AccountActions.USER_STATE_CHANGE.START.create());
        return;
      }
    }
  } catch (error) {
    logError(error);
    yield put(
      AccountActions.ADD_LOG.STATE.create(
        'confirmation status error: ' +
          //@ts-ignore
          JSON.stringify(error.code) +
          '\n' +
          JSON.stringify(error),
      ),
    );
    if (checkProp(error, 'code') && error.code === ValidateError.InvalidEmail) {
      yield put(
        AccountActions.SIGN_IN_EMAIL_CODE.FAILED.create(
          t('errors.invalid_email'),
        ),
      );
    } else {
      yield put(
        AccountActions.SIGN_IN_EMAIL_CODE.FAILED.create(getErrorMessage(error)),
      );
      throw error;
    }
  }
}
