const {test, expect} = require('@playwright/test');
const dynamicJsonBody = require('../test-data/post-request-body-dynamic.json');
import { stringFormat } from '../utils/common';

test('Post request with Json body', async({request})=>{
    const DynamicRequestBody = stringFormat(JSON.stringify(dynamicJsonBody),"test fname","test lname","test")
    const response =  await request.post('/booking',{
    data: JSON.parse(DynamicRequestBody)        
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