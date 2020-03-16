const moment = require("moment")
const getDB = require("../utils/database").getDB

/*
  _id
  message,
  author: {_id, username},
  updatedAt: 
  createdAt: ObjectID.getTimestamp(_id)
*/

class Post{
  constructor(message, author = {_id: undefined, username: "Admin"}){
    this.message = message 
    this.updatedAt = undefined
    this.author = {
      _id: author._id,
      username: author.username
    }
  }

  async save(){
    const Post = getDB().collection("posts")
    try{
      const post = await Post.insertOne({
        ...this,
        updatedAt: Date.now()
      })
      console.log(post)
    } catch(e){
      console.log(e)
      throw new Error("Unable to save post")
    }
  }
}

module.exports = {
  Post
}