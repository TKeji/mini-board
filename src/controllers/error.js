const show404 = (req, res)=>{
  console.log("404 Page")
  console.log(req.path)
  res.status(400).render("not-found")
}


module.exports = {
  show404
}