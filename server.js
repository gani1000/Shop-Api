

require('dotenv').config();
require('express-async-errors');
const ErrorHandlerMiddlerWare = require('./middleware/ErrorHandler');
const routerAuthenticateUser = require('./routes/User');
const NotFound = require('./middleware/NotFound');
const shopAPI = require('./routes/shopAPI');
const connectDB = require('./db/connect');
const express = require('express');
const path = require('path');
const app = express();


/* access req.body */
app.use(express.json());
app.use(express.static('./public'))



/* Ending point */
app.get('/', (req, res) => {
    res.sendFile('welcomepage.html', { root: path.join(__dirname, './public/html')})
});

app.get('/welcomepage.html', (req, res) => {
    res.sendFile('welcomepage.html', { root: path.join(__dirname, './public/html')})
});

app.get('/shopAPI.html', (req, res) => {
    res.sendFile('shopAPI.html', { root: path.join(__dirname, './public/html')})
});

app.get('/login.html', (req, res) => {
    res.sendFile('login.html', { root: path.join(__dirname, './public/html')})
});

app.get('/profile.html', (req, res) => {
    res.sendFile('profile.html', { root: path.join(__dirname, './public/html')})
});

/* Routes */
app.use('/api/v01/shop', shopAPI);
app.use('/api/v01/auth', routerAuthenticateUser);

/* Error Middleware Handler */
app.use(ErrorHandlerMiddlerWare);

/* Not Found Routes */
app.use(NotFound);


/* DOM test */
app.use('/', (req, res) => {
    res.send('seccess!!')
})

const port = process.env.PORT || 7000;

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}


startServer();