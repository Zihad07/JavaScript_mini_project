function getHistory(){
    return document.querySelector(".history-value").innerText;
}

// alert(getHistory());

function printHistory(num){
    document.querySelector(".history-value").innerText = num;
}

function getOutput(){
    return document.querySelector(".output-value").innerText;
}

function printOutput(num){

    if(num === ""){
        document.querySelector('.output-value').innerText = "";
    }else{
        document.querySelector('.output-value').innerText = getFormattedNUmber(num);
    }
       
}

function getFormattedNUmber(num){
    if(num === "-") { return "";}
    var myNumber = Number(num).toLocaleString('en');
    return myNumber;
}

// printOutput("1325374849");

function reverseNumberFormat(num){
    return Number(num.replace(/,/g, ''));
}

// console.log(reverseNumberFormat(getOutput()));


var operator = document.querySelectorAll('.operator');

for(var index=0; index<operator.length; index++){
    operator[index].addEventListener('click',function(){
        // console.log("The operator clicked : " + this.id);

        if(this.id === "clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id === "backspace"){
            var myoutput = reverseNumberFormat(getOutput()).toString();

            if(myoutput){
                myoutput = myoutput.substr(0, myoutput.length-1);
                printOutput(myoutput);
            }
        }else{
            var myoutput = getOutput();
            var myhistory = getHistory();

            if(myoutput === "" && myhistory!==""){
                if(isNaN(myhistory[myhistory.length-1])){
                    myhistory = myhistory.substr(0,myhistory.length-1)
                }
            }

            if(myhistory !=="" || myoutput!==""){
                myoutput = myoutput===""? myoutput : reverseNumberFormat(myoutput);
                myhistory += myoutput;

                if(this.id === "="){
                    var myresult = eval(myhistory);
                    printOutput(myresult);
                    printHistory("");
                }else{
                    myhistory += this.id;
                    printHistory(myhistory);
                    printOutput("");
                }
            }
        }
    });
}



var number = document.querySelectorAll('.number');

for(var index=0; index<number.length; index++){
    number[index].addEventListener('click',function(){
        // console.log("The operator clicked : " + this.id);
        var myoutput = reverseNumberFormat(getOutput());

        if(myoutput !== NaN){
            myoutput += this.id;
            printOutput(myoutput);
        }
    });
}