const {test, expect} = require('@playwright/test');
const jsonBody = require('../test-data/post-request-body.json');
const tokenReqBody = require('../test-data/token-request-body.json');
const patchReqBody = require(('../test-data/patch-request-body.json'));

test('Patch request with using booking id', async({request})=>{
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

    //generate token
    const tokenResponse = await request.post('/auth',{
        data: tokenReqBody
    })
    const tokenResBody =await tokenResponse.json()
    const tokenNo = tokenResBody.token
    console.log(tokenNo)

    //patch api call
    const patchResponse = await request.patch('/booking/'+bookingId ,{
        headers:{
            'Content-Type': 'application/json',
            'Cookie': 'token='+tokenNo  
        },
        data: patchReqBody
    })
    const patchResBody =await patchResponse.json()
    console.log(patchResBody)
    //validate put response
    expect(patchResponse.ok()).toBeTruthy()
    expect(patchResponse.status()).toBe(200)  
})