const {test, expect} = require('@playwright/test');

test('Post request with static request body', async ({request}) => {
   const postResponse = await request.post('/booking', {
        data:{
    "firstname": "test fname",
    "lastname": "test lname",
    "totalprice": 1000,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
    },
    "additionalneeds": "super bowls"
}

    })
    //validating response
    expect(postResponse.ok()).toBeTruthy()
    expect(postResponse.status()).toBe(200)
    //validating response body
    const responseBody = await postResponse.json()
    console.log(responseBody)
    expect(responseBody.booking).toHaveProperty('firstname', 'test fname')
    expect(responseBody.booking).toHaveProperty('lastname', 'test lname')
    //validating nested object
    expect(responseBody.booking.bookingdates).toHaveProperty('checkin', '2018-01-01')
    expect(responseBody.booking.bookingdates).toHaveProperty('checkout', '2019-01-01')
   
    })
        