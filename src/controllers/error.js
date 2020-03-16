const show404 = (req, res)=>{
  console.log("404 Page")
  res.status(400).render("not-found")
}


module.exports = {
  show404
}