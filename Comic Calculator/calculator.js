//Calculate The Tip

var billInput
var billTotal;
var serviceTip;
var tips;
var people;
var tipsPerPerson = 0.00;
var totalEach;

// Generate random name from character names of Star Wars
var name;
var randomNum = Math.floor(Math.random() * 87) + 1;
$.getJSON('https://swapi.co/api/people/' + randomNum, function (resultData) {
    name = resultData.name;
    console.log(name);
    console.log('randomnumb:' + randomNum);
});


$('#calculate').click(function (e) {

    billInput = parseFloat($('#totalBill').val());
    serviceTip = parseFloat($('#service').val());
    peopleInput = parseFloat($('#peopleCount').val());
    console.log(serviceTip);

    if ((!isNaN(billInput)) && (!isNaN(serviceTip))) {

        tips = tipCalculator();
        billTotal = totalBillwTip();
        tipsPerPerson = totalBillEach(peopleInput);
        totalEach = totalAmountEach(peopleInput);

        // console.log('Tips:' + tips);
        // console.log('total Bill: ' + billTotal);
        // console.log('Tips per person:' + tipsPerPerson);
        // console.log('Total amount each person: ' + totalEach);

        // greet waiter
        greetWaiter(name);

        // Text for Tip per person
        var newTipPerPerson = $('<p></p>').attr('id', 'tipPerPerson');
        $('#tipAndTotal').append(newTipPerPerson);
        $('#tipPerPerson').text('The Total Tip Per Person is $' + tipsPerPerson.toFixed(2));

        // Text for total amount per persons
        var newTotalAmountEach = $('<p></p>').attr('id', 'totalPerPerson');
        $('#tipAndTotal').append(newTotalAmountEach);
        $('#totalPerPerson').text('The Total Amount Per Person is $' + totalEach.toFixed(2));

        
    }else{
        alert('Please fill out all the fields');
    }

});

/**
 * calculate tips of total bill
 */
function tipCalculator() {
    return billInput * serviceTip;
}

/**
 * calculate the total bill with tip
 */
function totalBillwTip() {

    return billInput + tips;
}

/**
 * calculater the total bill for each person
 * @param {number} numPeople 
 */
function totalBillEach(numPeople) {

    if (numPeople === 0 || numPeople < 0) {
        numPeople = 1;
    }
    return ((billInput / numPeople) * serviceTip);
}

/**
 * calculate the num
 * @param {number} numPeople 
 */
function totalAmountEach(numPeople) {
    if (numPeople === 0 || numPeople < 0) {
        numPeople = 1;
    }
    return ((billInput / numPeople) + tipsPerPerson);
}

/**
 * great the waiter
 * @param {string} waiterName 
 */
function greetWaiter(waiterName) {
    alert('Your waiter, ' + waiterName + ' thanks you.');
}