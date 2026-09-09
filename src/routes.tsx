import { authenticatedLoader } from '@openedx/frontend-base';
import { Navigate } from 'react-router-dom';
import { badgesRole } from './constants';

const routes = [
  {
    id: 'org.openedx.frontend.route.badges.main',
    path: 'badges',
    loader: authenticatedLoader,
    handle: {
      roles: [badgesRole],
    },
    async lazy() {
      const module = await import(/* webpackChunkName: "badges-main" */ './Main');
      return { Component: module.default };
    },
    children: [
      {
        path: 'course/:courseId',
        async lazy() {
          const module = await import(/* webpackChunkName: "badges-layout" */ './BadgesLayout');
          return { Component: module.default };
        },
        children: [
          { index: true, element: <Navigate to="configure" replace /> },
          {
            path: 'configure',
            async lazy() {
              const module = await import(/* webpackChunkName: "badges-configure" */ './configure/ConfigurePage');
              return { Component: module.default };
            },
          },
          {
            path: 'catalog',
            async lazy() {
              const module = await import(/* webpackChunkName: "badges-catalog" */ './catalog/CatalogPage');
              return { Component: module.default };
            },
          },
          {
            path: 'analytics',
            async lazy() {
              const module = await import(/* webpackChunkName: "badges-analytics" */ './stats/StatsPage');
              return { Component: module.default };
            },
          },
        ],
      },
    ],
  },
];

export default routes;
