import { authenticatedLoader } from '@openedx/frontend-base';
import { badgeAnalyticsRole } from './constants';

const routes = [
  {
    id: 'org.openedx.frontend.route.badgeAnalytics.main',
    path: 'badge-analytics',
    loader: authenticatedLoader,
    handle: {
      roles: [badgeAnalyticsRole],
    },
    async lazy() {
      const module = await import(/* webpackChunkName: "badge-analytics-main" */ './Main');
      return { Component: module.default };
    },
    children: [
      {
        path: 'course/:courseId',
        async lazy() {
          const module = await import(/* webpackChunkName: "badge-analytics-stats" */ './stats/StatsPage');
          return { Component: module.default };
        },
      },
    ],
  },
];

export default routes;
