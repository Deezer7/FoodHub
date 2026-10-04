let container = document.querySelector(".container")

fetch("/admin/products")
.then(function(res){
    return res.json()
})
.then(function(products){
    let productCard = document.createElement("div")
    container.appendChild(productCard)
    products.forEach(function(product){
        
        let name = document.createElement("p")
        name.textContent = "Name: "+ product.name
        let price = document.createElement("p")
        price.textContent = "Price: $"+product.price
        let img = document.createElement("img")
        img.src = "/foto/" + product.img
        let desc = document.createElement("p")
        desc.textContent = "Description: " + product.description
        let id = document.createElement("p")
        id.textContent = "ID: " +product.id
        let available = document.createElement("p")
        available.textContent = "Available: " + product.available
        let category = document.createElement("p")
        category.textContent = "Category: " +product.category
        
        productCard.appendChild(id)
        productCard.appendChild(name)
        productCard.appendChild(price)
        productCard.appendChild(desc)
        productCard.appendChild(img)
        productCard.appendChild(category)
        productCard.appendChild(available)

        let delBut = document.createElement("button")
        delBut.textContent = "Delete product"
        productCard.appendChild(delBut)
        delBut.addEventListener("click", function(){
            fetch("/admin/orders/" + id, {
                method: "DELETE"
            })
            .then(function(res){
                if (res.ok){
                    productCard.remove()
                }

            })
        })
    })

})