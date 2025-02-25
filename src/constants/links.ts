// SPDX-License-Identifier: ice License 1.0

import {ENV} from '@constants/env';
import {t} from '@translations/i18n';

export const LINKS = {
  APP_STORE: `https://apps.apple.com/app/${ENV.APPSTORE_APP_ID}`,
  PLAY_STORE: `https://play.google.com/store/apps/details?id=${ENV.APP_ID}`,
  PRE_STAKING: t('links.pre_staking'),
  PRIVACY: t('links.privacy'),
  TERMS: t('links.terms'),
  MAIN: t('links.main'),
  BLOCK_EXPLORER: ENV.BLOCK_EXPLORER_URL,
  FIREBASE_NOTICE: 'https://ice.io/firebase-notice',
  KNOWLEDGE_BASE: 'https://ice.io/knowledge-base',
  BONUSES: 'https://ice.io/bonuses',
  TEAM: 'https://ice.io/team',
  FEEDBACK_EMAIL: 'feedback@ice.io',
  CONFIRM_EMAIL: 'https://ice.io/firebase-confirm-email',
  VERIFY_EMAIL: `https://${ENV.DEEPLINK_DOMAIN}/verify-email`,
  TWITTER_APP_URL: 'twitter://user?screen_name=ice_blockchain',
  TWITTER_PROFILE_URL: 'https://twitter.com/ice_blockchain',
  TELEGRAM_PROFILE_URL: 'https://t.me/iceblockchain',
  CHANGELOG: 'https://ice.io/changelog',
  ICE_FAQ: 'https://ice.io/faq',
  ICE_HOMEPAGE: 'https://ice.io',
  FACEBOOK_APP: `fb://profile/${ENV.FACEBOOK_PAGE_ID}`,
  FACEBOOK_WEB: 'https://facebook.com/ice.blockchain',
  INSTAGRAM_APP: 'instagram://user?username=ice.blockchain',
  INSTAGRAM_WEB: 'https://www.instagram.com/ice.blockchain',
  LINKEDIN_APP: 'linkedin://company/ice-blockchain',
  LINKEDIN_WEB: 'https://linkedin.com/company/ice-blockchain',
  YOUTUBE_APP: `vnd.youtube://channel/${ENV.YOUTUBE_CHANNEL_ID}`,
  YOUTUBE_WEB: 'https://youtube.com/@ice.blockchain',
  TIKTOK_WEB: 'https://www.tiktok.com/@ice.blockchain',
  APP_UPDATE: 'https://ice.io/app-update',
  GITHUB_WEB: 'https://github.com/ice-blockchain',
  HOW_TO_BOOTS_EARNINGS: 'https://ice.io/how-to-boost-your-earnings',
  WEB_WIDGET:
    'https://github.com/ice-blockchain/community-assets/tree/master/website-widget',
  ANDROID_WIDGET:
    'https://github.com/ice-blockchain/community-assets/tree/master/android-widget',
  REACT_NATIVE_WIDGET:
    'https://github.com/ice-blockchain/community-assets/tree/master/react-native-widget',
  ICE_ASSETS:
    'https://www.figma.com/community/file/1256148399031329897/ice-Community-Assets',
  ICE_VIDEOS:
    'https://drive.google.com/drive/u/1/folders/1E_3zVZzs2vqUNgUd05qfi6cJ_axjlvQU',
};
