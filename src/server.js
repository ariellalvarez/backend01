
import express from 'express';
import cartRouter from './routes/cart.router.js'
import productsRouter from './routes/products.router.js';
import { __dirname } from './path.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';

import { Server } from 'socket.io';

const app = express()

app.use(express.static(`${__dirname}/public`));
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

app.get('/websocket', (req, res)=>{
    res.render('websocket')
  })

const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`)
})

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket)=>{
    console.log(`Usuario conectado: ${socket.id}`);
  
    

})

