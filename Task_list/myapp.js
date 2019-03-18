
// Define UI Variable

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task'); 


// Load all event listeners
loadEventListeners();

// Load all event listernrs

function loadEventListeners(){

    // DOM Load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //  Add task event
    form.addEventListener('submit',addTask);

    // Add remove task event
    taskList.addEventListener('click',removeTask);

    // Add clear task event
    clearBtn.addEventListener('click',clearTasks);

    // Add filter task event
    filter.addEventListener('keyup',filterTask);

}

// Get Task from LS

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') ===  null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
            // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));

        // Create a link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        // console.log(li); 
        taskList.appendChild(li);
        }
    );
}

// Add task
function addTask(e){



    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create a link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    // console.log(li); 
    taskList.appendChild(li);

    // Store in LS
     storeTaskInLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';




    e.preventDefault();
}

// Remove task

function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        // Removo task
        if(confirm("Are you sure ?")){
            let remove_child = e.target.parentElement.parentElement
            remove_child.remove();
            
            // Remove from LS
            removeTaskFromLocalStroage(remove_child);
        }
    }
    // console.log(e.target.parentElement.classList.contains('delete-item'));
}

// Remove from lS

function removeTaskFromLocalStroage(taskItem) {
    // console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks') === null){

        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(task === taskItem.textContent){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));


}


// Clear tasks

function clearTasks(e) {
    // taskList.innerHTML = '';

    // fastser way

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){ localStorage.clear();}

// Filter tasks

function filterTask(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block'
            }else{
                task.style.display = 'none';
            }
        }
    );
}


// For local storage 

function storeTaskInLocalStorage(task){
        let tasks;
    if(localStorage.getItem('tasks') ===  null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
    


