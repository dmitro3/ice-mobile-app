// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {useAnimatedNumber} from '@hooks/useAnimatedNumber';
import {userReferralCountSelector} from '@store/modules/Referrals/selectors';
import {TeamInactiveIcon} from '@svg/TeamInactiveIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const ReferralsCell = memo(
  ({color = COLORS.white}: {color?: string}) => {
    const refsCount = useSelector(userReferralCountSelector);

    const animatedRefsCount = useAnimatedNumber(refsCount, formatNumber);

    return (
      <View style={styles.container}>
        <TeamInactiveIcon color={color} width={rem(38)} height={rem(38)} />
        <View style={styles.body}>
          <Text style={[styles.titleText, {color}]}>
            {t('team.header.referrals')}
          </Text>
          <Text style={[styles.valueText, {color}]}>{animatedRefsCount}</Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  body: {
    marginLeft: rem(10),
    justifyContent: 'center',
  },
  titleText: {
    ...font(12, 18, 'medium'),
    opacity: 0.7,
  },
  valueText: {
    paddingTop: rem(2),
    ...font(15, 18, 'bold'),
  },
});
