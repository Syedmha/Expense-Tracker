// Getting the elements from HTML
const disExpense = document.querySelector('#total-exp');
const inputAmount = document.querySelector('#amount');
const inputTitle = document.querySelector('#place');
// let selectedCat =  document.querySelector( 'input[name="cat"]:checked'); 
const form = document.querySelector('#form');
const displayList = document.querySelector('#bottom-records');
const records = document.querySelector('#records');

// Converting string elemets to float
let totalExpenses = 0;
const allExpenses = [];

function logSubmit(e)
{
    e.preventDefault();

    const expenseItem = {};

    let txtAmount = inputAmount.value;
    const expense = parseFloat(txtAmount);
    totalExpenses = totalExpenses + expense;
    disExpense.textContent = (Math.round(totalExpenses * 100) / 100).toFixed(2); 
    const exp1 = (Math.round(expense * 100) / 100).toFixed(2); 
    // updateList();

    expenseItem.amount = exp1;
    expenseItem.title = inputTitle.value;

   expenseItem.cat =  checkButton();


    console.log(expenseItem);
    

    allExpenses.push(expenseItem);
    //console.log(allExpenses);


    allExpensesHTML = allExpenses.map(expense => {
         return  `
        <div id='bottom-records'>
    <div id='icon-box'>
        <i class="fas fa-pizza-slice"></i>
    </div>
    <div id='item-text1'>
        <h1 id='item-h1'>${expense.title} &nbsp</h1>
        <p>${expense.cat}</p>
    </div>
    <div id='item-text2'>
        <h1 id='item-price'>~ &#x20b9; ${expense.amount}</h1>
        <p> 21 May 2021</p>
    </div>
    <div id='item-delete'>
        <i class="fas fa-times"></i>
    </div>
    </div>
    </div>`;
    });

    const joinedallExpenses = allExpensesHTML.join(' ');
    records.innerHTML = joinedallExpenses;

    
}

function updateList({title, amount}) {

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
    </div>`;
    
}



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


