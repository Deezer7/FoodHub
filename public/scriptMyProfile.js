let userContainer  = document.querySelector(".userConfig")

fetch("/myProfile", {
    method: "GET"
})
.then(function(res){
    return res.json()
})
.then(function(user){

    

    let userCard = document.createElement("div")
    userContainer.appendChild(userCard)

    let email = document.createElement("p")
    email.textContent = "User email: " + user[0].email
    userCard.appendChild(email)

    let userName = document.createElement("p")
    userName.textContent = "User name: " + user[0].name
    userCard.appendChild(userName)

    let password = document.createElement("p")
    password.textContent = "password: ********"
    userCard.appendChild(password)

    let changeBut = document.createElement("button")
    changeBut.textContent = "Change password"
    password.appendChild(changeBut)
    changeBut.addEventListener("click", function(){

        let saveBut = document.createElement("button")
        saveBut.textContent = "Save new password"
        
        changeBut.remove()

        
        let passwordInput = document.createElement("input")
        passwordInput.placeholder = "New password"
        password.appendChild(passwordInput)
        password.appendChild(saveBut)

        saveBut.addEventListener("click", function(){

            let newPassword = passwordInput.value

            
            fetch("/myProfile/change",{
                method: "PATCH",

                headers: {"Content-Type": "application/json"},

                body: JSON.stringify({
                    password: newPassword
                })
            })
            .then(function(){
                location.reload()
            })

        })
    })
})