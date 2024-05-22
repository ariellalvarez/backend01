import { Router } from "express";
const router = Router();

import UserManager from '../managers/user.manager.js';
const userManager = new UserManager('./src/data/users.json');

router.get('/', async (req, res) => {
    try{

        const users =await userManager.getUsers()
        res.status(200).json(users)

        
    }catch(error){
        console.log(error);
        res.status(500).send(error.message)
    }
})

router.get('/:idUser', async (req, res) => {
    try {
      const { idUser } = req.params;
      const user = await userManager.getUserById(idUser);
      // console.log(user);
      if (!user) res.status(404).json({ msg: "User not found" });
      else res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  router.post('/', async (req, res) => {
    try {
      console.log(req.body);
      const user = await userManager.createUser(req.body);
      if (!user) res.status(404).json({ msg: "User already exists" });
      else res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  router.put("/:idUser", async (req, res) => {
    try {
      const { idUser } = req.params;
      const response = await userManager.updateUser(req.body, idUser);
      if (!response) res.status(404).json({ msg: "Error updating user" });
      else res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  router.delete("/:idUser", async (req, res) => {
    try {
      const { idUser } = req.params;
      const response = await userManager.deleteUser(idUser);
      if (!response) res.status(404).json({ msg: "Error delete user" });
      else res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  export default router;