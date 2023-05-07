// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const LampInactiveIcon = (props: SvgProps) => (
  <Svg
    width={rem(16)}
    height={rem(21)}
    fill="none"
    viewBox="0 0 16 21"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 1.46512C4.19 1.46512 1.5 4.14433 1.5 7.44181C1.5 8.94209 2.132 9.954 2.925 10.919C3.097 11.129 3.272 11.3312 3.452 11.5393L3.548 11.6487C3.758 11.8928 3.975 12.1448 4.178 12.4047C4.582 12.9233 4.961 13.5064 5.173 14.196C5.22492 14.3804 5.20094 14.5774 5.10619 14.7447C5.01144 14.9121 4.85342 15.0366 4.66591 15.0917C4.47839 15.1468 4.27626 15.1281 4.10268 15.0396C3.92911 14.9511 3.79787 14.7997 3.737 14.618C3.599 14.1687 3.34 13.7487 2.984 13.2925C2.796 13.0553 2.60194 12.8228 2.402 12.5951L2.31 12.4877C2.13 12.2806 1.94 12.0618 1.755 11.8362C0.87 10.7598 0 9.42656 0 7.44084C0 3.28479 3.415 0 8 0C12.585 0 16 3.28381 16 7.44181C16 9.42656 15.13 10.7598 14.245 11.8372C14.06 12.0618 13.87 12.2806 13.69 12.4887L13.598 12.5951C13.388 12.8373 13.193 13.0649 13.016 13.2925C12.66 13.7487 12.401 14.1696 12.263 14.618C12.2057 14.8041 12.0751 14.9604 11.8998 15.0524C11.7246 15.1444 11.5191 15.1647 11.3285 15.1088C11.1379 15.0528 10.9779 14.9252 10.8837 14.754C10.7895 14.5829 10.7687 14.3821 10.826 14.196C11.039 13.5064 11.418 12.9233 11.823 12.4047C12.025 12.1448 12.242 11.8928 12.453 11.6487L12.548 11.5393C12.728 11.3312 12.903 11.129 13.075 10.92C13.868 9.95302 14.5 8.94209 14.5 7.44181C14.5 4.14433 11.81 1.46512 8 1.46512ZM5.5 20.2674C5.5 20.0732 5.57902 19.8868 5.71967 19.7494C5.86032 19.6121 6.05109 19.5349 6.25 19.5349H9.75C9.94891 19.5349 10.1397 19.6121 10.2803 19.7494C10.421 19.8868 10.5 20.0732 10.5 20.2674C10.5 20.4617 10.421 20.6481 10.2803 20.7854C10.1397 20.9228 9.94891 21 9.75 21H6.25C6.05109 21 5.86032 20.9228 5.71967 20.7854C5.57902 20.6481 5.5 20.4617 5.5 20.2674ZM4.75 16.6047C4.55109 16.6047 4.36032 16.6818 4.21967 16.8192C4.07902 16.9566 4 17.1429 4 17.3372C4 17.5315 4.07902 17.7178 4.21967 17.8552C4.36032 17.9926 4.55109 18.0698 4.75 18.0698H11.25C11.4489 18.0698 11.6397 17.9926 11.7803 17.8552C11.921 17.7178 12 17.5315 12 17.3372C12 17.1429 11.921 16.9566 11.7803 16.8192C11.6397 16.6818 11.4489 16.6047 11.25 16.6047H4.75Z"
      fill={props.color ?? COLORS.primaryDark}
    />
  </Svg>
);
