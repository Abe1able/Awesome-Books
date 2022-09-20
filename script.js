const books = document.querySelector ('.books');
const title = document.querySelector ('#title');
const author = document.querySelector ('#author');
const form = document.querySelector ('form');

const bookObj = {
  title: '',
  author: '',
};


const handleTitle = e => {
  bookObj.title = e.target.value;
};

const handleAuthor = e => {
  bookObj.author = e.target.value;
};

const handleDelete = e => {
  const parentEle = e.target.parentElement;
  parentEle.remove ();
};

title.addEventListener ('change', handleTitle);
author.addEventListener ('change', handleAuthor);

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    const { code, name } = e;
    return (
      e instanceof DOMException
        && (code === 22
          || code === 1014
          || name === 'QuotaExceededError'
          || name === 'NS_ERROR_DOM_QUOTA_REACHED')
        && storage.length !== 0
    );
  }
}

const storageChecker = storageAvailable('localStorage');


form.addEventListener ('submit', e => {
  if (bookObj.title && bookObj.author) {
    const bookItem = document.createElement ('div');
    bookItem.className = 'book-item';
    const title = document.createElement ('p');
    title.innerText = bookObj.title;
    const author = document.createElement ('p');
    author.innerText = bookObj.author;
    const button = document.createElement ('button');
    button.type = 'submit';
    button.className = 'delete-btn';
    button.id = Math.floor (Math.random () * 100000);
    button.innerText = 'Delete';
    button.addEventListener ('click', handleDelete);
    bookItem.appendChild (title);
    bookItem.appendChild (author);
    bookItem.appendChild (button);
    books.appendChild (bookItem);
    
    if(storageChecker){
      localStorage.setItem('allBooks', JSON.stringify(bookObj));



}

    form.reset ();
  }
  e.preventDefault ();
});
