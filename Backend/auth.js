
const {Question, User}= require('./schema.js')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const register = async (req, res) => {
    const user = req.body;
    try {
      const obj = await User.create(user);
  
      const questions = await Question.find({});
      const final_list = questions.map(q => ({ ...q.toObject(), book: false }));
  
    
      obj.final_list = final_list;
      await obj.save();
  
      const token = jwt.sign(
        { id: obj._id, name: obj.name, email: obj.email }, 
        process.env.JWT_secret
      );
  
      res.json({
        user: obj,
        token
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Registration failed" });
    }
  };
  
const login = async (req, res) => {
    const user = req.body;

    try {
      
        const userr = await User.findOne({email: user.email });

    
        if (!userr) {
            return res.status(300).json({ msg: "Invalid username or password" });  
        }

       
        const isTrue = await userr.comparePassword(user.password);

        if (!isTrue) {
            return res.status(400).json({ msg: "Invalid username or password" });
        }

       
        const token = jwt.sign(
            { id: userr._id, name: userr.name }, 
            process.env.JWT_secret, 
        );

       
        res.json({
            user: userr,
            token
        });
        console.log("login succes", userr)

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error during login' });  
    }
};


module.exports= {

    register, login
    
}
