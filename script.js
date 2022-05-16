const articles_container = document.getElementsByClassName("articles-container");

let titleForm = document.getElementById("title");
let tagForm = document.getElementById("tag");
let authorForm = document.getElementById("author");
let dateForm = document.getElementById("date");
let imgForm = document.getElementById("image");
let textForm = document.getElementById("textArea");

function getArticlesFromServer() {
    fetch('http://localhost:3000/articles')
        .then(function (response) {
            response.json().then(function (articles) {
                renderArticles(articles);
            });
        });
};

function closeModal() {
    location.href = "modal.html";
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

function removeEventListener() {
    saveButton.replaceWith(saveButton.cloneNode(true));
}

function openAddModal() {
    removeEventListener();

    saveButton.addEventListener("click", function () {
        addArticleToServer();
    });
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
addButton.addEventListener("click", function() {
    location.href = "modal.html";
});

openAddModal();
