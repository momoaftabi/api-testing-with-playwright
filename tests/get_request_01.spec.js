const {test, expect} = require('@playwright/test');
const jsonBody = require('../test-data/post-request-body.json');

test('Get request with using booking id', async({request})=>{
    const response =  await request.post('/booking',{
        data: jsonBody
    })
    //validating response
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    //validating response body
    const responseBody = await response.json()
    console.log(responseBody)
    const bookingId = responseBody.bookingid
    console.log(bookingId)

    //Get api call
    const getResponse = await request.get('/booking/'+bookingId)
    console.log(await getResponse.json())

    //validate get response
    expect(getResponse.ok()).toBeTruthy()
    expect(getResponse.status()).toBe(200)
})