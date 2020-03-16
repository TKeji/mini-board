const moment = require("moment")
const getDB = require("../utils/database").getDB
const collectionName = "posts"

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
    const Post = getDB().collection(collectionName)
    try{
      const post = await Post.insertOne({
        ...this,
        updatedAt: Date.now()
      })
    } catch(e){
      console.log(e)
      throw new Error("Unable to save post")
    }
  }

  static async fetchAll(skip=0, noPerPage=5){
    const Post = getDB().collection(collectionName)
    const sortFilter = {
      "updatedAt": -1
    }
    try{
      return await Post.find({}).limit(noPerPage).skip(skip*noPerPage).sort(sortFilter).toArray()
    } catch(e){
      throw Error("Unable to fetch posts")
    }
  }
}

module.exports = {
  Post
}