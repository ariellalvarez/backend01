import http from 'http';
import { products } from './products.js';

const server = http.createServer((req, res)=>{
    
    //console.log(req.url)
    if(req.url=== '/products'){
        res.end(JSON.stringify(products))
    } 

    if(req.url=== '/home'){
        res.end('welcome')
    } 

})

server.listen(8080, ()=> console.log('listening on port 8080'))