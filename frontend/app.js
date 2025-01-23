const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/reset-password/:token', (req, res) => {
    
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
