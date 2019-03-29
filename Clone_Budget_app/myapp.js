
var budgetController = (function(){

    var Expense =function(id,description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    // prototype
    Expense.prototype.calcPercentage = function(totalIncome){

        if(totalIncome > 0){
            this.percentage = Math.round( (this.value / totalIncome ) * 100 );
        }else{
            this.percentage = -1;
        }
    };

    //  Return each  object expense percentage
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(current){
            sum += current.value;
            // console.log(current)
        });

        data.total[type] = sum;

    }

    var data = {
        allItems: {
            exp: [],
            inc : []
        },
        total : {
            exp : 0,
            inc : 0
        },
        budget : 0,
        percentage : -1
    }


    return {

        addItem: function(type, des, val){
            var newItem, ID;


            // Current new ID
           if(data.allItems[type].length > 0){
            ID = data.allItems[type][data.allItems[type].length -1].id + 1;
           }else{
               ID = 0;
           }
            // Create new item based on 'inc' or 'exp'

            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            // Push it into out data structure
            data.allItems[type].push(newItem);

            // Return new element
            return newItem;
        },

        deleteItem: function(type, id){
            var ids, index;

            ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);
            
            if(index > -1){
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function(){
            // Calculate total income and expense
            calculateTotal('exp');
            calculateTotal('inc');
            // Calculate the budget: income-expense
            data.budget = data.total.inc - data.total.exp;
            // calculate the percentage of income that we spent
            if(data.total.inc > 0){
                data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
            }else{
                data.percentage = -1; /// than means not existance
            }

            // console.log(data)
        },

        calculatePercentage : function() {
            data.allItems.exp.forEach(function(current){
                current.calcPercentage(data.total.inc);
            });
        },

        //  Get all percentage and store array and return
        getPercentages : function(){
            var allPercentage = data.allItems.exp.map(function(current){
                return current.percentage;
            });

            return allPercentage;
        },

        getBudget : function(){
            return {
                budget : data.budget,
                totalInc : data.total.inc,
                totalExp : data.total.exp,
                percentage : data.percentage

            }
        },

        testting: function(){
            console.log(data);
        }


        
    }
    }
    )();

    var UIController = (function(){
        // console.log('calling UIController.')

        // private object
        var DOMstrings = {
            inputType : '.add__type',
            inputDescription: '.add__description',
            intputValue : '.add__value',
            inputBtn : '.add__btn',
            incomeContainer: '.income__list',
            expensesContainer : '.expenses__list',
            budgetLabel : '.budget__value',
            incomeLabel : '.budget__income--value',
            expenseLabel : '.budget__expenses--value',
            percentageLabel:'.budget__expenses--percentage',
            container: '.container',
            expensesPercenLabel : '.item__percentage',
            dataLabel : '.budget__title--month'


        };


        var formatNumber = function(num, type){

            var numSplit, int, dec;
            /*
             + or - before number
             exactly 2 decimal points
             comma separating the thousands

             4568.456 - > + 4,568.46
             1000 - > 1000.00
            */

            num = Math.abs(num);
            num = num.toFixed(2);

            numSplit = num.split('.');
            
            int = numSplit[0];

            if(int.length > 3){
                int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3, int.length);
            }

            dec = numSplit[1];

            return (type==='exp' ? '-' : '+') + ' ' + int + '.' + dec; 

        };


        return {
            // Public
            getInput: function(){
                return{
                    type : document.querySelector(DOMstrings.inputType).value,
                    description : document.querySelector(DOMstrings.inputDescription).value,
                    value : parseFloat(document.querySelector(DOMstrings.intputValue).value) 
                }
            },

            addListItem: function(obj, type){

                var html,element,newHtml;

                // Create HTML string with placeholder text
                if(type === 'inc'){
                    element = DOMstrings.incomeContainer;
                    html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                }else if(type === 'exp'){
                    element = DOMstrings.expensesContainer;
                    html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                }
                // Replace the placeholder text wiht some actual value

                newHtml = html.replace('%id%', obj.id);
                newHtml = newHtml.replace('%description%',obj.description);
                newHtml = newHtml.replace('%value%', formatNumber(obj.value,type));
            
                // Insert the HTML into the DOM

                document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
            },

            deleteListItem: function(selectorID){
                var el = document.getElementById(selectorID);
                el.parentNode.removeChild(el);
            },
            
            clearFields: function() {
                var fields, fieldsArr;

                fields = document.querySelectorAll(DOMstrings.inputDescription + ', '+ DOMstrings.intputValue);

                fieldsArr  = Array.prototype.slice.call(fields);

                fieldsArr.forEach(function(current){
                    current.value = "";
                });

                fieldsArr[0].focus();
            },

            displayBudget: function(obj){
                var type = obj.budget > 0 ? 'inc' : 'exp';
                document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
                document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
                document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp,'exp');

                if(obj.percentage > 0){
                    document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage+'%';
                }else{
                    document.querySelector(DOMstrings.percentageLabel).textContent = '----';
                }
                

            },

            displayPercentages: function(percentage){
                var fields = document.querySelectorAll(DOMstrings.expensesPercenLabel);

                var nodeListForEach = function(list,callback){
                    for (var i =0; i<list.length; i++){
                        callback(list[i],i);
                    }
                };

                nodeListForEach(fields,function(current,index){
                    // do staff
                    if(percentage[index] > 0){
                        current.textContent = percentage[index] + '%';
                    }else {
                        current.textContent = '---';
                    }
                });
            },

            displayMonth: function() {
                var now, months, month, year;

                now = new Date();

                months = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'Auguest',
                    'September',
                    'October',
                    'November',
                    'December'

                ];

                month = now.getMonth();  // index month 

                year = now.getFullYear();

                document.querySelector(DOMstrings.dataLabel).textContent = months[month] + ' ' + year;

            },

            
            // return dom string variables
            getDOMstrings: function(){ return DOMstrings;}  


        }
        // Some code
    })();


    //  Event Controler

    var controller = (function(budgetCtrl, UICtrl){
       


        var setUpEventListeners = function(){

            // get DOM string variables
            var DOM = UICtrl.getDOMstrings();

            document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
            document.addEventListener('keypress',function(e){
                if(e.keyCode === 13){
                  ctrlAddItem();
                }
            });

            document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
        };


        var ctrlAddItem = function(){

            var input, newItem;

            // 1.Get the field input data
            input = UICtrl.getInput();
    
            if(input.description !== "" && !isNaN(input.value) && input.value!== 0){
                
                // 2.Add the item to the budget controller
                newItem = budgetCtrl.addItem(input.type, input.description, input.value);
                // 3.Add the item to the UI
                UICtrl.addListItem(newItem,input.type);
                // 4.Clear fields
                UICtrl.clearFields();

                // 5.Calculate and Update budget
                updateBudget()

                // 6. Calculate and update percentage
                updatePercentage();
               
            }


            console.log('its work')
        }

        var updateBudget = function(){
            // 1.Calculate the budjet
            budgetCtrl.calculateBudget();
            // 2. Return the budget
            var budget = budgetCtrl.getBudget();

            // 3.Display the budget on the UI
            // console.log(budget);
            UICtrl.displayBudget(budget);
        };

        var updatePercentage = function() {
            // 1. Calculate percentage
            budgetCtrl.calculatePercentage();
            // 2. Read percentage from the budget controller
            var percentage = budgetCtrl.getPercentages();

            // 3.Update the UI from the budget controller
            // console.log(percentage);
            UICtrl.displayPercentages(percentage);
        }
        var ctrlDeleteItem = function(e){
            var itemID, splitID, type,ID;

            itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
            console.log(itemID);

            // if itemID exit.
            if(itemID){ 
                splitID = itemID.split('-');
                type = splitID[0];
                ID = parseInt(splitID[1]);

                // 1. Delete the item from the data structure
                budgetCtrl.deleteItem(type,ID);
                // 2. Delete the item from the  UI
                UICtrl.deleteListItem(itemID);
                // 3. Update and show the  new budget
                updateBudget();

                // 4. Calculate and update percentage
                updatePercentage();
            }
        };


        return {
            init : function(){
                console.log('Application started');
                UICtrl.displayMonth();
                UICtrl.displayBudget({
                
                budget : 0,
                totalInc : 0,
                totalExp : 0,
                percentage : -1
                });
                setUpEventListeners();
                
            }
        }

        
    })(budgetController,UIController);


    controller.init();