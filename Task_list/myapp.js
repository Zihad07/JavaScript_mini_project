
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
    //  Add task event
    form.addEventListener('submit',addTask);

    // Add remove task event
    taskList.addEventListener('click',removeTask);

    // Add clear task event
    clearBtn.addEventListener('click',clearTasks);

    // Add filter task event
    filter.addEventListener('keyup',filterTask);

}

// Add task
function addTask(e){

    if(taskInput.value === ''){
        alert("Add a task");

    }

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
    console.log(li); 
    taskList.appendChild(li);

    // Clear input
    taskInput.value = '';




    e.preventDefault();
}

// Remove task

function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        // Removo task
        if(confirm("Are you sure ?")){
            e.target.parentElement.parentElement.remove();
        }
    }
    // console.log(e.target.parentElement.classList.contains('delete-item'));
}

// Clear tasks

function clearTasks(e) {
    // taskList.innerHTML = '';

    // fastser way

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

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