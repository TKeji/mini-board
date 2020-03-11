const newPostForm = (req, res, next)=>{
  res.render("new")
}

const createPost = (req, res)=>{
  console.log(req.body)
  console.log(" Create ROUTE IS UNDER CONSTRUCTION")
  res.redirect("/posts")
}

const viewPosts = (req, res)=>{
  res.render("index")
}

const viewPost = (req, res)=>{
  res.send(" /:id ROUTE IS UNDER CONSTRUCTION")
}

const updatePost = (req, res)=>{
  res.send("Edit /:id ROUTE IS UNDER CONSTRUCTION")
}

const deletePost = (req, res)=>{
  res.send(" Delete /:id ROUTE IS UNDER CONSTRUCTION")
}


module.exports = {
  newPostForm,
  createPost, 
  viewPosts, 
  viewPost,
  updatePost, 
  deletePost
}