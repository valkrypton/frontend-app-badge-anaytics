import { EnvironmentTypes, SiteConfig, footerApp, headerApp, shellApp } from '@openedx/frontend-base';

import { badgeAnalyticsApp } from './src';

import '@openedx/frontend-base/shell/style';

const siteConfig: SiteConfig = {
  siteId: 'badge-analytics-dev',
  siteName: 'Badge Analytics Dev',
  baseUrl: 'http://apps.local.openedx.io:8080',
  lmsBaseUrl: 'http://local.openedx.io:8000',
  cmsBaseUrl: 'http://studio.local.openedx.io:8001',
  loginUrl: 'http://local.openedx.io:8000/login',
  logoutUrl: 'http://local.openedx.io:8000/logout',

  environment: EnvironmentTypes.DEVELOPMENT,
  apps: [
    shellApp,
    headerApp,
    footerApp,
    badgeAnalyticsApp,
  ],

  accessTokenCookieName: 'edx-jwt-cookie-header-payload',
};

export default siteConfig;
