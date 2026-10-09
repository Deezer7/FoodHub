let container = document.querySelector(".container")

fetch("/admin/products")
.then(function(res){
    return res.json()
})
.then(function(products){
    
    
    products.forEach(function(product){
        let productCard = document.createElement("div")
        container.appendChild(productCard)
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
            fetch("/admin/products/" + product.id, {
                method: "DELETE"
            })
            .then(function(res){
                if (res.ok){
                    productCard.remove()
                }

            })
        })

        let changeBut = document.createElement("button")
        changeBut.textContent = "Change product"
        productCard.appendChild(changeBut)
        let saveBut = document.createElement("button")
        saveBut.textContent = "Save changes"
        saveBut.classList.add("save")
        productCard.appendChild(saveBut)



        changeBut.addEventListener("click", function(){

        if (productCard.classList.contains("editing")){
            
            return
            
        }
            
        productCard.classList.add("editing")
        saveBut.classList.toggle("active")
        

        let newName = document.createElement("input")
        newName.value = product.name
        name.appendChild(newName)

        let newPrice = document.createElement("input")
        newPrice.value = product.price
        price.appendChild(newPrice)

        let newDesc = document.createElement("input")
        newDesc.value = product.description
        desc.appendChild(newDesc)

        let newCategory = document.createElement("select")
        
        fetch("/admin/products/category", {
            method: "get"
        })
        .then(function(res){
            return res.json()
        })
        .then(function(categories){
        categories.forEach(function(name){
            let option = document.createElement("option")
            option.value = name.category
            option.textContent = name.category
            
            newCategory.appendChild(option)
        })
    }) 
        category.appendChild(newCategory)

        let newAvailable = document.createElement("select")
        let Isavailable = [true, false]
        Isavailable.forEach(function(status){
            let option = document.createElement("option")
            option.value = status
            option.textContent = status
            newAvailable.appendChild(option)
        })
        available.appendChild(newAvailable)

        
        saveBut.addEventListener("click", function(){

            fetch("/admin/products/" + product.id, {
                method: "PATCH",

                headers: {"Content-Type": "application/json"},

                body: JSON.stringify({
                    name: newName.value,
                    price: Number(newPrice.value),
                    desc: newDesc.value,
                    category: newCategory.value,
                    available: newAvailable.value === "true"


                })
            })
            .then(function(){
                location.reload()
            })


        })


            
        })

        
        


        
    })

})

