
// Listen for submit

document.querySelector('#loan-form').addEventListener('submit',calculationResults);


// Caculation Results
function calculationResults(e){

    console.log('calulating reslt ....')
    
    // UI variable
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const pricipal = parseFloat(amount.value);
    const calculateInterest = parseFloat(interest.value)/100/12;
    const calculatePayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1+calculateInterest, calculatePayments);
    const monthly = (pricipal*x*calculateInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(3);
        totalPayment.value = (monthly*calculatePayments).toFixed(3);
        totalInterest.value = ((monthly*calculatePayments) - pricipal).toFixed(3);
    }else{
        showError("please check error");

    }

    e.preventDefault();
}

// show Error message

function showError(erro_msg){
    // Create a div
    const  errorDiv = document.createElement('div');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(erro_msg));

    // Get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Insert error above heading
    card.insertBefore(errorDiv,heading);

    // Clear erro after 4 seconds

    setTimeout(function(){
        document.querySelector('.alert').remove();
    },4000)
}