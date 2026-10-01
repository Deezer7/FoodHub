let orderCont = document.querySelector(".orderContainer")

let order = fetch("/adminOrders")
.then (function(res){
    return res.json()
})
.then(function(order1){
    order1.forEach(function(orderSect){
        let orderCard = document.createElement("div")
        orderCard.classList.add("orderCart")
        

        let orderId = document.createElement("P")
        orderId.textContent = orderSect.id

        let status = document.createElement("p")
        status.textContent = orderSect.status

        let orderTotal = document.createElement("p")
        orderTotal.textContent = orderSect.total

        orderCard.appendChild(orderId)
        orderCard.appendChild(status)
        orderCard.appendChild(orderTotal)
        
        orderCont.appendChild(orderCard)
    })
})
