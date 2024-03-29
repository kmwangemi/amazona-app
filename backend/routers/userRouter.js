import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
   // await User.remove({})
   const createdUsers = await User.insertMany(data.users);
   res.send({ createdUsers })
}))

// user signin
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
   const user = await User.findOne({ email: req.body.email });
   if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
         res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(user)
         });
         return;
      }
   }
   res.status(401).send({ message: 'Invalid email or password' })
}))

// user register
userRouter.post('/register', expressAsyncHandler(async (req, res) => {
   const user = new User({ 
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
   });
   const createdUser = await user.save()
   res.status(200).send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isSeller: user.isSeller,
      token: generateToken(createdUser)
   }
   );
}))

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
   // await User.remove({})
   const user = await User.findById(req.params.id);
   if (user) {
      res.send(user);
   } else {
      res.status(404).send({message: 'User Not Found'})
   }
}))

userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);
   if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if(user.isSeller) {
         user.seller.name = req.body.sellerName || user.seller.name
         user.seller.logo = req.body.sellerLogo || user.seller.logo
         user.seller.description = req.body.sellerDescription || user.seller.description
      }
      if (req.body.password) {
         user.password = bcrypt.hashSync(req.body.password, 8)
      }
      const updatedUser = await user.save();
      res.send({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
         isSeller: user.isSeller,
         token: generateToken(updatedUser),
      });
   } else {
      res.status(404).send({message: 'User Not Found'})
   }
}))

// get all users
userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
   const users = await User.find({});
   res.status(200).send({ message: 'Users', users })
}))

// update a user
userRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
   const userId = req.params.id;
   const user = await User.findById(userId);
   if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = req.body.isSeller || user.isSeller;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save()
      res.status(200).send({ message: 'User Updated', user: updatedUser });
   } else {
      res.status(404).send({ message: 'User Not Found' });
   }
}))

// delete a user
userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
   const userId = req.params.id;
   const user = await User.findById(userId);
   if (user) {
      if (user.email === 'admin@example.com') {
         res.status(400).send({ message: 'Cannot Delete Admin User' });
         return;
      }
      const deleteUser = await user.remove()
      res.status(200).send({ message: 'User Deleted', user: deleteUser });
   } else {
      res.status(404).send({ message: 'User Not Found' });
   }
}))

export default userRouter;