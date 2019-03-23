
// Create Book Class

class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Create UI class

class UI {
    addBookList(book){
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

    clearField(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(msg, className){
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

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
}

// Local Storage Class

class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books;

    }

    //  When page reload
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI();
            
            ui.addBookList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        // push the letest books
        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(book_isbn){
        const books = Store.getBooks();

        books.forEach(function(book,index){
            if(book.isbn === book_isbn){
                books.splice(index,1)
            }
        });

        // after remove data form local storage
        // stor exit data in local storage
        localStorage.setItem('books',JSON.stringify(books));

    }
}



// DOM Load Event

document.addEventListener('DOMContentLoaded', Store.displayBooks)

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

        // Add to Local Storage
        Store.addBook(book);

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

    // it send the  book-isbn number
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    ui.showAlert('Book Removed', 'success');
});












