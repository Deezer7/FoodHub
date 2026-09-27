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
                fetch
            })

    })
})