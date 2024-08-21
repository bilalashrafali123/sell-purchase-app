// All imports 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {  getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"
import { auth, db } from './config.js'

// selectors and variables
let userImage = document.querySelector('#profileImage')
let signOutBtn = document.querySelector('#logout')
let userAvatar = document.querySelector('.nav-icons')
let searchInput = document.querySelector('.searchInput')
let produtsDiv = document.querySelector('.products')

let productsArr = []

// check user login or not 
function checkUserStatus() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);

      const q = query(collection(db, "data"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      let userData;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
        console.log(userData);
        userImage.src = userData.profileUrl;
      });
    } else {
      console.log('no user');
      userAvatar.innerHTML = `<button class="h-login btn btn-outline btn-secondary"><a href="login.html">login</a></button>`;
    }
  });
}

checkUserStatus();

// signout function 
signOutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log("signOut successfully");
  }).catch((error) => {
    console.log('signOut error ==>' + error);
  });
})

// get products data from firestore 
async function getData() {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    productsArr.push(doc.data());
  });
  renderProducts();
}

getData();


function renderProducts(products = productsArr) {
  console.log(products);
  
  produtsDiv.innerHTML = "";
  products.map((items) => {
    produtsDiv.innerHTML += `
            <div class="card bg-base-100 w-96 p-[1rem] shadow-xl flex justify-center flex-wrap">
                <figure>
                    <img class="proImg" src="${items.productPic}">
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${items.productTitle}</h2>
                    <p>${items.productPrice}</p>
                    <p>${items.productDesc}</p>
                    <div class="card-actions justify-end">
                        <button id="more" class="btn btn-primary">More...</button>
                    </div>
                </div>
            </div>
        `;
  });
 

 
  let moreButtons = document.querySelectorAll('#more');
  moreButtons.forEach((moreBtn, index) => {
    moreBtn.addEventListener('click', () => {
      console.log(products[index]);
      localStorage.setItem('singleProduct', JSON.stringify(products[index]));
      window.location = "singleProduct.html";
    });
  });
}


searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  const filteredProducts = productsArr.filter(product =>
    product.productTitle.toLowerCase().includes(query)
  );
console.log(filteredProducts);

  renderProducts(filteredProducts);
});