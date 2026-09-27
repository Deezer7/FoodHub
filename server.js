const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname))
const pool = new Pool ({
    user: "postgres",
    host: "localhost",
    database: "foodHub",
    password: "1488",
    port: 5432

})

pool.query ("SELECT NOW()", function(err, result){
    if (err){
        console.log(err)
        return;
    }

    console.log(result.rows)
})

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/menu", function(req, res){
    res.sendFile(__dirname + "/public/menu.html")
})

app.get("/products", async function(req, res){

    const menu = await pool.query("SELECT * FROM products ")

    res.json(menu.rows);

});

app.listen(3000, function(){
    console.log("http://localhost:3000")
});

