# Playwright Test Report

## Execution Summary

| Metric | Result |
|---|---:|
| Passed | 10 |
| Failed | 5 |
| Skipped | Not reported by the test runner result summary |
| Total reported | 15 |
| Pass percentage | 66.67% |
| Failure percentage | 33.33% |

Execution date: 2026-09-09

## Overall Status

**AMBER**

The login and signup coverage is generally progressing, but the Flights suite has a blocking setup failure against the live PHPTravels site.

## Failed Area

### Flights setup

The failure occurs in `FlightsPage.goto()` while waiting for `getByRole('button', { name: /Search Flights/i })`. The captured page state still showed the default Hotels panel with `Search Hotels`.

## Root Causes

1. The Flights tab interaction is not confirmed before waiting for Flights controls.
2. `click({ force: true })` bypasses Playwright actionability checks.
3. The test depends on a live external application whose tab content is dynamically rendered.
4. `pages/flights.page.ts` references `itinerary.departureDate` inside `page.evaluate()` without passing the value into the browser callback.
5. Some Flights assertions verify only that a button remains visible rather than confirming search results or validation outcomes.

## Recommended Fixes

- Click the Flights tab normally and verify its selected state.
- Wait for the active Flights panel before locating `Search Flights`.
- Replace forced clicks with state-based synchronization.
- Pass the date explicitly into `page.evaluate()`.
- Assert a result URL, results heading, validation message, or booking continuation state.
- Consider mocking unstable external responses or using a controlled test environment for CI.
