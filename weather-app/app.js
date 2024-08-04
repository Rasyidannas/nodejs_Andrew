//CONTOH ANSYCHRONOUS
// console.log('Starting');

// //Asynchronous ini maksudnya mejalankan program berikutnya tanpa menunggu(setTimeout())
// setTimeout(()=>{
//     console.log('2 Second Timer');
// }, 2000)

// setTimeout(()=>{
//     console.log('0 Second Timer');
// }, 0)

// console.log('Stopping');



const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const city = process.argv[2] //ini akan mengambil city di perintah gitbash (node app.js cityname)

if(!city){
    console.log('please provide an city name')
}else{

    // CALLBACK CHAINING ini tidak menggunakan else untuk menyingkat
    //ini darir utils/geocode.js
    geocode(city, (error, {latitude, longtitude, location})=>{
        if(error){
            return console.log(error);
        }
        // console.log('Data', data);

        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return console.log(error)
            }
            console.log(location)//ini dari data geocode()
            console.log(forecastData)
        })
    })
}

//ini tidak bisa karena API sudah diblock
// const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/37.8267,-122.4233'
// const url = 'https://api.weatherbit.io/v2.0/current?lat=-7.23333&lon=112.73333&key=6109dfcbcac24ada824cd8b6a509cc96&include=minutely'

// request({url:url, json:true}, (error, response)=>{
//     //ini tidak diperlukan lagi karena sudah menulisan json:true atau kita tidak perlu menggunakan parse dan stringfy
//     // const data = JSON.parse(response.body)
//     if(error){//ini untk error pada koneksi
//         console.log('Unable to connect to weather service!');
//     }else if(response.body.error){//in untuk jika error pada url dan lokasi salah
//         console.log('Unable to find location');
//     }else{
//         const temp = response.body.data[0].temp
//         const precip = response.body.data[0].precip
//         console.log(`It is currently ${temp} degrees out. There is a ${precip}% chance of rain`);
//     }
// })


// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Surabaya.json?access_token=pk.eyJ1IjoicmFzeWlkYW5uYXMiLCJhIjoiY2t0dHZyN2E2MXR3bjMybzltNDQ5c291bSJ9.uyMb8b3KL9IFxfmJD4FOgQ&limit=1'

// request({url:geocodeURL, json:true}, (error, response)=>{
//     if(error){
//         console.log('Unable to connect to location service!');
//     }else if(response.body.features.length === 0){
//         console.log('Unable to find location. Try another search');
//     }else{
//         const latitude= response.body.features[0].center[1]
//         const longtitude= response.body.features[0].center[0]
//         console.log(`latitude is ${latitude} and longtitude is ${longtitude}`);
//     }
// })




