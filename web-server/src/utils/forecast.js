const request = require('request')

const forecast = (latitude, longtitude, callback)=>{
    const url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longtitude}&key=6109dfcbcac24ada824cd8b6a509cc96&include=minutely`

    request({url, json:true}, (error, {body})=>{//{body} ini mengacu ke response dan ini Object destructuring
        if(error){
            callback('Unable to connect to location services!', undefined)//undefined ini untuk mengisi value response
        }else if(body.error){
            callback('Unable to find location', undefined);
        }else{
            const temp = body.data[0].temp
            const precip = body.data[0].precip
            const cityName = body.data[0].city_name
            callback(undefined, `In ${cityName}, it is currently ${temp} degrees out. There is a ${precip}% chance of rain`)
        }
    })
}

module.exports = forecast