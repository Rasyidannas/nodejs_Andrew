// Path is module provides utilities for working with file and directory paths
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//ini untuk mengetahui lokasi file yang dijalankan oleh node.js
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')//path.join untuk menggabungkan kedua arguments
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//ini route dengan templating engine HBS secara dynamic
app.set('view engine', 'hbs')
app.set('views', viewPath)//ini untuk mengetahui folder views diganti dengan templates
hbs.registerPartials(partialsPath)//ini untuk partials di templates folder

// ini route dengan memanggil file css, js, and html di url secara static
app.use(express.static(publicDirectoryPath))//express.static for serve static files such as images, CSS files, and JavaScript files, and Html 


app.get('/', (req, res)=>{
    res.render('index', {
        //ini untuk menyimpan object / data dan bisa dipanggil dengan HBS
        title: 'Weather App',
        name: 'Rasyid Annas'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Rasyid Annas'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Rasyid Annas',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res)=>{
    const address = req.query.address

    if(!address){
        return res.send({
            error:'You must Provide an address!'
        })
    }

    geocode(address, (error, {latitude, longtitude, location} = {})=>{//{} ini untuk mnyimpan nilai undefine secara default dan agar bisa meneruskan ke if dibawahnya
        if(error){
            return res.send({error});
        }

        forecast(latitude, longtitude, (error, forecastData)=>{
            if(error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })

    // console.log(req.query);
    // res.send({
    //     forecast:'Rainy',
    //     location: 'Surabaya',
    //     address,
    // })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){//ini jika untuk url query tidak ada search atau /products?search=games
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)//ini untuk mencetak perintah query dan menjadikan object
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 Page',
        name: 'Rasyid Annas',
        errorMessage: 'Help article not found'
    })
})

//ini untuk page not found dan * ini artinya semua. Jika url tidak cocok maka dengan diatas maka akan merespon ini
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 Page',
        name: 'Rasyid Annas',
        errorMessage: 'My 404 page'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})