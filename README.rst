frontend-app-badge-analytics
#############################

Purpose
*******

This is a `frontend-base`_ micro-frontend that gives course staff a badge
analytics view: per-badge award summary, award trends, and paginated
per-learner progress. It replaces the server-rendered
``badges/templates/badges/stats.html`` page from the
``platform-plugin-badges`` Open edX plugin.

It's a ``frontend-base`` app — a lazy-loaded module inside a shared shell —
not a standalone webpack MFE.

.. _frontend-base: https://github.com/openedx/frontend-base

Routes
======

- ``/badge-analytics/course/:courseId`` — the badge analytics page for one
  course.

Backend dependency
===================

This app calls the ``badges`` plugin's DRF API on **Studio**, via
``getSiteConfig().cmsBaseUrl``:

- ``GET {cmsBaseUrl}/badges/api/course/<course_id>/badges/stats/``
- ``GET {cmsBaseUrl}/badges/api/course/<course_id>/badges/<badge_id>/learners/``

Both require the requesting user to hold a course-team role
(``CourseStaffRole``/``CourseInstructorRole``) on the course.

Getting Started
****************

`Tutor`_ is the recommended development environment.

.. _Tutor: https://github.com/overhangio/tutor

1. Install dependencies: ``npm install``
2. Start the dev server: ``npm run dev`` (available at
   ``http://apps.local.openedx.io:8080/badge-analytics``)
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
- ``src/stats/`` — the badge analytics page: ``StatsPage``,
  ``SummaryTable``, ``TrendModal``, ``LearnersModal``, ``api.ts``,
  ``types.ts``.

License
*******

The code in this repository is licensed under the AGPLv3 unless otherwise
noted. Please see `LICENSE <LICENSE>`_ for details.
