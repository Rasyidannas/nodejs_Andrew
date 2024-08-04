//object property shorthand
const name = 'Rasyid'
const userAge = 22

const user = {
    name,//ini shorthand karena memiliki nama yang sama
    age: userAge,
    location: 'Sidoarjo'
}

console.log(user);


//Object destructuring
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 200,
    salePrice: undefined,
    rating:4.2
}

//rating ini akan menjadi nilai default jika tidak ada nilainya
const {label:productLabel, stock, rating = 5} = product
console.log(productLabel);
console.log(stock);
console.log(rating);


//ini cara ke dua
const transaction = (type, { label, stock = 0 } = {})=>{//{} ini object kosong untuk nilai default
    console.log(type, label, stock);
}

transaction('order', product)
transaction('order')



//ARRAY DESTRUCTURING
const [red, green, blue] = [9, 132, 227]
console.log(blue);



// SPREAD OPERATORS
//Spread Array
const citrus = ["lime", "lemon", "orange"];
const fruits = ["apple", "banana", "coconut", ...citrus]

console.log(fruits);

//Spread Object
const fullName = {
    fName : "Rasyid",
    lName : "Annas"
}

const person = {
    ...fullName,
    id:1,
    userName: "rasyidannas657"
}

console.log(person);