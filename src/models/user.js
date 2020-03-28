const bcrypt = require("bcryptjs")
const {ObjectId} = require("mongodb")
const getdb = require("../utils/database").getDB
const collectionName = "users"

const SALT = 12

/*
  User: 
    _id
    name
    email 
    avatarUrl
    posts = [post_id]
*/

class User{
  constructor(name, email, password, avatarURL){
    this.name = name
    this.email = email 
    this.password = password
    this.avatarURL = avatarURL? avatarURL: `https://avatars.dicebear.com/v2/gridy/${new ObjectId()}.svg`
  }


  static async initialise(){
    const collections = await getdb().listCollections({name:collectionName}).toArray()
    // If collection exists 
    if (collections.length === 0){
      try{
        // Create the collection
        await getdb().createCollection(collectionName, {
          validator: {
            $jsonSchema: {
              bsonType: "object", 
              required: ["name", "email", "avatarURL" ],
              properties: {
                name: {
                  bsonType: "string", 
                  description: "Name must be a string and is required"
                }, 
                email: {
                  bsonType: "string",
                  description: "Email must be a string and is required"
                }, 
                password: {
                  bsonType: "string",
                  description: "Password must be a string and is required"
                }, 
                avatarURL: {
                  bsonType: "string", 
                  description: "Must be a string and required for each user", 
                }
              }
            }
          }
        })
      } catch(e){
        throw new Error("Couldn't Create Users Model\n Message:", e.message)
      }
      
      try{
        await getdb().collection(collectionName).createIndex({"email": 1}, {unique:true})
      } catch(e){
        throw new Error("Couldn't Create Index on Emails\n Message:", e.message)
      }
    }
  }

  static async create(userDetails){
    try{
      const {password} = userDetails
      const hash = await bcrypt.hash(password, SALT)
      userDetails.password = hash 
      console.log("NEW USER\n", userDetails)
      const res = await getdb().collection(collectionName).insertOne(userDetails)
      return JSON.parse(res).ops[0] // return user obj
    }catch(e){
      console.log(e.message)
      throw new Error("Email already Taken")
    }
  }

  static async findById(id){
    try{
      const user = await getdb().collection(collectionName).findOne({_id: new ObjectId(id)})
      return user
    }catch(e){
      throw new Error("Cannot find user")
    }
  }
  static async findByEmail(email){
    try{
      const user = await getdb().collection(collectionName).findOne({email})
      return user
    }catch(e){
      return e
    }
  }

  static async findAll(){
    try{
      return await getdb().collection(collectionName).find()
    }catch(e){
      throw new Error("Error getting users")
    }
  }

  static async findAndUpdate(id){

  }

  static async deleteBydId(id){
    try{
      const User = await getdb().collection(collectionName)
      return User.deleteOne({_id: ObjectId(id)})
    }catch (e){
      throw new Error("Error deleting User\n ", e.message)
    }
  }

}


module.exports = User