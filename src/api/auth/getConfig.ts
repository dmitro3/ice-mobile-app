// SPDX-License-Identifier: ice License 1.0

import {AuthConfig} from '@api/auth/types';
import {get} from '@api/client';
import {ENV} from '@constants/env';

export function getConfig() {
  return get<AuthConfig>(ENV.AUTH_CONFIG_URL ?? '');
}
