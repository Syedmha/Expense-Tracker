// Getting the elements from HTML
const disExpense = document.querySelector('#total-exp');
const inputAmount = document.querySelector('#amount');
const inputTitle = document.querySelector('#place');
let selectedCat =  document.querySelector( 'input[name="cat"]:checked'); 
const form = document.querySelector('#form');

// Converting string elemets to float
let totalExpenses = 0;


function logSubmit(e)
{
    e.preventDefault();
    let txtAmount = inputAmount.value;
    const expense = parseFloat(txtAmount);
    totalExpenses = totalExpenses + expense;
    disExpense.textContent = (Math.round(totalExpenses * 100) / 100).toFixed(2); ;
    
}


form.addEventListener('submit', logSubmit);