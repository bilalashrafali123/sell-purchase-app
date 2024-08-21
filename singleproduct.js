import { onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"

import { auth, db } from './config.js'


let userImage =document.querySelector('#profileImage')
let signOutBtn = document.querySelector('#logout')
let userAvatar =document.querySelector('.nav-icons')

function checkUserStatus() {

    onAuthStateChanged(auth, async (user) => {
  
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
  
        const q = query(collection(db, "data"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        let userData;
        querySnapshot.forEach((doc) => {
          userData = doc.data()
          console.log(  userData);
          
          userImage.src = userData.profileUrl
        });
  
  
  
  
      }
  
      else {
        console.log('no user');
       userAvatar.innerHTML = `<button class = "h-login btn btn-outline btn-secondary">  <a href="login.html">login</a> </button>`
  
  
      }
    });
  
  }
  
  checkUserStatus()
  
  signOutBtn.addEventListener('click' , ()=>{
    signOut(auth).then(() => {
      console.log("signOut successfully");
      
    }).catch((error) => {
      console.log('signOut error ==>' + error );
      
    });
  })


let getLocalData = JSON.parse(localStorage.getItem('singleProduct'))
console.log(getLocalData);
let display = document.querySelector('.product-container')


display.innerHTML = `<div class="product-image">


<img src="${getLocalData.productPic}" alt="Product Image">
</div>
<div class="product-details">
<h1>${getLocalData.productTitle} </h1>
<p class="product-description">
   ${getLocalData.productDesc}
</p>
<p class="product-price">${getLocalData.productPrice} Rs.</p>
<button class="add-to-cart">Add to Cart</button>


</div>`

