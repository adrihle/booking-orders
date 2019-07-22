const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const { database } = require('../keys')


//iniciando server
const app = express()

app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () => {
    console.log('server running correctly on port: ' + app.get('port'))
})

//init mysql pool
const pool = mysql.createPool(database)

//seteando los middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//setup rest api for customer
const getUser = 'SELECT * FROM customer'
const getSpecificUser = 'SELECT * FROM customer WHERE id = ?'
const postUser = 'INSERT INTO customer set ?'
const deleteUser = 'DELETE FROM customer WHERE id = ?'
const updateUser = 'UPDATE customer set ? WHERE id = ?'

app.get('/user', async (req, res) => {
    await pool.query(getUser, (err, rows) => {
        res.send(rows)
    })
})

app.get('/user/:id', async (req, res) => {
    await pool.query(getSpecificUser, [req.params.id], (err, rows) => {
        res.send(rows)
    })
})

app.post('/user', async (req, res) => {
    const { name, telephone, email } = req.body
    const newUser = {
        name,
        telephone,
        email
    }
    await pool.query(postUser, [newUser], () => {
        res.send( name + ' inserted correctly')
    })
})

app.delete('/user/:id', async (req, res) => {
    await pool.query(deleteUser, [req.params.id], () => {
        res.send( req.param.id + ' was delete correctly')
    })
})

app.put('/user/:id', async (req, res) => {
    const { name, telephone, email } = req.body
    const updatedUser = {
        name,
        telephone,
        email
    }
    await pool.query(updateUser, [updatedUser, req.params.id], () => {
        res.send(name + ' updated correctly')
    })
})

//setup rest api for orders
const getOrderByCustomer = 'SELECT * FROM orders WHERE customer_id = ?'
const postOrder = 'INSERT INTO orders set ?'
const deleteOrder = 'DELETE FROM orders WHERE order_id = ?'

app.get('/order/:customer_id', async (req, res) => {
    await pool.query(getOrderByCustomer, [req.params.customer_id], (err, rows) => {
        res.send(rows)
    })
})

app.post('/order', async (req, res) => {
    const { customer_id } = req.body
    const newOrder = {
        customer_id
    }
    await pool.query(postOrder, [newOrder], () => {
        res.send('order added to: ' + customer_id)
    })
})

app.delete('/order/:order_id', async (req, res) => {
    await pool.query(deleteOrder, [req.params.order_id], () => {
        res.send('order deleted by id: ' + req.params.order_id)
    })
})

//setup rest api for items
const getItemsByOrder = 'SELECT * FROM items WHERE order_id = ?'
const postItem = 'INSERT INTO items set ?'
const deleteItem = 'DELETE FROM items WHERE item_id = ?'
const updatedItem = 'UPDATE items set ? WHERE item_id = ?'

app.get('/item/:order_id', async (req, res) => {
    await pool.query(getItemsByOrder, [req.params.order_id], (err, rows) => {
        res.send(rows)
    })
})

app.post('/item', async (req, res) => {
    const { order_id, item_name, item_price, available } = req.body
    const newItem = {
        order_id,
        item_name,
        item_price,
        available
    }
    await pool.query(postItem, [newItem], () => {
        res.send('item added to: ' + order_id)
    })
})

app.delete('/item/:item_id', async (req, res) => {
    await pool.query(deleteItem, [req.params.item_id], () => {
        res.send(req.params.id + ' was deleted succesfully')
    })
})

app.put('/item/:item_id', async (req, res) => {
    const { order_id, item_name, item_price, available } = req.body
    const updatedItem = {
        order_id,
        item_name,
        item_price,
        available
    }
    await pool.query(updateUser, [updatedItem, req.params.item_id], () => {
        res.send(req.params.item_id + ' was updated successfully')
    })
})





