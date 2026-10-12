fetch("/greet", {
    method: "GET"
})
.then(function(res){
    return res.json()
})
.then(function(user){

    let greet = document.querySelector(".greetings")
    let name  = user[0].name

    greet.textContent = "Hello, " + name + ", craving for something delicious?"

})