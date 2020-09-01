let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/posts", {useNewUrlParser: true, useUnifiedTopology: true});

let commentSchema = new mongoose.Schema({
  content: String
});

module.exports = mongoose.model("Comment", commentSchema);
