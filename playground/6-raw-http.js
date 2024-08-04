//INI REQUEST TANPA LIBRARY REQUEST DARI NPM
const https = require('https')
const url = 'https://api.weatherbit.io/v2.0/current?lat=-7.23333&lon=112.73333&key=6109dfcbcac24ada824cd8b6a509cc96&include=minutely'

const request = https.request(url, (response)=>{
    let data = ''

    response.on('data', (chunk)=>{
        data = data + chunk.toString()
    })

    response.on('end', ()=>{
        const body = JSON.parse(data)
        console.log(body);
    })
})

request.on('error', (error)=>{
    console.log('An error', error)
})

request.end()