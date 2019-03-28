
var budgetController = (function(){

    var Expense =function(id,description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc : []
        },
        total : {
            exp : 0,
            inc : 0
        }
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
            expensesContainer : '.expenses__list'


        }


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
                    html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                }else if(type === 'exp'){
                    element = DOMstrings.expensesContainer;
                    html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                }
                // Replace the placeholder text wiht some actual value

                newHtml = html.replace('%id%', obj.id);
                newHtml = newHtml.replace('%description%',obj.description);
                newHtml = newHtml.replace('%value%', obj.value);
            
                // Insert the HTML into the DOM

                document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
            },
            
            clearFields: function() {
                var fields, fieldsArr;

                fields = document.querySelectorAll(DOMstrings.inputDescription + ', '+ DOMstrings.intputValue);

                fieldsArr  = Array.prototype.slice.call(fields);

                fieldsArr.forEach(function(current){
                    current.value = "";
                });

                fieldsArr[0].focus();
            }
            ,
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
            }


            console.log('its work')
        }

        var updateBudget = function(){
            // 1.Calculate the budjet

            // 2. Return the budget

            // 3.Display the budget on the UI
        }


        return {
            init : function(){
                console.log('Application started');
                setUpEventListeners();
            }
        }

        
    })(budgetController,UIController);


    controller.init();