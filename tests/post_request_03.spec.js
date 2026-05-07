const {test, expect} = require('@playwright/test');
import { faker } from '@faker-js/faker';
const { DateTime } = require('luxon');


test('Post request with dynamic body', async({request})=>{
    // create test data
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalPrice = faker.number.int(1000);
  const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
  const checkOutDate = DateTime.now().plus({ day: 5 }).toFormat("yyyy-MM-dd");

const response =  await request.post('/booking',{
       data:{
    "firstname": firstName,
    "lastname": lastName,
    "totalprice": totalPrice,
    "depositpaid": true,
    "bookingdates": {
        "checkin": checkInDate,
        "checkout": checkOutDate,
    },
    "additionalneeds": "super bowls"
}
    })
    //validating response
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    //validating response body
    const responseBody = await response.json()
    console.log(responseBody)
    expect(responseBody.booking).toHaveProperty('firstname', firstName)
    expect(responseBody.booking).toHaveProperty('lastname', lastName)
    //validating nested object
    expect(responseBody.booking.bookingdates).toHaveProperty('checkin', checkInDate)
    expect(responseBody.booking.bookingdates).toHaveProperty('checkout', checkOutDate)

})