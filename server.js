const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt")
const app = express();
const session = require("express-session")
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

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

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
            res.json({ orderId: orderId })
})


app.get("/admin", function(req, res){
    res.sendFile(__dirname + "/public/adminMain.html")
})

app.get("/adminOrders", async function(req, res){

    let response = await pool.query('SELECT * FROM orders')

    res.json(response.rows)
})

app.delete("/adminOrders/:id", async function(req, res){

    let id = Number(req.params.id)

    pool.query('DELETE FROM orders WHERE id = $1',
        [id],
        function(error, result){
            if(error) {
                return res.status(500).send("DB ERROR")
            }
            res.json({message: "Deleted"})
        }
    )

})

app.get("/public/adminOrders/open/:id", function(req, res){

    

    res.sendFile(__dirname + "/public/adminOrdersDet.html")


})

app.get("/api/adminOrders/open/:id", async function(req, res){

    let id = Number(req.params.id)

    let order = await pool.query('SELECT orders.id AS order_id, products.name AS product, order_items.quantity AS quantity, order_items.price AS price, orders.status AS status, orders.total AS total FROM orders JOIN order_items ON orders.id = order_items.order_id JOIN products on order_items.product_id = products.id WHERE orders.id = $1',
        [id]
    )

    res.json(order.rows)
    
})

app.patch("/api/adminOrders/open/:id", async function(req, res){
    let id = Number(req.params.id)
    let status = req.body.status

    await pool.query(
        `UPDATE orders SET status = $1 WHERE id = $2 `,
        [status, id]
    )

    res.json({message: "status updated"})
    
})

app.delete("/api/adminOrders/open/:id", async function(req, res){
    let id = Number(req.params.id)

    await pool.query(`DELETE FROM orders WHERE id = $1`,
        [id]
    )
    res.json({message: "Order deleted"})
})

app.get("/admin/products", async function(req, res){

    let products = await pool.query(`SELECT * FROM products ORDER BY id ASC`)

    res.json(products.rows)

})

app.get("/admin/products/category", async function(req, res){

    let categories = await pool.query(`SELECT DISTINCT category FROM products`)

    res.json(categories.rows)

})

app.delete("/admin/products/:id", async function(req, res){
    let id = Number(req.params.id)
    
    await pool.query(`DELETE FROM products WHERE id = $1`,
        [id]
    )

    res.json({message: "Product deleted"})
})


app.patch("/admin/products/:id", async function(req, res){
    let id = Number(req.params.id)

    let name = req.body.name
    let price = req.body.price
    let desc = req.body.desc
    let category = req.body.category
    let available = req.body.available

    await pool.query (`UPDATE products  SET name = $2, price = $3, description = $4, category = $5, available = $6 WHERE id = $1`, 
        [id, name, price, desc, category, available]
    )

    res.json({message: "Product updated"})

})

app.get("/admin/products/create", function(req, res){

    res.sendFile(__dirname + "/public/adminCreateProd.html")
})


app.post("/create", async function(req, res){

    let name = req.body.name
    let price = Number(req.body.price)
    let description = req.body.description
    let category = req.body.category
    let img = req.body.img

    if (!name || !price || !description || !category || !img){
        return res.status(400).send("Complete all fields")

    }
    if (!Number.isFinite(price) || price <= 0) {
    return res.status(400).send("Invalid price")}

    await pool.query(`INSERT INTO products (name, price, description, category, img, available) VALUES ($1, $2, $3, $4, $5, true)`,
        [name, price, description, category, img]
    )

    res.redirect("/admin/products/create")

})

app.get("/signUp", function(req, res){

    res.sendFile(__dirname + ("/public/signUp.html"))

})

app.post("/register", async function(req, res){

    let name = req.body.name
    let email = req.body.email
    let password = req.body.password

    if (!name || !email || !password){
        res.status(400).send("Complete all fields")
    }

    let hashed = await bcrypt.hash(password, 10)
try{
    await pool.query(`INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)`,
        [name, email, hashed]
    )

    res.redirect("/logIn")
}
catch (err){
    if (err.code = 23505){
    return res.status(409).send("This email already exists, try logging in")
}
return res.status(500).send("Server error")
}

})

app.get("/logIn", function(req, res){
    res.sendFile(__dirname + "/public/logIn.html")
})

app.post("/loggingIn", async function(req, res){

    let email = req.body.email
    let password = req.body.password

    let result = await pool.query(`SELECT * FROM users WHERE email = $1`,
        [email]
    )

    let user = result.rows[0]

    if(result.rows.length === 0){
        return res.status(404).send("This email does not exist, try signing up")
    }

    let compare = await bcrypt.compare(password, result.rows[0].password_hash)

    if (compare === false){
        return res.status(401).send("Wrong password")
    }

    req.session.userId = user.id

    res.redirect("/")

})

app.listen(3000, function(){
    console.log("http://localhost:3000")
});

