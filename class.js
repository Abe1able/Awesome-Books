const form = document.querySelector ('form');

class BookObj {
  constructor (title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class Actions {
  static addBookToDom (book) {
    const books = document.querySelector ('.books');
    const bookItem = document.createElement ('div');
    bookItem.className = 'book-item';
    const title = document.createElement ('p');
    title.innerText = book.title;
    const author = document.createElement ('p');
    author.innerText = book.author;
    const button = document.createElement ('button');
    button.type = 'submit';
    button.className = 'delete-btn';
    button.id = book.id;
    button.addEventListener ('click', this.deleteBook);
    button.innerText = 'Delete';
    bookItem.appendChild (title);
    bookItem.appendChild (author);
    bookItem.appendChild (button);
    books.appendChild (bookItem);
  }

  static displaySavedBooks () {
    const allBooks = JSON.parse (localStorage.getItem ('allBooks'));
    allBooks.forEach (book => {
      this.addBookToDom (book);
    });
  }

  static deleteBook (e) {
    const parentEle = e.target.parentElement;
    parentEle.remove ();

    const {id} = e.target;
    let allBooks = JSON.parse (localStorage.getItem ('allBooks'));
    allBooks.map ((book, index) => {
      let strId = String (book.id);
      if (strId === id) {
        allBooks.splice (index, 1);
      }
    });
    localStorage.setItem ('allBooks', JSON.stringify (allBooks));
  }
}

form.addEventListener ('submit', e => {
  e.preventDefault ();

  const title = document.querySelector ('#title').value;
  const author = document.querySelector ('#author').value;
  const id = Math.floor (Math.random () * 1005000);

  const newBook = new BookObj (title, author, id);

  Actions.addBookToDom (newBook);

  let previousBooks = JSON.parse (localStorage.getItem ('allBooks')) || [];
  let allBooks = [...previousBooks, newBook];
  localStorage.setItem ('allBooks', JSON.stringify (allBooks));

  form.reset ();
});

onload = () => {
  if (localStorage.getItem ('allBooks')) {
    Actions.displaySavedBooks ();
  }
};
