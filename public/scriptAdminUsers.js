let container = document.querySelector(".container")

fetch("/users")
.then(function(res){
    return res.json()
})
.then(function(users){
    
    
    
    users.forEach(function(user){
        
        let userCard = document.createElement("div")

        
        let id = document.createElement("p")
        id.textContent = "ID: " + user.id

        let name = document.createElement("p")
        name.textContent = "Username: " + user.name

        let email = document.createElement("p")
        email.textContent = "Email: " + user.email

        let role = document.createElement("p")
        role.textContent = "Role: " + user.role

        let status = document.createElement("p")
        status.textContent = "Status: " + user.status


        container.appendChild(userCard)
        userCard.appendChild(id)
        userCard.appendChild(name)
        userCard.appendChild(email)
        userCard.appendChild(role)
        userCard.appendChild(status)

        let deacBut = document.createElement("button")
        deacBut.textContent = "Deactivate account"

        userCard.appendChild(deacBut)

        deacBut.addEventListener("click", function(){
            let id = Number(user.id)

            fetch("/users/deactivate/" + id, {
                method: "PATCH"
            
            })
            .then(function(res){
                if (!res.ok){
                    throw new Error("Failed to deactivate user")
                }

                return res.json()
            })

            .then(function(data) {
                console.log(data.message)
            })
            .catch(function(err) {
                console.error(err)
            })
            .then(function(){
                location.reload()
            })
        })

        if (user.status == "deactivated"){

            deacBut.remove()

            let activateBut = document.createElement("button")
            activateBut.textContent = "Activate accout"

            userCard.appendChild(activateBut)

            activateBut.addEventListener("click", function(){

                id = user.id

                fetch("/users/activate/" + id, {
                    method: "PATCH"
                    
                })
                .then(function(res){
                    if (!res.ok){
                        throw new Error("Failed to activate user")
                    }
                })
                .then(function(){
                    location.reload()
                })

            })
        }

    })



})