const root = document.documentElement;
const libraryContainer = document.querySelector('#library-container');
const bookDeleteBtn = document.querySelector('.book-delete-btn');
const addBookModal = document.querySelector("#modal-container");
const addBookBtn = document.querySelector("#add-book-btn");
const closeBookModal = document.querySelector("#close-modal-btn");
const modalCancelBtn = document.querySelector("#modal-cancel-btn");
const bookSubmitForm = document.querySelector("#add-book-form");

const myLibrary = [
  {
    title: "Prelude to Foundation",
    author: "Isaac Asimov",
    year: 1988,
    numberOfPages: 403,
    haveRead: true,
    cover: "Assets/book-covers/Prelude_to_Foundation_cover.jpg",
  },
  {
    title: "2666",
    author: "Roberto Bolaño",
    year: 2004,
    numberOfPages: 1100,
    haveRead: true,
    cover: "Assets/book-covers/2666.jpg",
  },
  {
    title: "Blindness",
    author: 'Jose Saramago',
    year: 1995,
    numberOfPages: 288,
    haveRead: true,
    cover: "Assets/book-covers/Blindness.jpg",
  },
  {
    title: "Cathedral",
    author: "Raymond Carver",
    year: 1983,
    numberOfPages: 228,
    haveRead: true,
    cover: "Assets/book-covers/cathedral.jpg"
  },
  {
    title: "The Doors Of Perception",
    author: "Adolf Huxley",
    year: 1954,
    numberOfPages: 63,
    haveRead: true,
    cover: "Assets/book-covers/doorofperception.png"
  },
  {
    title: "Fight Club",
    author: "Chuck Palahniuk",
    year: 1996,
    numberOfPages: 208,
    haveRead: true,
    cover: "Assets/book-covers/fight-club.jpg"
  },
  {
    title: "On The Road",
    author: "Jack Keruac",
    year: 1957,
    numberOfPages: 320,
    haveRead: true,
    cover: "Assets/book-covers/on-the-road.jpg"
  },
  {
    title: "Shambhala: The Sacred Path of the Warrior",
    author: "Chögyam Trungpa",
    year: 1984,
    numberOfPages: 227,
    haveRead: true,
    cover: "Assets/book-covers/Shambala.jpg"
  },
  {
    title: "Siddhartha",
    author: "Hermann Hesse",
    year: 1922,
    numberOfPages: 152,
    haveRead: true,
    cover: "Assets/book-covers/Siddhartha.jpg"
  },
  {
    title: "Slaughterhouse-Five",
    author: "Kurt Vonnegut",
    year: 1969,
    numberOfPages: 190,
    haveRead: true,
    cover: "Assets/book-covers/slaughter-house-five.jpg"
  },
  {
    title: "One Flew Over the Cuckoo's Nest",
    author: "Ken Kesey",
    year: 1962,
    numberOfPages: 320,
    haveRead: true,
    cover: "Assets/book-covers/Someone-flew.jpeg"
  },
  {
    title: "The Art Of War",
    author: "Sun Tzu",
    year: -500,
    numberOfPages: 170,
    haveRead: true,
    cover: "Assets/book-covers/The-Art-of-War.jpg"
  },
  {
    title: "The New York Trilogy",
    author: "Paul Auster",
    year: 1987,
    numberOfPages: 478,
    haveRead: true,
    cover: "Assets/book-covers/the-new-york-trilogy-books-photo.jpg"
  },
  {
    title: "The Electric Kool-Aid Acid Test",
    author: "Tom Wolf",
    year: 1968,
    numberOfPages: 416,
    haveRead: true,
    cover: "Assets/book-covers/acid-test.jpg"
  },
  {
    title: "No Exit",
    author: "Jean-Paul Sartre",
    year: 1944,
    numberOfPages: 66,
    haveRead: true,
    cover: "Assets/book-covers/no-exit.jpg"
  },
  {
    title: "Lord Of The Flies",
    author: "William Golding",
    year: 1954,
    numberOfPages: 224,
    haveRead: true,
    cover: "Assets/book-covers/Lord-of-Flies.jpg"
  }
];

refreshLibrary();

addBookBtn.addEventListener('click', () => {
  addBookModal.showModal();
});

closeBookModal.addEventListener('click', () => {
  addBookModal.close()
});

modalCancelBtn.addEventListener("click", () => {
  addBookModal.close();
});

bookSubmitForm.addEventListener('submit', (e) => {
  if (!bookSubmitForm.checkValidity()) {
    e.preventDefault();
    alert("Missing Fields");
  }
  addBookToLibrary();
});

function Book(title, author, year, category, numberOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.category = category;
  this.numberOfPages = numberOfPages;
  this.haveRead = (haveRead === 'Yes') ? true : false;
  console.log("Book created: " + this.displayInfo());
};
Book.prototype.displayInfo = function () {
  return `${this.title}, ${this.author}, ${this.year}, ${this.category}, ${this.numberOfPages}, ${this.haveRead}`;
};

function addBookToLibrary() {
  const titleInput = document.querySelector('[name="book-title"]').value;
  const authorInput = document.querySelector('[name="book-author"]').value;
  const yearInput = document.querySelector('[name="book-year"]').value;
  const categoryInput = document.querySelector('[name="book-category"]').value;
  const numberOfPages = document.querySelector('[name="number-of-pages"]').value;
  const haveRead = document.querySelector('[name="have-read"]:checked')?.value;
  console.log("Book Data: " + titleInput, authorInput, yearInput, categoryInput, numberOfPages, haveRead);
  const book = new Book(titleInput, authorInput, yearInput, categoryInput, numberOfPages, haveRead);
  myLibrary.push(book);
  refreshLibrary();
};

function refreshLibrary() {
  let i = 0;
  while (libraryContainer.firstChild) {
    libraryContainer.removeChild(libraryContainer.firstChild);
    i++;
    console.log(`${i} Element removed`);
  };
  i = 0;
  myLibrary.forEach(bookObject => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.index = myLibrary.indexOf(bookObject);
    const bookCover = document.createElement('img');
    bookCover.src = bookObject.cover;
    bookCover.alt = `${bookObject.title} cover`;
    bookCover.classList.add('book-cover-img');
    bookCover.height = 320;
    bookCover.width = 220;
    bookCard.appendChild(bookCover);

    const bookToolbar = document.createElement('div');
    bookToolbar.classList.add('book-toolbar');
    const readStatusLabel = document.createElement('label');
    const readStatusCheckboxSpan = document.createElement('span');
    readStatusCheckboxSpan.classList.add('material-symbols-outlined');
    readStatusCheckboxSpan.classList.add('read-status-checkbox-span');
    readStatusCheckboxSpan.textContent = 'check_box_outline_blank';
    readStatusLabel.appendChild(readStatusCheckboxSpan);
    const checkboxSpanTextContent = document.createElement('span');
    checkboxSpanTextContent.classList.add('checkbox-span-text-content');
    checkboxSpanTextContent.classList.add('hide');
    checkboxSpanTextContent.textContent = "Have Read";
    readStatusLabel.appendChild(checkboxSpanTextContent);

    const readStatusCheckbox = document.createElement('input');
    readStatusCheckbox.type = 'checkbox'
    readStatusCheckbox.name = 'read-status';
    readStatusCheckbox.classList.add('read-status-checkbox');

    readStatusCheckbox.addEventListener('click', (event) => {
      const bookCardContainer = event.target.closest('.book-card');
      if (readStatusCheckbox.checked) {
        readStatusCheckboxSpan.textContent = 'check_box';
        readStatusCheckboxSpan.classList.add('yes');
        myLibrary[bookCardContainer.dataset.index].haveRead = !true;
        console.log(`Book: ${bookObject.title} has been read? ${bookObject.haveRead}`);
      } else {
        readStatusCheckboxSpan.textContent = 'check_box_outline_blank';
        readStatusCheckboxSpan.classList.remove('yes');
        myLibrary[bookCardContainer.dataset.index].haveRead = !false;
        console.log(`Book: ${bookObject.title} has been read? ${bookObject.haveRead}`);
      };
    });

    if (bookObject.haveRead) {
      readStatusCheckboxSpan.classList.add("yes");
      readStatusCheckbox.checked = true;
      console.log(bookObject.title + " set to true.")
      readStatusCheckboxSpan.textContent = 'check_box';
    }
    readStatusLabel.appendChild(readStatusCheckbox);
    bookToolbar.appendChild(readStatusLabel);

    const bookDeleteBtn = document.createElement('button');
    bookDeleteBtn.classList.add('book-delete-btn');
    bookDeleteBtn.classList.add('material-symbols-outlined-btn');
    bookDeleteBtn.title = 'DELETE BOOK';
    const deleteBtnSpan = document.createElement('span');
    deleteBtnSpan.classList.add('book-delete-btn-span');
    deleteBtnSpan.classList.add('material-symbols-outlined');
    deleteBtnSpan.textContent = 'delete';
    deleteBtnSpan.addEventListener('click', () => {
      deleteModal.showModal();
    });
    bookDeleteBtn.appendChild(deleteBtnSpan);
    bookToolbar.appendChild(bookDeleteBtn);
    bookCard.appendChild(bookToolbar);

    const bookInfoContainer = document.createElement('div');
    bookInfoContainer.classList.add('book-info-container');
    bookCard.appendChild(bookInfoContainer);

    const bookTitle = document.createElement('h3');
    bookTitle.textContent = bookObject.title;
    bookTitle.classList.add('book-title');
    bookInfoContainer.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = bookObject.author;
    bookAuthor.classList.add('book-author');
    bookInfoContainer.appendChild(bookAuthor);

    const bookYear = document.createElement('p');
    bookYear.textContent = bookObject.year;
    bookYear.classList.add('book-year');
    bookInfoContainer.appendChild(bookYear);

    const bookCategory = document.createElement('p');
    bookCategory.textContent = bookObject.category;
    bookCategory.classList.add('book-category');
    bookInfoContainer.appendChild(bookCategory);

    const deleteModal = document.createElement("dialog");
    deleteModal.classList.add("confirm-delete-modal");
    deleteModal.setAttribute("role", "dialog");

    const heading = document.createElement("h3");
    heading.textContent = "ARE YOU SURE?";
    deleteModal.appendChild(heading);

    const deleteForm = document.createElement("form");
    deleteForm.classList.add("confirm-delete-modal-form");
    deleteForm.setAttribute("method", "dialog");
    deleteForm.addEventListener('submit', (event) => {
      const bookCardContainer = event.target.closest('.book-card');
      if(bookCard) {
        myLibrary.splice(bookCardContainer.dataset.index, 1);
        console.log(`${bookCardContainer.dataset.index} - Book Title: ${bookObject.title} removed`);
        refreshLibrary();
      };
    });
    deleteForm.addEventListener('reset', () => {
      deleteModal.close();
    });

    const noButton = document.createElement("button");
    noButton.type = "reset";
    noButton.classList.add("modal-button");
    noButton.textContent = "NO";

    const yesButton = document.createElement("button");
    yesButton.type = "submit";
    yesButton.classList.add("modal-button");
    yesButton.textContent = "YES";

    deleteForm.appendChild(noButton);
    deleteForm.appendChild(yesButton);

    deleteModal.appendChild(deleteForm);
    bookCard.appendChild(deleteModal);

    libraryContainer.appendChild(bookCard);
  });
  console.log('Library refreshed.')
};

const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', function () {
    const query = searchBar.value.toLowerCase();
    const allBooks = document.querySelectorAll('.book-card');

    allBooks.forEach(bookCard => {
        const title = bookCard.querySelector('h3').textContent.toLowerCase();
        const author = bookCard.querySelector('p').textContent.toLowerCase();
        const year = bookCard.querySelectorAll('p')[1].textContent.toLowerCase();
        const category = bookCard.querySelectorAll('p')[2]?.textContent.toLowerCase() || '';

        if (
            title.includes(query) ||
            author.includes(query) ||
            year.includes(query) ||
            category.includes(query)
        ) {
            bookCard.style.display = '';
        } else {
            bookCard.style.display = 'none';
        }
    });
});
