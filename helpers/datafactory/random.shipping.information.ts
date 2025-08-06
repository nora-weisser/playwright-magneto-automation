import { faker, fakerNL } from '@faker-js/faker';

export interface ShippingInfo {
  email: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
}

export function generateRandomShippingInfoNL(): ShippingInfo {
  return {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    streetAddress: fakerNL.location.streetAddress(),
    city: fakerNL.location.city(),
    country: "Netherlands",
    postalCode: fakerNL.location.zipCode('#### ??'), // example of Dutch postcode: 1381 XD
    phone: '+31 6 ' + fakerNL.helpers.replaceSymbols('########'), 
  };
}
