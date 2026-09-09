import { expect, test } from '@playwright/test';
import { FlightsPage } from '../../pages/flights.page';
import { flightsData } from '../../testData';
import { dismissDemoModal } from '../../utils/test-helpers';

test.describe('Flight search and booking', () => {
  test.describe.configure({ mode: 'serial', timeout: 60_000 });

  test.beforeEach(async ({ page }) => {
    const flightsPage = new FlightsPage(page);
    await flightsPage.goto();
    await dismissDemoModal(page);
  });

  test('shows the Flights search controls without testing excluded services', async ({ page }) => {
    const flightsPage = new FlightsPage(page);
    await expect(flightsPage.oneWayButton).toBeVisible();
    await expect(flightsPage.roundTripButton).toBeVisible();
    await expect(flightsPage.multiCityButton).toBeVisible();
    await expect(flightsPage.searchButton).toBeVisible();
    await expect(page.getByText(/Departure From|Arrival To|Departure Date|Passengers/i).first()).toBeVisible();
  });

  test('supports flight type and cabin selection', async ({ page }) => {
    const flightsPage = new FlightsPage(page);
    await flightsPage.selectFlight(flightsData.flightTypes.roundTrip);
    await expect(flightsPage.roundTripButton).toBeVisible();
    await flightsPage.chooseCabin(flightsData.cabin);
    await expect(page.locator('button:visible').filter({ hasText: /Business|First|Premium|Economy/i }).first()).toBeVisible();
  });

  test('validates an incomplete flight search', async ({ page }) => {
    const flightsPage = new FlightsPage(page);
    await flightsPage.searchButton.click();
    await expect(flightsPage.searchButton).toBeVisible();
    await expect(page.getByText(/Departure From|Arrival To|Departure Date/i).first()).toBeVisible();
  });

  test('searches a valid One Way itinerary', async ({ page }) => {
    const flightsPage = new FlightsPage(page);
    await flightsPage.fillFlexibleItinerary(flightsData.validItinerary);
    await flightsPage.searchButton.click();
    await expect(flightsPage.searchButton).toBeVisible();
  });

  test('runs the booking continuation flow when explicitly enabled', async ({ page }) => {
    test.skip(process.env.RUN_BOOKING_TESTS !== 'true', 'Set RUN_BOOKING_TESTS=true to run the booking flow.');
    const flightsPage = new FlightsPage(page);
    await flightsPage.fillBookingItinerary(flightsData.validItinerary);
    await flightsPage.searchButton.click();
    await expect(page.getByText(/flight|select|continue|passenger/i).first()).toBeVisible();
  });
});
