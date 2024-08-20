import {  signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {auth } from './config.js'


let forms = document.querySelector("#forms")
// let userName = document.querySelector("#first-name")
// let lastName = document.querySelector('#last-name')
let email = document.querySelector("#email")
let password = document.querySelector("#pass")






forms.addEventListener("submit" , (event)=>{
    event.preventDefault()

    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    window.location = "index.html"
    
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });

})