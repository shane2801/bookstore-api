import express from 'express';
import productRoutes from './api/routes/products.js'
import orderRoutes from './api/routes/orders.js'
import userRoutes from './api/routes/users.js'
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
// console.log('Hello from app.js', process.env.DB_USER);

// app.use((req, res, next)=>{

//     res.status(200).json({message:'It works!'});

// });

app.use(morgan('dev'));

// parse only simple bodies for url encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// handling CORS ERRORS
app.use((req, res, next) => {
    // give access to any clients
    res.header('Access-Control-Allow-Origin', '*');
    // what headers to allow
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST PATCH, DELETE, GET');
        return res.status(200).json()
    }

    next();
})





app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);


// handle requests that reach this part (no routes handling defined)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})



// handle requests with errors, coming from all over the app
app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({ error: { message: error.message } });
})

export default app;