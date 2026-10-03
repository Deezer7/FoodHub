let container = document.querySelector(".orderContainer")
let id = Number(window.location.pathname.split("/").pop())
fetch("/api/adminOrders/open/" + id, {
    method: "GET"
})
.then(function(res){
    return res.json()
})
.then(function(order){
    console.log(order)
    let total = document.createElement("p")
        total.textContent = "Total: $" + order[0].total
    order.forEach(function(orderDet){

        let orderCont = document.createElement("div")
        container.appendChild(orderCont)

        let orderId = document.createElement("p")
        orderId.textContent = "ID: " + orderDet.order_id

        let itemName = document.createElement("p")
        itemName.textContent = "Product: " + orderDet.product

        let itemQuant = document.createElement("p")
        itemQuant.textContent = "x " + orderDet.quantity

        let itemPrice = document.createElement("p")
        itemPrice.textContent = "Price: $" + orderDet.price

        let itemStatus = document.createElement("p")
        itemStatus.textContent = "Status: " + orderDet.status

        
        orderCont.appendChild(orderId)
        orderCont.appendChild(itemName)
        orderCont.appendChild(itemPrice)
        orderCont.appendChild(itemQuant)
        orderCont.appendChild(itemStatus)
        
        




    })
    container.appendChild(total)
})

