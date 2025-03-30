import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  category: String,
  summary: String
});

const Article = mongoose.model('Article', articleSchema);
export default Article;