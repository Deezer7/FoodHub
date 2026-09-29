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



app.post("/orders", async function(req, res){

    let cart = req.body.cart
    let total = 0

    for(let item of cart){
        let id = item.id
        let quantity = item.quantity

        let result = await pool.query(
            "SELECT id, price FROM products WHERE id = $1",
            [id]
        )

        let price = result.rows[0].price
        
        let subtotal = price * quantity

        total = total + subtotal

        

        

        
    }
        let ordersResult = await pool.query(
            `INSERT INTO orders (user_id, status, total)
            VALUES ($1, $2, $3)
            RETURNING id`,
            [ null, "pending", total]) 
            
            let orderId = ordersResult.rows[0].id
            console.log(orderId)

            for(let item of cart){
                let id = item.id
                let quantity = item.quantity
                
                let result = await pool.query(
                    "SELECT id, price FROM products WHERE id = $1",
                    [id]
                )

                    let price = result.rows[0].price

                    await pool.query(`INSERT INTO order_items (order_id, product_id, quantity, price)
                        VALUES($1, $2, $3, $4)`,
                        [orderId, id, quantity, price ]
                    )
            }

})


app.get("/admin", function(req, res){
    res.sendFile(__dirname + "/public/adminMain.html")
})


app.listen(3000, function(){
    console.log("http://localhost:3000")
});

