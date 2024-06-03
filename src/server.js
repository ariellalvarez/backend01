
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

/*app.get('/websocket', (req, res)=>{
    res.render('websocket')
  })*/



const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`)
})

const socketServer = new Server(httpServer);

const products = [];

socketServer.on('connection', (socket)=>{
    console.log(`Usuario conectado: ${socket.id}`);
  
    socket.on('disconnect', ()=>{
        console.log('Usuario desconectado');
      })
    

    socket.emit('saludoDesdeBack', 'Bienvenido a websockets')

    socket.on('respuestaDesdeFront', (message)=>{
      console.log(message);
    })

    socket.on('newProduct', (product)=>{
      products.push(product);
      socketServer.emit('products', products);
    })

    app.post('/websocket', (req,res)=>{
      const { message } = req.body;
      socketServer.emit('message', message);
      res.send('se envió mensaje al socket del cliente')
    })
  

  })

