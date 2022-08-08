// book class : Represent book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI CLass : Handle UI Tasks
class UI {
    static displayBooks() {
        // const StoredBooks = [
        //     {
        //         title : 'Book One',
        //         author : 'Jhon Doe',
        //         isbn : '45545'
        //     },
        //     {
        //         title : 'Book Two',
        //         author : 'Jhon Doe',
        //         isbn : '3434434'
        //     },
        //     {
        //         title : 'Book Three',
        //         author : 'Jhon Doe',
        //         isbn : '3222434'
        //     }
        // ];

        // const books = StoredBooks;
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();  
        }
    }

    static showAlert( message, className ) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // Vanish in 3seconds
        setTimeout(() => document.querySelector('.alert').remove(),3000);

    }
    static clearFields() {
        document.querySelector('#title').value= '';
        document.querySelector('#author').value= '';
        document.querySelector('#isbn').value= '';
    }
}

// Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn ) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books' , JSON.stringify(books));
    }
}

// Events : Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Events: Add a Book
document.querySelector('#book-form').addEventListener('submit',(e) => {

    // Prevents actions submit
    e.preventDefault();

    // get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if(title === '' || author === '' || isbn === '' ) {
        UI.showAlert("Please Fill in all Fields", "danger");
    } 
    else   
    {
        // Initiate book
        const book = new Book(title,author,isbn);

        // Add book to ui
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);

        // Show success message
        UI.showAlert ('Book Addes', 'success');

        // Clear fields
        UI.clearFields();
    }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    // Show success message
    UI.showAlert ('Book Removed', 'success');
});

