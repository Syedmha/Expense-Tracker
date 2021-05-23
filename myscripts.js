let exp = document.getElementById('total-exp');
let expin = parseInt(exp);

if ( expin > 10) {
    document.getElementById("quote").innerHTML = "Your Expenses are greater than 10,000/-";
    console.log('quote');
}