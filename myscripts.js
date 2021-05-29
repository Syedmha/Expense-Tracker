// Getting the elements from HTML
const disExpense = document.querySelector('#total-exp');
const inputAmount = document.querySelector('#amount');
const inputTitle = document.querySelector('#place');
const form = document.querySelector('#form');
const displayList = document.querySelector('#bottom-records');
const signout = document.querySelector('#sign-out');
const userImage = document.querySelector('#userImage');
const uname = document.querySelector('#h1');
const helloName = document.querySelector('#welcome');
const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const rec = document.getElementById('records');

// const itemDel = document.createElement('item-delete');
// itemDel.classList.add("fas");
// itemDel.classList.add("fa-times");


const auth = firebase.auth();
const currentUser = auth.currentUser;


auth.onAuthStateChanged((currentUser) => {
  if (currentUser) {
    let userName = currentUser.displayName;
    let firstName = (currentUser.displayName.split(' ')[0]);
    uname.textContent = userName;
    helloName.textContent = firstName;
    userImage.src = currentUser.photoURL;
    displayTotalExpense();
    // displayAllData();
    //fetchAllData();
    //displayItems();
    // updatedb();
    //displayName.split(' ')[0]
  }
});

function addElements(doc) {
    const rec = document.getElementById('records');
    // const ul=document.getElementById('records');

    // const li= document.createElement('li');
            const iidd = doc.id;
            //console.log(iidd);
            const iconn1 = doc.data().icon;
            const item1 = doc.data().item;
            const cat1 = doc.data().cat;
            const price1= doc.data().amountSpent;
            const uid1 = doc.data().uid;

    console.log(iidd);
    const div1 = document.createElement('div');
    div1.setAttribute('id', 'bottom-records');

    
    const div2 = document.createElement('div');
    div2.setAttribute('id', 'icon-box');
    const iconn = document.createElement('i');
    div2.appendChild(iconn);
    div1.appendChild(div2);

    const div3 = document.createElement('div');
    div3.setAttribute('id', 'item-text1');
    const item = document.createElement('H1');
    item.setAttribute('id', 'item-h1');
    const p1 = document.createElement('P');
    div3.appendChild(item);
    div3.appendChild(p1);
    div1.appendChild(div3);

    const div4 = document.createElement('div');
    div4.setAttribute('id', 'item-text2');
    const price = document.createElement('H2');
    price.setAttribute('id', 'item-price');
    const p2 = document.createElement('P');
    div4.appendChild(price);
    div4.appendChild(p2);
    div1.appendChild(div4);

    const div5 = document.createElement('div');
    div5.setAttribute('id', 'item-delete');
    const del = document.createElement('i');
    del.setAttribute('class', 'fas fa-times');
    div5.appendChild(del);
    div1.appendChild(div5);

    div5.addEventListener("click", () =>
    deleteDoc(uid1, price1, iidd)
  );

    iconn.innerHTML = iconn1;
    item.innerHTML = item1;
    p1.innerHTML = cat1;
    price.innerHTML = '~ &#x20b9; ' + price1;
    p2.innerHTML = "21 may 2021";
    
    rec.appendChild(div1);
    // li.appendChild(div1);
    // ul.appendChild(li);


    function deleteDoc (uid, price, iidd) {
        // console.log(iidd);
        const db = firebase.firestore();
        //const uid = auth.currentUser.uid;
        const name = auth.currentUser.displayName.split(' ')[0];
        db.collection('users').doc(`${name},${uid}`).collection('ExpensesArray').doc(iidd).delete()
        .then(() => {
            alert("Successfully deleted the item");
            // displayAllData();
            rec.removeChild(div1);
        })
        .catch((err) => alert(err.message));
        updateTotalExpenses(price, true);
    }
}




function fetchAllData () {
    const db = firebase.firestore();
    const uid = auth.currentUser.uid;
    const name = auth.currentUser.displayName.split(' ')[0];
    db.collection('users').doc(`${name},${uid}`).collection('ExpensesArray')
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
          let changes = snapshot.docChanges();
        changes.forEach((change) => {
            if(change.type == 'added') {
            const iconn1 = change.doc.data().icon;
            const item1 = change.doc.data().item;
            const cat1 = change.doc.data().cat;
            const price1= change.doc.data().amountSpent;
            const uid1 = change.doc.data().uid;
            addElements(iconn1, item1, cat1, price1, uid1);
            }
        });
      });
}

function displayAllData () {
    const db = firebase.firestore();
    const uid = auth.currentUser.uid;
    const name = auth.currentUser.displayName.split(' ')[0];
    db.collection('users').doc(`${name},${uid}`).collection('ExpensesArray')
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
            // const iidd = doc.id;
            // const iconn1 = doc.data().icon;
            // const item1 = doc.data().item;
            // const cat1 = doc.data().cat;
            // const price1= doc.data().amountSpent;
            addElements(doc);
        });
      });
}
// declaring allExpenses array
let totalExpenses = 0;
const allExpenses = [];


// Submit function
function logSubmit(e)
{  
     e.preventDefault();
     
    // Declaring expenseItem object
    const expenseItem = {};

    let txtAmount = inputAmount.value;
    const expense = parseFloat(txtAmount);
    updateTotalExpenses(expense);
    //calcualting totalExpenses
    totalExpenses = totalExpenses + expense;
    disExpense.textContent = (Math.round(totalExpenses * 100) / 100).toFixed(2); 
    const exp1 = (Math.round(expense * 100) / 100).toFixed(2);
 
    
    const icons = checkIcon();
    const rr = checkButton();
    console.log(rr);
    //Updating Firestore DB
    const db = firebase.firestore();
    const uid = auth.currentUser.uid;
    const name = auth.currentUser.displayName.split(' ')[0];
    db.collection('users').doc(`${name},${uid}`).collection('ExpensesArray')
    .add({
      amountSpent: exp1,
      item: inputTitle.value ,
      icon: icons,
      cat: rr,
      uid: uid,
      timestamp: timestamp,
    });
    displayAllData();

}

//Updatig total expenses
function updateTotalExpenses(expense, del) {
    const db = firebase.firestore();
    const uid = auth.currentUser.uid;
    const name = auth.currentUser.displayName.split(' ')[0];
    if (del) {
        db.collection('users').doc(`${name},${uid}`).collection('totalexpense').doc('total')
        .set({
          totalExpenses: totalExpenses - expense,
        });
    } else {
        db.collection('users').doc(`${name},${uid}`).collection('totalexpense').doc('total')
        .set({
          totalExpenses: totalExpenses + expense,
        });
    }
  
    db.collection('users').doc(`${name},${uid}`).collection('totalexpense').doc('total')
      .get()
      .then((doc) => {
        if (doc.exists) {
          totalExpenses = doc.data().totalExpenses;
          // re rendering the respective element again
          disExpense.textContent = (Math.round(totalExpenses * 100) / 100).toFixed(2);
        }
      });
  }

// Display Total Expense 
function displayTotalExpense () {
    const db = firebase.firestore();
    const uid = auth.currentUser.uid;
    const name = auth.currentUser.displayName.split(' ')[0];

    db.collection('users').doc(`${name},${uid}`).collection('totalexpense').doc('total')
    .get()
    .then((doc) => {
      if (doc.exists) {
        totalExpenses = doc.data().totalExpenses;
        // re rendering the respective element again
        disExpense.textContent = (Math.round(totalExpenses * 100) / 100).toFixed(2);
    }})
}

//Displaying list items
// function displayItems() {
//     const db = firebase.firestore();
//     const uid = auth.currentUser.uid;
//     const name = auth.currentUser.displayName.split(' ')[0];
//     db.collection('users').doc(`${name},${uid}`).collection('ExpenseArray')
//       .orderBy("timestamp", "desc")
//       .get()
//       .then((snapshot) => {
//         snapshot.forEach((doc) => {
//             generateList(doc)
//         });
//       });

    
//   }

// Generating lists 
// function generateList (snap_doc)
// {
//         const tr =  
//         `<div id='bottom-records'>
//         <div id='icon-box'>
//             ${snap_doc.data().icon}
//         </div>
//         <div id='item-text1'>
//             <h1 id='item-h1'> ${snap_doc.data().item} &nbsp</h1>
//             <p>${snap_doc.data().cat}</p>
//         </div>
//         <div id='item-text2'>
//             <h1 id='item-price'>~ &#x20b9; ${snap_doc.data().amountSpent}</h1>
//             <p> 21 May 2021</p>
//         </div>
//         <div id='item-delete'>
//             <i class="fas fa-times"></i>
//         </div>
//         </div>
//         </div>`;
//      records.insertAdjacentHTML('beforeend', tr);

//      function itemDelete () {
//         console.log('yes');
//     }
    
//      const itemDel = document.createElement('item-delete');
//      itemDel.addEventListener('click', itemDelete);
        
      
// }

// Funtion to check icons
function checkIcon() {
if(document.getElementById('Food & Beverage').checked) {    
    return  `<i class="fas fa-pizza-slice"></i>`;
}
else if(document.getElementById('Travel/Commute').checked) {   
    return   `<i class="fas fa-car"></i>`;
}   
else if(document.getElementById('Shopping').checked) {   
   return  `<i class="fas fa-shopping-bag"></i>`;
}  
}


//Function to check selected item
function checkButton() {  
     if(document.getElementById('Food & Beverage').checked) {    
          return  document.getElementById("Food & Beverage").value;
    }   
    else if(document.getElementById('Travel/Commute').checked) {   
          return   document.getElementById("Travel/Commute").value;
    }   
    else if(document.getElementById('Shopping').checked) {   
         return  document.getElementById("Shopping").value;
    }  
} 


 

form.addEventListener('submit', logSubmit);


// Sign out function
const googleSignOut = () => {
    firebase.auth().signOut().then(() => {
        window.location.assign('index.html');
      }).catch((error) => {
        console.error(error);
      });
}

signout.addEventListener('click', googleSignOut);








    

   


