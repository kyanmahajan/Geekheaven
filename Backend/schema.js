const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// 1. User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  book: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
// 2. Question Schema
const questionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  url: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'], 
    required: true 
  },
  book: {type: Boolean}
});

// 3. Category Schema
const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

// Create Models
const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);
const Category = mongoose.model('Category', categorySchema);

// Export Models
module.exports = { User, Question, Category };
