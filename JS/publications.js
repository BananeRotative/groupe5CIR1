// publication est un noeud HTML de classe "publication"
function authorsContains(publication, authorName) {
    let authors = Array.from(publication.getElementsByClassName("publ-authors"));
    if (authors.length == 0) {
        return false;
    }
    authors = authors[0].innerText;   // Keep only first list of authors
    return authors.includes(authorName);
}

// publication est un noeud HTML de classe "publication"
function titleContains(publication, title) {
    let titles = Array.from(publication.getElementsByClassName("publ-title"));
    if (titles.length == 0) {
        return false;
    }
    titles = titles[0].innerText;   // Keep only first list of authors
    return titles.includes(title);
}

// publication est un noeud HTML de classe "publication"
function sameYear(publication, year) {
    let years = Array.from(publication.getElementsByClassName("publ-year"));
    if (years.length == 0) {
        return false;
    }
    years = years[0].innerText;   // Keep only first list of authors
    return years.includes(year);
}

// publication est un noeud HTML de classe "publication"
function sameType(publication, type) {
    switch (type) {
        case "toutes":
            return true;
        
        case "article-revue":
            return publication.classList.contains("article-revue");

        case "comm":
            return publication.classList.contains("comm-congres");

        default: 
            return true;
    }
}

// Callback appelé au moment de cliquer sur le bouton de validation du formulaire
function filter() {
    // Récupérer les champs du formulaire
    let form = document.forms[0];
    let author = form.publFormAuthor.value;
    let title = form.publFormTitle.value;
    let year = form.publFormYear.value.slice(0, 4);
    let type = form.publFormType.value;

    // Activer/désactiver les publications
    Array.from(document.getElementsByClassName("publication"))
        .forEach(function (publication) {
            if (authorsContains(publication, author)
                 && titleContains(publication, title)
                 && sameYear(publication, year)
                 && sameType(publication, type))
            {
                // Activer
                publication.style.display = "";
            }
            else {
                // Désactiver
                publication.style.display = "none";
            }
        });

    return false;   // Utile pour éviter de recharger la page
}

// Créer un formulaire pour le filtre
function createForm() {
    let content = document.getElementById("content");
    let formHTML = `
<form onSubmit="return filter()" id="publ-form">
    <input type="text" name="publFormAuthor">
    <input type="text" name="publFormTitle">
    <input type="date" name="publFormYear">
    <ul style="list-style-type: none;">
        <li><input type="radio" name="publFormType" value="toutes">Toutes</li>
        <li><input type="radio" name="publFormType" value="article-revue">Articles de revue</li>
        <li><input type="radio" name="publFormType" value="comm">Communications</li>
    </ul>
    <button>Valider</button>
</form>`;

    content.insertAdjacentHTML("afterbegin", formHTML);
}


function main(){
    createForm();
};

// TODO (commentaire à supprimer après)
// 4 champs texte/date/bouton radio  (formulaire)
// Sur l'appui d'un bouton valider, on filtre
// Pour filtrer, on active/désactive les publication (en utilisant les classes pour savoir si il faut filtrer ou non)

main();