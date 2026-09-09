import { Locator, Page } from '@playwright/test';

export class FlightsPage {
  readonly page: Page;
  readonly flightsTab: Locator;
  readonly searchButton: Locator;
  readonly oneWayButton: Locator;
  readonly roundTripButton: Locator;
  readonly multiCityButton: Locator;
  readonly economyButton: Locator;
  readonly departureDateInput: Locator;
  readonly departureTrigger: Locator;
  readonly arrivalTrigger: Locator;
  readonly departureCityInput: Locator;
  readonly arrivalCityInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.flightsTab = page.getByRole('tab', { name: /Flights/i }).last();
    this.searchButton = page.getByRole('button', { name: /Search Flights/i });
    this.oneWayButton = page.getByRole('button', { name: 'One Way' });
    this.roundTripButton = page.getByRole('button', { name: 'Round Trip' });
    this.multiCityButton = page.getByRole('button', { name: 'Multi-City' });
    this.economyButton = page.getByRole('button', { name: /Economy/i });
    this.departureDateInput = page.getByRole('textbox', { name: 'Departure Date' });
    this.departureTrigger = page.locator('#fl_from_trigger');
    this.arrivalTrigger = page.locator('#fl_to_trigger');
    this.departureCityInput = page.getByRole('textbox', { name: 'Departure City or Airport' });
    this.arrivalCityInput = page.getByRole('textbox', { name: 'Arrival City or Airport' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await this.flightsTab.waitFor({ state: 'visible' });
    await this.flightsTab.click({ force: true });
    await this.searchButton.waitFor({ state: 'visible', timeout: 15000 });
  }

  async selectFlight(route: 'one-way' | 'round-trip' | 'multi-city'): Promise<void> {
    const button = {
      'one-way': this.oneWayButton,
      'round-trip': this.roundTripButton,
      'multi-city': this.multiCityButton,
    }[route];
    await button.click();
  }

  async chooseCabin(cabin: string): Promise<void> {
    await this.page.getByRole('button', { name: new RegExp(cabin, 'i') }).click();
  }

  async fillFlexibleItinerary(itinerary: FlightItinerary): Promise<void> {
    const departureField = this.page.locator('input[placeholder*="From"], input[placeholder*="Departure"], input[aria-label*="Departure"], input[name*="from"]').first();
    const arrivalField = this.page.locator('input[placeholder*="To"], input[placeholder*="Arrival"], input[aria-label*="Arrival"], input[name*="to"]').first();

    if (await departureField.isVisible().catch(() => false)) {
      await departureField.fill(itinerary.departure);
      await this.page.getByText(new RegExp(itinerary.departure, 'i')).first().click();
    }
    if (await arrivalField.isVisible().catch(() => false)) {
      await arrivalField.fill(itinerary.arrival);
      await this.page.getByText(new RegExp(itinerary.arrival, 'i')).first().click();
    }
    if (await this.departureDateInput.isVisible().catch(() => false)) {
      await this.departureDateInput.evaluate((element: HTMLInputElement) => {
        element.removeAttribute('readonly');
        element.value = itinerary.departureDate;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
  }

  async fillBookingItinerary(itinerary: FlightItinerary): Promise<void> {
    await this.departureTrigger.getByText('Departure From').click();
    await this.departureCityInput.fill(itinerary.departure);
    await this.page.locator('div:visible').filter({ hasText: new RegExp(`^${itinerary.departure}$`, 'i') }).first().click();
    await this.arrivalTrigger.getByText('Arrival To').click();
    await this.arrivalCityInput.fill(itinerary.arrival);
    await this.page.locator('div:visible').filter({ hasText: new RegExp(`^${itinerary.arrival}$`, 'i') }).first().click();
    await this.departureDateInput.fill(itinerary.departureDate);
  }
}

type FlightItinerary = {
  departure: string;
  arrival: string;
  departureDate: string;
};
