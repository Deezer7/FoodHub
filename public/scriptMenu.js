

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart)) 
}

function loadCart() {
    let storedCart = localStorage.getItem("cart")

    if(storedCart) {
        cart = JSON.parse(storedCart)
    }
}





let cards = document.querySelector(".cards")

let cardInfo = fetch("/products")
.then(function(res){
    return(res.json())
})
.then(function(position){
    position.forEach(function(pos){

        

            let card = document.createElement("div")
            card.classList.add("card")

            let name = document.createElement("h3")
            name.classList.add("name")
            name.textContent = pos.name


            let price = document.createElement("p")
            price.classList.add("price")
            price.textContent = pos.price + " $"


            let desc = document.createElement("p")
            desc.classList.add("desc")
            desc.textContent = pos.description


            let img = document.createElement("img")
            img.classList.add("img")
            img.src = "/foto/" +  pos.img



            cards.appendChild(card)

            card.appendChild(name)

            card.appendChild(img)

            card.appendChild(desc)

            card.appendChild(price)

            let addBtn = document.createElement("button")
            addBtn. textContent = "Add to cart"
            addBtn.classList.add("addBtn")

            card.appendChild(addBtn)

            addBtn.addEventListener("click", function(){

                let existItem = cart.find(item => item.id == pos.id)
                if (existItem) {
                    existItem.quantity++
                }

                else{
                    pos.quantity = 1
                    cart.push(pos)
                }
                
                calcTotal() 
                

                cartRender()

                saveCart()
                console.log(cart)
                
            })

    })
})


let cart = []


let cartDiv = document.querySelector(".cart")
let cartBut = document.querySelector(".cartBut")
let cartCont = document.querySelector(".cartCont")
function cartRender() {
    cartCont.innerHTML = ""

    cart.forEach(function(item, index){

        
       
        let cartCard = document.createElement("div")
        cartCard.classList.add("Icard")
        cartCont.appendChild(cartCard)

        let name = document.createElement("h3")
        name.classList.add("Iname")
        name.textContent = item.name

        let quantity = document.createElement("p")
        quantity.textContent = "x" + item.quantity

        let img = document.createElement("img")
        img.classList.add("Iimg")
        img.src = item.img

        let price = document.createElement("p")
        price.classList.add("Iprice")
        price.textContent = item.price

        let delBut = document.createElement("button")
        delBut.textContent = "Delete!"
        delBut.classList.add("delBut")


        cartCard.appendChild(name)
        cartCard.appendChild(quantity)
        cartCard.appendChild(img)
        cartCard.appendChild(price)
        cartCard.appendChild(delBut)
        
        delBut.addEventListener("click", function(){

            

            let existItem = cart.find(item1 => item1.id == item.id)
                if (existItem.quantity > 1) {
                    existItem.quantity--
                }

                else{
                     cart.splice(index, 1)
                }

           
            

            console.log(cart)
            calcTotal() 
            
               
            cartRender()
            saveCart()
        })

        




    })
}
let toPay = document.querySelector(".total")


function calcTotal() {
            toPay.textContent = ""

    let total = cart.reduce(function(sum, product1){

        return sum + product1.price * product1.quantity
        
    }, 0)
            
            toPay.textContent = "Total to pay: $" + total
    
}



let placeOrderBut = document.querySelector(".placeOrder")

placeOrderBut.addEventListener("click", function(){
    fetch("/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cart: cart
        })
    }



    )
})

loadCart()
cartRender()
calcTotal()

