const square = (x)=>x * x

console.log(square(3));

const event = {
    name: "brithday Party",
    guestList: ["Ciko", "Ciki"],
    printGuestList(){
        console.log("guest List for " + this.name)

        //ini hanya bisa menggunakan arrow function
        this.guestList.forEach((guest)=>{
            console.log(guest + " is attending " + this.name);
        })

        //ini cara kedua tidak menggunakan arrow function
        // let name = this.name

        // this.guestList.forEach(function guestEach(guest){
        //     console.log(guest + " is attending " + name);  
        // })
    }
}

event.printGuestList()