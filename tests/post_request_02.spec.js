const {test, expect} = require('@playwright/test');
const jsonBody = require('../test-data/post-request-body.json');

test('Post request with Json body', async({request})=>{
    const response =  await request.post('/booking',{
        data: jsonBody
    })
    //validating response
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    //validating response body
    const responseBody = await response.json()
    console.log(responseBody)
    expect(responseBody.booking).toHaveProperty('firstname', 'test fname')
    expect(responseBody.booking).toHaveProperty('lastname', 'test lname')
    //validating nested object
    expect(responseBody.booking.bookingdates).toHaveProperty('checkin', '2018-01-01')
    expect(responseBody.booking.bookingdates).toHaveProperty('checkout', '2019-01-01')

})