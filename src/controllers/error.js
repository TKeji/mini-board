const show404 = (req, res)=>{
  console.log("")
  res.status(400).render("not-found")
  // res.status(404).send("404 Error")
  
}


module.exports = {
  show404
}