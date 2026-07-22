import express from 'express';
import productRoutes from './api/routes/products.js'
import orderRoutes from './api/routes/orders.js'
import userRoutes from './api/routes/users.js'
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { logger } from './api/utils/logger.js';
import { errorHandler } from './api/middleware/errorMiddleware.js';
import {requestLogger} from './api/middleware/requestLogger.js';
import { requestId } from './api/middleware/uuidMiddleware.js';


const app = express();

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


app.use(requestId);
app.use(requestLogger)



app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);


// handle requests that reach this part (no routes handling defined) 404 errors
app.use((req, res, next) => {
    const error = new Error('NOT Found');
    error.status = 404;
    next(error);
})




// global error handler (LAST)
app.use(errorHandler);

export default app;