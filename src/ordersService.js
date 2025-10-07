console.log("Attempting to start Orders Service...");

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;


const orders = [
    { id: 101, userId: 1, product: 'Laptop', amount: 1200 },
    { id: 102, userId: 2, product: 'Mouse', amount: 25 },
];


app.get('/orders/:id/details', async (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).send('Order not found');
    }

    try {
      
        const userResponse = await axios.get(`http://localhost:3000/users/${order.userId}`);
        
    
        const fullOrderDetails = {
            orderId: order.id,
            product: order.product,
            amount: order.amount,
            user: userResponse.data
        };
        
        res.json(fullOrderDetails);

    } catch (error) {
        console.error('Error communicating with Users service:', error.message);
        res.status(500).send('Failed to fetch user details. Is the Users service running?');
    }
});

app.listen(PORT, () => {
    console.log(`✅ Orders service is running on http://localhost:${PORT}`);
});


module.exports = app;