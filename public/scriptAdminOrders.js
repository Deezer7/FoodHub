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


