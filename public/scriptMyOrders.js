let container = document.querySelector(".orders")





fetch("/myOrders", {
    method: "GET"
})
.then(function(res){
    return res.json()
})
.then(function(orders){
      
    orders.forEach(function(order){

        let orderCard = document.createElement("div")
        container.appendChild(orderCard)

        let id = document.createElement("p")
        id.textContent = "Order ID: " + order.id

        let status = document.createElement("p")
        status.textContent =  "Order status: " + order.status

        let total = document.createElement("p")
        total.textContent = "Total: $" + order.total

        orderCard.appendChild(id)
        orderCard.appendChild(status)
        orderCard.appendChild(total)

        let expandBut = document.createElement("button")
        expandBut.textContent = "Expand order details"
        orderCard.appendChild(expandBut)

        expandBut.addEventListener("click", function(){

            expandBut.classList.add("active")

            let closebut = document.createElement("button")
            let itemCard = document.createElement("div")
            closebut.textContent = "Close order details"
            orderCard.appendChild(itemCard)

            fetch("/myOrders/" + order.id, {
                method: "GET"
                })
                .then(function(res){
                    return res.json()
                })
                .then(function(result){
                    result.forEach(function(item){

                        

                        let name = document.createElement("p")
                        name.textContent = item.product
                        let quantity = document.createElement("p")
                        quantity.textContent = "Quantity: x" + item.quantity
                        let price = document.createElement("p")
                        price.textContent = "$" + item.price
                        
                        itemCard.appendChild(name)
                        itemCard.appendChild(quantity)
                        itemCard.appendChild(price)
                        
                    })
                })

                orderCard.appendChild(closebut)
                closebut.addEventListener("click", function(){
                    itemCard.remove()
                    expandBut.classList.remove("active")
                    closebut.remove()
                })

        })
        
    })
    

})
