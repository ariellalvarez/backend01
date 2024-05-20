import express from 'express';

import { products } from './products.js';

import { UserManager } from './user.manager.js';

const userManager = new UserManager('./users.json');

const app = express();

app.use(express.json());

app.get('/products', (req, res) => {
    //res.send('mi primer servidor express');
    res.status(200).json(products);
})

app.get('/users', async (req, res) => {
    try{
        const {age}= req.query;
        const {name}= req.query;
        console.log(age);
        console.log(name);
        
        const users = await userManager.getUsers();

        const usersFilter = users.filter(user => user.age <= parseInt(age));
        
        const usersFilterName = users.filter(user => user.firstname === name);

        if(!age && !name) res.json(users)
            else {
        if(age) res.status(200).json(usersFilter)
            else res.status(200).json(usersFilterName)
    }

    } catch(error){
        res.status(500).json({msg: 'Server error'});
    }
   
    
})

app.get('/user/:id', async(req, res)=>{
    try{
    const {id} = req.params
    console.log(id);
    const users = await userManager.getUsers();
    const user = users.find(user => user.id === parseInt(id));
    if(!user) res.status(404).json({msg: 'User not found'});
    else res.status(200).json(user)
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg: 'Server error'});
    }
})

app.post('/user', (req, res)=>{
    console.log(req.body);
})

const PORT = 8080;

app.listen(PORT, ()=>console.log (`server en ${PORT}`));

