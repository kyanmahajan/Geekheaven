const mongoose = require('mongoose');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
const { connectDB } = require('./mongoose.js'); 

// Import models
const { User, Question, Category } = require('./schema.js'); 
 category_names = [];
const populate = async () => {
  try {
    await connectDB(process.env.stringg); 
    console.log("✅ Database connected");

    const { data } = await axios.get('https://test-data-gules.vercel.app/data.json');
    const categories = data.data;
   

    for (let point of categories) {
      let ques_ids = [];
      category_names.push(point.title);

      for (let quest of point.ques) {
        // Decide which link to use
        let link = quest.p1_link || quest.p2_link;

        if (link) {
          // Create Question
          const createdQuestion = await Question.create({
            title: quest.title,
            url: link,
            difficulty: "Easy" ,
            book : false
          });

          ques_ids.push(createdQuestion._id);
        } else {
          console.log(`⏭️ Skipped question "${quest.title}" (no link found)`);
        }
      }

      // Create Category
      await Category.create({
        title: point.title,
        questions: ques_ids
      });

      console.log(`📂 Added category: ${point.title}`);
    }

    console.log("🎉 Database population completed!");
    fs.writeFileSync("category_names.json", JSON.stringify(category_names, null, 2));

console.log("📂 Saved category names to category_names.json");
    process.exit(0); // Exit script when done
  } catch (err) {
    console.error("❌ Error populating DB:", err);
    process.exit(1);
  }


};

populate();




