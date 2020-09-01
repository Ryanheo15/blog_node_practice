let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/posts", {useNewUrlParser: true, useUnifiedTopology: true});

let postSchema = new mongoose.Schema({
  title: String,
  image: String,
  author: String,
  content: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

module.exports = mongoose.model("Post", postSchema);
