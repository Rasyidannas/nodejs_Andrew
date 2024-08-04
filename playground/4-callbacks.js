// setTimeout(()=>{
//     console.log('Two seconds are up');
// }, 2000)

// const names = ['Andrew', 'Jen', 'Jess']
// const shortName = names.filter((name)=>{
//     return name.length <= 4
// })

// const geocode = (address, callback)=>{
//     setTimeout(()=>{
//         const data = { 
//             latitude: 0,
//             longtitude: 0
//         }
        
//         callback(data)//ini untuk mengembalikan data pada callback
//     }, 2000)
// }

// geocode('Surabaya', (data)=>{
//     console.log(data);
// })


// //CHALLENGE
// const add = (a, b, callback)=>{
//     setTimeout(()=>{
//         callback(a + b)
//     }, 2000)
// }

// add(1, 4, (sum)=>{
//     console.log(sum);
// })

// add(2, 10, (sum)=>{
//     console.log(sum);
// })


const doWorkCallback = (callback)=>{
    setTimeout(()=>{
        callback('This is my error', undefined)
        // callback(undefined, [1, 4, 7])
    }, 2000)
}

doWorkCallback((error, result)=>{
    if(error){
        return console.log(error);
    }

    console.log(result);
})