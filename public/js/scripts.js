const message = document.querySelector(".message")
if (message){
  // errorMessage.classList.add("close-transition")
  console.log("Found flash message")
  setTimeout(()=>{
    message.style.opacity = 0
    // errorMessage.style.visibility = "hidden"
    setTimeout(()=>{
      message.style.display = "none"
    }, 500)
  }, 800)
}