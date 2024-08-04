const doWorkPromise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        // resolve([7, 4, 1])
        reject('Things went wrong!')
    }, 2000)
})

doWorkPromise.then((result)=>{//ini untuk resolve
    console.log('Success!', result)
}).catch((error)=>{//ini untuk reject
    console.log('Error!', error);
})


// PROMISE CHAINING
const add = (a, b)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a + b)
        }, 2000)
    })
}

//ini memanggil secara promise chaining untuk bisa secara bersamaan dengan function lain
add(1, 1).then((sum)=>{
    console.log(sum);
    return add(sum, 4)
}).then((sum2)=>{
    console.log(sum2);//ini untuk mencetak yang diatas
}).catch((e)=>{
    console.log(e);
})