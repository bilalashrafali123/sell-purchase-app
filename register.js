import {  createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {auth , db} from './config.js'
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"; 
import {getStorage, ref , uploadBytes ,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";



let forms = document.querySelector("#forms")
let userName = document.querySelector("#first-name")
let lastName = document.querySelector('#last-name')
let email = document.querySelector("#email")
let password = document.querySelector("#pass")
let profilePic = document.querySelector('#profilePic')



const storage = getStorage();

  async function showUrl(files) {
    const storageRef = ref(storage, email.value);
    try {
      console.log(files);
        const uploadImg = await uploadBytes(storageRef , files);
        console.log(uploadImg);
        
        
         const url = await getDownloadURL(storageRef);
         
        console.log(url);

        return url;
    } catch (error) {
        console.error( error);
      
    }
  }







async function addDataInFirestore(uid){

 const urlFile =  await showUrl(profilePic.files[0])
 console.log(profilePic.files);
 
 console.log(urlFile);
 

    try {
        const docRef = await addDoc(collection(db, "data"), {
          email : email.value,
          password : password.value,
          uid : uid,
          profileUrl : urlFile
    
        });
        console.log(docRef);
        
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
} 



forms.addEventListener('submit' , (event)=>{
event.preventDefault()


createUserWithEmailAndPassword(auth, email.value, password.value)
.then((userCredential) => {
    // Signed up 
    console.log(userCredential);
    
    const user = userCredential.user;
    console.log(user);
     
    
    window.location = "login.html"
   
    
    addDataInFirestore(user.uid)
    
    // ...
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
    
    


})





