frontend-app-badges
####################

Purpose
*******

This is a `frontend-base`_ micro-frontend for the ``platform-plugin-badges``
Open edX plugin. It gives course staff two screens:

- **Catalog** — badge CRUD (name, description, image).
- **Analytics** — per-badge award summary, award trends, and paginated
  per-learner progress.

It's a ``frontend-base`` app — a lazy-loaded module inside a shared shell —
not a standalone webpack MFE.

.. _frontend-base: https://github.com/openedx/frontend-base

Routes
======

- ``/badges/course/:courseId`` — redirects to ``catalog``.
- ``/badges/course/:courseId/catalog`` — the catalog screen.
- ``/badges/course/:courseId/analytics`` — the analytics screen.

Backend dependency
===================

This app calls the ``badges`` plugin's DRF API on **Studio**, via
``getSiteConfig().cmsBaseUrl``:

- ``GET/POST {cmsBaseUrl}/badges/api/course/<course_id>/badges/``
- ``GET/PUT/DELETE {cmsBaseUrl}/badges/api/course/<course_id>/badges/<badge_id>/``
- ``GET {cmsBaseUrl}/badges/api/course/<course_id>/badges/stats/``
- ``GET {cmsBaseUrl}/badges/api/course/<course_id>/badges/<badge_id>/learners/``

All require the requesting user to hold a course-team role
(``CourseStaffRole``/``CourseInstructorRole``) on the course.

Getting Started
****************

`Tutor`_ is the recommended development environment.

.. _Tutor: https://github.com/overhangio/tutor

1. Install dependencies: ``npm install``
2. Start the dev server: ``npm run dev`` (available at
   ``http://apps.local.openedx.io:8080/badges``)
3. Run tests: ``npm test``
4. Lint: ``npm run lint``

``site.config.dev.tsx`` sets ``cmsBaseUrl`` to
``http://studio.local.openedx.io:8001`` (the Tutor devstack default);
override it if your Studio runs elsewhere.

Project Structure
==================

- ``src/app.ts`` / ``src/constants.ts`` / ``src/routes.tsx`` /
  ``src/Main.tsx`` / ``src/index.ts`` / ``src/slots.tsx`` — standard
  ``frontend-base`` app layout.
- ``src/BadgesLayout.tsx`` — tab navigation shared by all three screens.
- ``src/test-utils.tsx`` — shared test render helper.
- ``src/catalog/`` — the catalog screen: ``CatalogPage``, ``BadgeForm``,
  ``api.ts``, ``types.ts``, ``messages.ts``.
- ``src/stats/`` — the analytics screen: ``StatsPage``, ``SummaryTable``,
  ``TrendModal``, ``LearnersModal``, ``api.ts``, ``types.ts``.

License
*******

The code in this repository is licensed under the AGPLv3 unless otherwise
noted. Please see `LICENSE <LICENSE>`_ for details.
