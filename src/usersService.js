
const express = require('express');
const app = express();
const PORT = 3000;


const users = [
    { id: 1, name: 'Sonu', email: 'Sonu123@gmail.com' },
    { id: 2, name: 'Arun', email: 'Arun@gmail.com' },
];

app.get('/users/:id', (req, res) => {
    console.log(`Request received for user ID: ${req.params.id}`);
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

app.listen(PORT, () => {
    console.log(`✅ Users service is running on http://localhost:${PORT}`);
});