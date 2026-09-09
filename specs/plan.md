# PHPTRAVELS Test Plan

URL: https://phptravels.net/

## Scope

Test the following workflows:

- Signup
- Login
- Flight search and booking

Explicitly excluded:

- Stays
- Visa

## Functional Requirements

### Signup

- Open Signup from the navigation or Login page.
- Submit First Name, Last Name, Email Address, Password, Confirm Password, arithmetic security check, and Terms and Privacy Policy consent.
- Display password strength feedback.
- Create an account with valid data.
- Reject duplicate or invalid account data.
- Navigate to Login after registration.

### Login

- Open Login from the navigation or Signup page.
- Submit Email Address and Password.
- Support password visibility control and Remember Me.
- Authenticate valid credentials.
- Display an appropriate error for invalid credentials.
- Provide Forgot Password and Signup links.

### Flight Booking

The Flights tab contains One Way, Round Trip, Multi-City, cabin class, departure and arrival locations, departure date, passenger selector, and Search Flights.

The booking flow should support entering flight criteria, searching, selecting an itinerary, entering passenger information, reviewing details, completing sandbox payment or booking confirmation, and displaying a confirmation or booking reference.

## Positive Scenarios

| ID | Scenario | Expected Result |
|---|---|---|
| SG-01 | Register with valid unique details | Account is created successfully |
| LG-01 | Login with valid registered credentials | User is authenticated |
| LG-03 | Toggle password visibility during Login | Password visibility changes correctly |
| LG-04 | Open Forgot Password | Password recovery page is displayed |
| FL-01 | Search a valid One Way flight | Matching flight results are displayed |
| FL-02 | Search a valid Round Trip flight | Outbound and return options are displayed |
| FL-04 | Change cabin class from Economy | Selected class is reflected in the search |
| FL-06 | Select a flight and continue booking | Passenger details page is displayed |
| FL-07 | Complete booking with valid sandbox data | Confirmation and booking reference are displayed |

## Negative Scenarios

- Submit Signup with required fields empty.
- Use invalid email, short or mismatched passwords, incorrect arithmetic answer, or missing terms consent.
- Submit Login with empty or invalid credentials.
- Search flights with missing locations, same departure and arrival, missing date, past date, or invalid passenger count.
- Submit incomplete passenger details or invalid sandbox payment details.

## Boundary Scenarios

- Password lengths of 5, 6, and the maximum supported length.
- Minimum and maximum passenger count.
- Today and future departure dates.
- Long city search strings and names with spaces or hyphens.
- Mobile and desktop viewports.
- Back, forward, reload, and duplicate submission behavior.

## Risks

- Flight inventory and prices may change because the site is external and dynamic.
- The demo-warning modal blocks controls until dismissed.
- Tests may create persistent accounts or bookings without cleanup.
- Third-party APIs may produce intermittent failures or empty results.

## Automation Candidates

- Signup validation and unique account creation.
- Login success, invalid credentials, password visibility, and Remember Me.
- One Way and Round Trip flight searches.
- Date, passenger, result, booking, and responsive navigation checks.
