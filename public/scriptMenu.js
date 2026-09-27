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

                

                cart.push(pos)

                console.log(cart)
                
            })

    })
})


let cart = []



let cartBut = document.querySelector(".cartBut")
let cartCont = document.querySelector(".cartCont")

cartBut.addEventListener("click", function(){

    cart.forEach(function(item){

        let cartCard = document.createElement("div")
        cartCard.classList.add("Icard")
        cartCont.appendChild(cartCard)

        let name = document.createElement("h3")
        name.classList.add("Iname")
        name.textContent = item.name

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
        cartCard.appendChild(img)
        cartCard.appendChild(price)
        cartCard.appendChild(delBut)
        
        delBut.addEventListener("click", function(){

            cart.splice(item, 1)



            console.log(cart)

        })

        




    })


})