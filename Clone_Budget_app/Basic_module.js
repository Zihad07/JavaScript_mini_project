
var budgetController = (function(){

    console.log('calling BudgetController.')
    var x = 23;

    var add = function(a){ return x + a};

    return {
            publicTest:function(b){
                // console.log(add(b));
                return add(b);
            }
        }
    }
    )();

    var UIController = (function(){
        console.log('calling UIController.')
        // Some code
    })();



    var controller = (function(budgetCtrl, UICtrl){
        console.log('calling Controller.')
        var z = budgetCtrl.publicTest(2);

        return {
            anotherPublic: function(){
                console.log(z);
            }
        }
    })(budgetController,UIController);