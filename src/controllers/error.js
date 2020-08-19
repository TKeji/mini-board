const show404 = (req, res)=>{
  console.log("404 Page")
  console.log(req.path)
  const userId = req.session.userId
  res.status(400).render("not-found", {
    userId
  })
}


module.exports = {
  show404
}