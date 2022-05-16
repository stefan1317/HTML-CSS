const articles_container = document.getElementsByClassName("articles-container");
let modalOverlay = document.getElementById("modal_overlay");

let titleForm = document.getElementById("title");
let tagForm = document.getElementById("tag");
let authorForm = document.getElementById("author");
let dateForm = document.getElementById("date");
let imgForm = document.getElementById("image");
let textForm = document.getElementById("textArea");

let saveButton = document.getElementById("saveButton");

function getArticlesFromServer() {
    fetch('http://localhost:3000/articles')
        .then(function (response) {
            response.json().then(function (articles) {
                renderArticles(articles);
            });
        });
};

function closeModal() {
    modalOverlay.className = 'modal__overlay';
}

function reset() {
    titleForm.value = '';
    tagForm.value = '';
    authorForm.value = '';
    dateForm.value = '';
    imgForm.value = '';
    textForm.value = '';
    removeEventListener();
}

function addArticleToServer() {
    fetch('http://localhost:3000/articles', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            title: titleForm.value,
            tag: titleForm.value,
            author: titleForm.value,
            date: titleForm.value,
            imgUrl: titleForm.value,
            content: textForm.value
        })
    }).then(function () {
        getArticlesFromServer();
        reset();
        closeModal();
    });
}

function createArticleDOMNode(article) {

    let title = document.createElement('h1');
    title.className = "title";
    title.textContent = article.title;

    let info = document.createElement('div');
    info.className = "title_item";
    info.textContent = article.tag;

    let author = document.createElement('div');
    author.className = "author";
    author.textContent = article.author;

    let madeBy = document.createElement('div');
    madeBy.className = "title_item_add";
    madeBy.textContent = 'Added By ';

    let date = document.createElement('div');
    date.className = "title_item";
    date.textContent = article.date;

    let div = document.createElement('div');
    div.className = "under_title";
    div.appendChild(info);
    div.appendChild(madeBy);
    div.appendChild(author);
    div.appendChild(date);

    let editButtton = document.createElement('button');
    editButtton.className = "edit_item";
    editButtton.id = "edit_item_1";
    editButtton.textContent = 'Edit';

    let deleteButton = document.createElement('button');
    deleteButton.className = "edit_item";
    deleteButton.textContent = 'Delete';

    let character = document.createElement('div');
    character.className = "edit_item";
    character.textContent = "|";

    let EDButtons = document.createElement('div');
    EDButtons.className = "edit_container";
    EDButtons.appendChild(editButtton);
    EDButtons.appendChild(character);
    EDButtons.appendChild(deleteButton);

    let img = document.createElement('img');
    img.src = article.imgUrl;

    let text = document.createElement('p');
    text.textContent = article.content;

    let divOfPs = document.createElement('div');
    divOfPs.className = "paragraph";
    divOfPs.appendChild(text);

    let articles = document.createElement('article');
    articles.appendChild(title);
    articles.appendChild(nav);
    articles.appendChild(EDButtons);
    articles.appendChild(img);
    articles.appendChild(divOfPs);

    return articles;
}

function removeEventListener() {
    saveButton.replaceWith(saveButton.cloneNode(true));
}

function openAddModal() {
    removeEventListener();

    saveButton.addEventListener("click", function () {
        addArticleToServer();
    });

    modalOverlay.className = 'modal__overlay modal_on';
}

function removeOldArticlesFromDOM() {
    while(articles_container.firstChild) {
        articles_container.removeChild(articles_container.firstChild);
    }
}

function renderArticles(articles) {
    
    removeOldArticlesFromDOM();

    for (let i = 0; i < articles.length; i++) {
        let articleDOMNode = createArticleDOMNode(articles[i]);
        main.appendChild(articleDOMNode);
    }
}

let addButton = document.getElementById("addButton");
addButton.addEventListener("click", openAddModal);

let cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", closeModal);
