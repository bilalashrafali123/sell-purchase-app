import { collection, addDoc, getDocs ,query, where } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"; 
import {auth , db} from './config.js'
import {getStorage, ref , uploadBytes ,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

let form  = document.querySelector('#product-form')
let productPic = document.querySelector('#pdt-picture')
let productTitle = document.querySelector('#pdt-title')
let productPrice = document.querySelector('#pdt-price')
let productDesc = document.querySelector('#pdt-description')
let postBtn = document.querySelector(".postBtn")


import { onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";




let userImage =document.querySelector('#profileImage')
let signOutBtn = document.querySelector('#logout')
let userAvatar =document.querySelector('.nav-icons')

function checkUserStatus() {

    onAuthStateChanged(auth, async (user) => {
  
      if (user) {
      
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
       userAvatar.innerHTML = `<button class = "h-login">  <a href="login.html">login</a> </button>`
  
  
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














const storage = getStorage();




  async function showUrl(pic) {
    const titleValue = productTitle.value; // Capture the value
    console.log('Product Title:', titleValue);

    // Ensure that the reference is not pointing to the root
    const storageRef = ref(storage, `product-image/${titleValue}.png`);
    
    try {
        const uploadImg = await uploadBytes(storageRef, pic);
        console.log('File uploaded:', uploadImg);

        const url = await getDownloadURL(uploadImg.ref);
        console.log('Download URL:', url);

        return url;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
}





async function addProductInFirestore(){
const pdtPic = await showUrl(productPic.files[0])
console.log(productPic.files);


  try{
    const docRef = await addDoc(collection(db, "products"), {
      // productPic : 
      productTitle : productTitle.value,
      productPrice : productPrice.value,
      productDesc : productDesc.value,
      productPic : pdtPic
    })
  
    console.log("Document written with ID: ", docRef.id);
  }
  
  catch(e){ 
    console.log('error' , e);
    
  }
}






form.addEventListener('submit', async(event)=>{
 
    event.preventDefault()

    postBtn.textContent = 'loading ...'
    
    
    
    await  addProductInFirestore()
    
    
        window.location ="index.html"
   
 
   
    
})






