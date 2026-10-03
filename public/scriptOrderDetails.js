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
    let orderId = document.createElement("p")
        orderId.textContent = "ID: " + order[0].order_id
        container.appendChild(orderId)
        
        let itemStatus = document.createElement("p")
        itemStatus.textContent = "Order status: " + order[0].status
        container.appendChild(itemStatus)
    order.forEach(function(orderDet){

        let orderCont = document.createElement("div")
        container.appendChild(orderCont)

        

        let itemName = document.createElement("p")
        itemName.textContent = "Product: " + orderDet.product

        let itemQuant = document.createElement("p")
        itemQuant.textContent = "x " + orderDet.quantity

        let itemPrice = document.createElement("p")
        itemPrice.textContent = "Price: $" + orderDet.price

        

        
        
        orderCont.appendChild(itemName)
        orderCont.appendChild(itemPrice)
        orderCont.appendChild(itemQuant)
        
        
        




    })
    container.appendChild(total)

    let changeBut = document.querySelector(".status")
    changeBut.addEventListener("change", function(){

        let orderStatus = changeBut.value

        fetch("/api/adminOrders/open/" + id, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},

        body: JSON.stringify({
            status: orderStatus
        })
    })
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            location.reload()
        }) 
     
       
        
  


    })

    let delBut = document.querySelector(".delBut")
    delBut.addEventListener("click", function(){
        
        fetch("/api/adminOrders/open/" + id, {
            method: "DELETE"
        })
        .then(function(res){
                if(res.ok){
                    window.location.href = ("/public/adminOrders.html")
                }
            })


    })

})
    


