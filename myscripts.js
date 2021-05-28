// Getting the elements from HTML
const disExpense = document.querySelector('#total-exp');
const inputAmount = document.querySelector('#amount');
const inputTitle = document.querySelector('#place');
const form = document.querySelector('#form');
const displayList = document.querySelector('#bottom-records');
const records = document.querySelector('#records');
const signout = document.querySelector('#sign-out');
const userImage = document.querySelector('#userImage');
const uname = document.querySelector('#h1');
const helloName = document.querySelector('#welcome');
const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();


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
    displayItems();
    // updatedb();
    //displayName.split(' ')[0]
  }
});

 
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
 
    


    //Updating Firestore DB
    const db = firebase.firestore();
    const uid = auth.currentUser.uid;
    const name = auth.currentUser.displayName.split(' ')[0];
    db.collection('users').doc(`${name},${uid}`).collection('ExpenseArray')
    .add({
      amountSpent: exp1,
      item: inputTitle.value ,
      uid: uid,
      timestamp: timestamp,
    });

    // Setting values in the object
    expenseItem.amount = exp1;
    expenseItem.title = inputTitle.value;
    expenseItem.cat =  checkButton();
    expenseItem.icon = checkIcon();
      
    //generating lists

    

    

    // Joining & Displaying items on the html
    // const joinedallExpenses = allExpensesHTML.join(' ');
    // records.innerHTML = generateList(); 
    // console.log(generateList());
    
}

//Updatig total expenses
function updateTotalExpenses(expense, del) {
    const db = firebase.firestore();
    const uid = auth.currentUser.uid;
    const name = auth.currentUser.displayName.split(' ')[0];
    if (del) {
        db.collection('users').doc(`${name},${uid}`).collection('totalexpense').doc('totals')
        .set({
          totalExpenses: totalExpenses - expense,
        });
    } else {
        db.collection('users').doc(`${name},${uid}`).collection('totalexpense').doc('totals')
        .set({
          totalExpenses: totalExpenses + expense,
        });
    }
  
    db.collection('users').doc(`${name},${uid}`).collection('totalexpense').doc('totals')
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

    db.collection('users').doc(`${name},${uid}`).collection('totalexpense').doc('totals')
    .get()
    .then((doc) => {
      if (doc.exists) {
        totalExpenses = doc.data().totalExpenses;
        // re rendering the respective element again
        disExpense.textContent = (Math.round(totalExpenses * 100) / 100).toFixed(2);
    }})
}

//Displaying list items
function displayItems() {
    const db = firebase.firestore();
    const uid = auth.currentUser.uid;
    const name = auth.currentUser.displayName.split(' ')[0];
    db.collection('users').doc(`${name},${uid}`).collection('ExpenseArray')
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
        generateList();
      });
    //generateTotalExpenses();
  }

// Generating lists 
const generateList = snap_doc => 
{
    const db = firebase.firestore();
    const uid = auth.currentUser.uid;
    const name = auth.currentUser.displayName.split(' ')[0];
    db.collection('users').doc(`${name},${uid}`).collection('ExpenseArray')
      .orderBy("timestamp", "desc").onSnapshot((doc) => {
        const tr =  
        `<div id='bottom-records'>
        <div id='icon-box'>
            ${checkIcon()}
        </div>
        <div id='item-text1'>
            <h1 id='item-h1'> ${snap_doc.data().item} &nbsp</h1>
            <p>${checkButton()}</p>
        </div>
        <div id='item-text2'>
            <h1 id='item-price'>~ &#x20b9; ${snap_doc.data().amountSpent}</h1>
            <p> 21 May 2021</p>
        </div>
        <div id='item-delete'>
            <i class="fas fa-times"></i>
        </div>
        </div>
        </div>`;
     records.insertAdjacentHTML('beforeend', tr);
    });
        
      
}

// Joining & Displaying items on the html
// ${snap_doc.data().item}
// ${snap_doc.data().amountSpent}
    // const joinedallExpenses = generateList.join(' ');
    // records.innerHTML = joinedallExpenses; 

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






/* <div id='scroll'>
<div id='bottom-records'>
<div id='icon-box'>
    <i class="fas fa-pizza-slice"></i>
</div>
<div id='item-text1'>
    <h1 id='item-h1'>Breakfast &nbsp</h1>
    <p>Food & Beverage</p>
</div>
<div id='item-text2'>
    <h1 id='item-price'>~ &#x20b9;400</h1>
    <p> 21 May 2021</p>
</div>
<div id='item-delete'>
    <i class="fas fa-times"></i>
</div>
</div>
<div id='bottom-records'>
<div id='icon-box'>
    <i class="fas fa-pizza-slice"></i>
</div>
<div id='item-text1'>
    <h1 id='item-h1'>Breakfast &nbsp</h1>
    <p>Food & Beverage</p>
</div>
<div id='item-text2'>
    <h1 id='item-price'>~ &#x20b9;400</h1>
    <p> 21 May 2021</p>
</div>
<div id='item-delete'>
    <i class="fas fa-times"></i>
</div>
</div>
<div id='bottom-records'>
<div id='icon-box'>
    <i class="fas fa-car"></i>
</div>
<div id='item-text1'>
    <h1 id='item-h1'>Office Uber</h1>
    <p>Travel/Commute</p>
</div>
<div id='item-text2'>
    <h1 id='item-price'>~ &#x20b9;400</h1>
    <p> 21 May 2021</p>
</div>
<div id='item-delete'>
    <i class="fas fa-times"></i>
</div>
</div>
<div id='bottom-records'>
<div id='icon-box'>
    <i class="fas fa-shopping-bag"></i>
</div>
<div id='item-text1'>
    <h1 id='item-h1'>Jeans</h1>
    <p>Shopping</p>
</div>
<div id='item-text2'>
    <h1 id='item-price'>~ &#x20b9;400</h1>
    <p> 21 May 2021</p>
</div>
<div id='item-delete'>
    <i class="fas fa-times"></i>
</div>
</div>
</div> 




if( cat == 'Food/Beverage')
    {
     return`
        <div id='bottom-records'>
    <div id='icon-box'>
        <i class="fas fa-pizza-slice"></i>
    </div>
    <div id='item-text1'>
        <h1 id='item-h1'>${title} &nbsp</h1>
        <p>Food/Beverage</p>
    </div>
    <div id='item-text2'>
        <h1 id='item-price'>~ &#x20b9; ${amount}</h1>
        <p> 21 May 2021</p>
    </div>
    <div id='item-delete'>
        <i class="fas fa-times"></i>
    </div>
    </div>
    </div>`
    }

    else if ( cat == 'Travel/Commute')
    {
         return`
        <div id='bottom-records'>
    <div id='icon-box'>
    <i class="fas fa-car"></i>
    </div>
    <div id='item-text1'>
        <h1 id='item-h1'>${title} &nbsp</h1>
        <p>Travel/Commute</p>
    </div>
    <div id='item-text2'>
        <h1 id='item-price'>~ &#x20b9; ${amount}</h1>
        <p> 21 May 2021</p>
    </div>
    <div id='item-delete'>
        <i class="fas fa-times"></i>
    </div>
    </div>
    </div>`
    }

    else {
        return `
        <div id='bottom-records'>
    <div id='icon-box'>
    <i class="fas fa-shopping-bag"></i>
    </div>
    <div id='item-text1'>
        <h1 id='item-h1'>${title} &nbsp</h1>
        <p>Shopping</p>
    </div>
    <div id='item-text2'>
        <h1 id='item-price'>~ &#x20b9; ${amount}</h1>
        <p> 21 May 2021</p>
    </div>
    <div id='item-delete'>
        <i class="fas fa-times"></i>
    </div>
    </div>
    </div>`
    }
    */


