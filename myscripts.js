// Getting the elements from HTML
const disExpense = document.querySelector('#total-exp');
const inputAmount = document.querySelector('#amount');
const inputTitle = document.querySelector('#place');
let selectedCat =  document.querySelector( 'input[name="cat"]:checked'); 
const form = document.querySelector('#form');
const displayList = document.querySelector('#bottom-records');

// Converting string elemets to float
let totalExpenses = 0;
const allExpenses = [];

function logSubmit(e)
{
    const expenseItem = {};

    e.preventDefault();
    let txtAmount = inputAmount.value;
    const expense = parseFloat(txtAmount);
    totalExpenses = totalExpenses + expense;
    disExpense.textContent = (Math.round(totalExpenses * 100) / 100).toFixed(2); 
    // updateList();

    expenseItem.amount = expense;
    expenseItem.title = inputTitle.value;
    console.log(expenseItem);

    allExpenses.push(expenseItem);
    //console.log(allExpenses);


    allExpensesHTML = allExpenses.map( expense => {
        return `
        <li><div id='bottom-records'>
    <div id='icon-box'>
        <i class="fas fa-pizza-slice"></i>
    </div>
    <div id='item-text1'>
        <h1 id='item-h1'>${expense.title} &nbsp</h1>
        <p>Food & Beverage</p>
    </div>
    <div id='item-text2'>
        <h1 id='item-price'>~ &#x20b9; ${expense.amount}</h1>
        <p> 21 May 2021</p>
    </div>
    <div id='item-delete'>
        <i class="fas fa-times"></i>
    </div>
    </div>
    </div>
    </li>`;

    });
    const joinedallExpenses = allExpensesHTML.join(' ');
    displayList.innerHTML = joinedallExpenses;

    
}

// function updateList() {

//     <div id='scroll'>
//         <div id='bottom-records'>
//         <div id='icon-box'>
//     <i class="fas fa-pizza-slice"></i>
//     </div>
//         <div id='item-text1'>
//     <h1 id='item-h1'>Breakfast &nbsp</h1>
//     <p>Food & Beverage</p>
//     </div>
//     </div>
//     </div>

// }

form.addEventListener('submit', logSubmit);



{/* <div id='scroll'>
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
</div> */}