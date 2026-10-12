let orderCont = document.querySelector(".orderContainer")

let order = fetch("/adminOrders")
.then (function(res){
    return res.json()
})
.then(function(order1){
    order1.forEach(function(orderSect){
        let orderCard = document.createElement("div")
        orderCard.classList.add("orderCart")
        
        let userId = document.createElement("p")
        userId.textContent = "User ID: " + orderSect.user_id

        let orderId = document.createElement("P")
        orderId.textContent = "Order ID: " + orderSect.id

        let status = document.createElement("p")
        status.textContent = "Status: " + orderSect.status

        let orderTotal = document.createElement("p")
        orderTotal.textContent = "Total: $" + orderSect.total

        orderCard.appendChild(userId)
        orderCard.appendChild(orderId)
        orderCard.appendChild(status)
        orderCard.appendChild(orderTotal)
        
        orderCont.appendChild(orderCard)

        let delBut = document.createElement("button")
        delBut.textContent = "Delete order"

        delBut.addEventListener("click", function(){
            let id = orderSect.id
            fetch("/adminOrders/" + id, {
                method: "DELETE"
            })
            .then(function(res){
                if(res.ok){
                    orderCard.remove()
                }
            })
        })

        orderCard.appendChild(delBut)

        let openBut = document.createElement("button")
        openBut.textContent = "Open order"

        openBut.addEventListener("click", function(){
            let id = orderSect.id
            
            window.location.href = "adminOrders/open/" + id
        })

        orderCard.appendChild(openBut)
    })
})


