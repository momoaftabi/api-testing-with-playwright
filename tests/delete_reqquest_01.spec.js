const {test, expect} = require('@playwright/test');
const jsonBody = require('../test-data/post-request-body.json');
const tokenReqBody = require('../test-data/token-request-body.json');
const { de } = require('@faker-js/faker');


test('Delete request with using booking id', async({request})=>{
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

    //delete api call
    const deleteResponse = await request.delete('/booking/'+bookingId ,{
        headers:{
            'Content-Type': 'application/json',
            'Cookie': 'token='+tokenNo  
        },
        
    })


    //validate delete response
    expect(deleteResponse.status()).toEqual(201)
    expect(deleteResponse.statusText()).toEqual('Created')
})