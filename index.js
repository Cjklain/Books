function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
    this.id = Date.now()
    this.info = function(){
        return(`${title} by ${author}, ${pages} pages, ${read}`);
    }
}
let myLibrary = [];

function addBookToLibrary(e){
    e.preventDefault();
    const title = form.title.value
    const author = form.author.value
    const pages = form.pages.value
    const read = form.read.checked
    if(title===''|| author===''||pages===''){
        return;
    }
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    console.log(this)
    form.reset();
    showBooks()
}

function showBooks(){
    const html = myLibrary.map( book => `
    <div class="book">
    <p>${book.title}</p>
    <p>${book.author}</p>
    <p>${book.pages} pages</p>
    <label>Readed</label>
    <input type='checkbox' ${book.read ? 'checked' : ''}>
    <div class="wrapper">
    <label>Remove</label>
    <button data-del="delete" value="${book.id}">x</button>
    </div>
    </div>
    `
    ).join('')
    rack.innerHTML = html;
}

function deleteBook(e){
    // console.log(e.target.dataset.del);
    // console.log(e.currentTarget.dataset.del);
    console.log(e.target);
    if(e.target.dataset.del){
    const idToInt = parseInt(e.target.value);
    console.log(idToInt);
    e.target.closest('div').remove();
    myLibrary =  myLibrary.filter(book => book.id !== idToInt)
    }
}

function displayAdding(e){
    modalOuter.classList.add('open');
}

function closeAdding(e){
    const outside = !e.target.closest('.modal-inner');
    console.log(outside)
    if(outside){
        closeModal()
    }
                        

    // console.log(outside);
}

function closeModal(){
    modalOuter.classList.remove('open')
}

window.addEventListener('keyup',function(e){
    if(e.key === 'Escape'){
        closeModal()
    }
})

const theHobbit = new Book('The Hobbit', "J.R.R. Tolkien", "not read yet", 295)

const rack = document.querySelector('.rack')
const form = document.querySelector('form')
const submitButton = document.querySelector('.sbutton')
const addButton = document.querySelector('.adding')
const modalOuter = document.querySelector('.modal-outer')
const modalInner = document.querySelector('.modal-inner')


modalOuter.addEventListener('click', closeAdding)
submitButton.addEventListener('click', addBookToLibrary)
addButton.addEventListener('click', displayAdding)

rack.addEventListener('click', deleteBook)