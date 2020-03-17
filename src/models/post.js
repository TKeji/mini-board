const moment = require("moment")
const getDB = require("../utils/database").getDB
const collectionName = "posts"
const {ObjectId} = require("mongodb")

/*
  _id
  message,
  author: {_id, username},
  updatedAt: 
  createdAt: ObjectID.getTimestamp(_id)
*/

class Post{
  constructor(message, author = {_id: undefined, username: "Admin"}){
    this._id
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

  static async findById(id){
    const Post = getDB().collection(collectionName)
    try{ 
      const post =  await Post.findOne({_id: ObjectId(id)})
      post._id = new ObjectId(post._id)
      // console.log(post)
      return post 
    } catch(e){
      throw new Error("Post not found")
    }
  }

  static async update(id, updateQuery){
    const Post = getDB().collection(collectionName)
    try{
      console.log(updateQuery)
      const post = await Post.updateOne({_id: ObjectId(id)}, {$set:updateQuery})
    }catch(e){
      console.log(e.message)
      throw new Error("Unable to update")
    }
  }
}

module.exports = {
  Post
}