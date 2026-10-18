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

        let oldPasswordInp = document.createElement("input")
        oldPasswordInp.placeholder = "Old password"
        password.appendChild(oldPasswordInp)

        

        let passwordInput = document.createElement("input")
        passwordInput.placeholder = "New password"
        password.appendChild(passwordInput)
        password.appendChild(saveBut)
        let error = document.createElement("p")
        error.style.color = "red"
        

        let cancelBut = document.createElement("button")
        cancelBut.textContent = "Cancel"
        password.appendChild(cancelBut)

        cancelBut.addEventListener("click", function(){

            passwordInput.remove()
            oldPasswordInp.remove()
            saveBut.remove()
            password.appendChild(changeBut)
            cancelBut.remove()

        })

        saveBut.addEventListener("click", function(){
            
            
            let newPassword = passwordInput.value
            let oldPassword = oldPasswordInp.value

            
            fetch("/myProfile/change",{
                method: "PATCH",

                headers: {"Content-Type": "application/json"},

                body: JSON.stringify({
                    password: newPassword,
                    oldPassword: oldPassword
                })
            })
            .then(function(res){
                if(res.status === 401){
                    password.appendChild(error)
                    error.textContent = "incorrect old password"
                    
                    setTimeout(function(){

                        error.remove()

                    },3000)
                    
                    return
                }
                if(res.status === 400){
                    password.appendChild(error)
                    error.textContent = "Complete all required fields"

                    setTimeout(function(){

                        error.remove()

                    },3000)

                    return
                }
                password.appendChild(error)
                cancelBut.remove()
                passwordInput.remove()
                oldPasswordInp.remove()
                saveBut.remove()
                error.textContent = "Password changed succesfully"
                error.style.color = "green"
                password.appendChild(changeBut)
                


                setTimeout(function(){
                    error.remove()
                    
                },3000)
            })
            
            

        })
    })
})