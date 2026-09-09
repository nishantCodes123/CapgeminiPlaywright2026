export const flightsData = {
  validItinerary: {
    departure: 'Dubai',
    arrival: 'Paris',
    departureDate: '10/15/2026',
  },
  flightTypes: {
    roundTrip: 'round-trip' as const,
  },
  cabin: 'Economy',
};

export type FlightRoute = 'one-way' | 'round-trip' | 'multi-city';
