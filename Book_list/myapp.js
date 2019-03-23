
// Book Constructor

function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor

function UI(){}

UI.prototype.addBookList = function(book){
    // console.log(book);

    const list = document.getElementById('book-list');

    // create tr element
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class = "delete">X</a></td>
    `;

    // insert the book list in the table
    list.appendChild(row)

}

UI.prototype.clearField = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Show alert

UI.prototype.showAlert = function(msg, className){
    
    // Create Div
    const div = document.createElement('div');
    // Add class
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(msg));

    // Get Parent
    const container = document.querySelector('.container');

    // Get form
    const form = document.querySelector('#book-form');

    container.insertBefore(div,form);

    // TIME out after 3.5sec
    window.setTimeout(function(){
        document.querySelector('.alert').remove();
    },3500);
}

// UI Book removed prototype
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// EVENT LISTENERS

document.getElementById('book-form').addEventListener('submit',function(e){

    // Get values from FORM
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;
        
    
    //  console.log(title,author,isbn);
    // Intantiate book
    const book = new Book(title,author,isbn);

    // Instant UI
    const ui = new UI();

    // Validate
    if(title==='' || author==='' || isbn===''){
        // Erro alert
        ui.showAlert('Please fill in all fields', 'error');
    }else{
        
        // Add book list
        ui.addBookList(book);

        // Succres alert
        ui.showAlert('Book added', 'success');
        // Clear UI field
        ui.clearField();

    }
     e.preventDefault();

    
});

// EVENT Listener for Delete

document.getElementById('book-list').addEventListener('click',function(e){
    // Instant UI
    const ui = new UI();

    ui.deleteBook(e.target);

    ui.showAlert('Book Removed', 'success');
});