const express = require('express');
const router = express.Router();
const { Question, Category, User } = require('./schema.js');
const { register, login } = require('./auth.js');
const { Query } = require('mongoose');

router.get('/questions', async (req, res) => {
  try {
    const { search = "", title = "", page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    let quests = [];
    
    if (title === "") {
      quests = await Question.find({ title: new RegExp(search, "i") });
    } else {
      const category = await Category.findOne({ title: title });
      if (!category) {
        return res.json({ error: "Category not found" });
      }

      const regex = new RegExp(search, "i");
      for (let quesId of category.questions) {
        const quest = await Question.findById(quesId);
        if (quest && regex.test(quest.title)) {
          quests.push(quest);
        }
      }
    }

    const start = limitNum * (pageNum - 1);
    const quest_cut = quests.slice(start, start + limitNum);

    const totalPages = Math.ceil(quests.length / limitNum);

    res.json({ data: quest_cut, total: quests.length, totalPages });

  } catch (err) {
    console.log(err);
    res.json({ error: "error" });
  }
});



router.post('/book', async (req, res) => {
  try {
    const { id } = req.body;

 
    const user = await User.findOne({ name: req.user.name });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }

     
      if (!user.book.includes(question._id)) {
        user.book.push(question._id);
      }
     else {
      
      user.book = user.book.filter(
        (qId) => qId.toString() !== question._id.toString()
      );
    }
   
  
    await question.save();

   
  

    await user.save(); 
    // const user_after = await User.findOne({ name: req.user.name });
    // const question_after = await Question.findOne({ title });
    // console.log(user_after);
    // console.log(question_after);

    res.json({ msg: "Bookmark toggled successfully", question });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error" });
  }
});

router.get('/getbook', async (req, res) => {
  try {
  
    const user = await User.findOne({ name: req.user.name });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

   
    const questions = await Question.find({ _id: { $in: user.book } });

    res.json({ final_list : questions, name: req.user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error" });
  }
});



module.exports = router;
