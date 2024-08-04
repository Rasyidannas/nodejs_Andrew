const request = require('request')

//INI DIJADIKAN SATU
const geocode = (address, callback)=>{
    //encodeURIComponent ini untuk menerjemahkan ke encode carachter
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFzeWlkYW5uYXMiLCJhIjoiY2t0dHZyN2E2MXR3bjMybzltNDQ5c291bSJ9.uyMb8b3KL9IFxfmJD4FOgQ&limit=1`

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to location services!', undefined)//undefined ini untuk mengisi value response
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        }else {
            callback(undefined,{//undefined ini untuk mengisi value error
                latitude : body.features[0].center[1],
                longtitude : body.features[0].center[0],
                location : body.features[0].place_name 
            })
        }
    })
}

module.exports = geocode