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

// Callback appelé au moment de cliquer sur le bouton de validation du formulaire
function filter() {
    // Récupérer les champs du formulaire
    let author = "Salima Bourbia";   // A faire
    let title = "Multi"; // A faire
    let year = "2023";   // A faire

    // Activer/désactiver les publications
    Array.from(document.getElementsByClassName("publication"))
        .forEach(function (publication) {
            if (authorsContains(publication, author)
                 && titleContains(publication, title)
                 && sameYear(publication, year))
            {
                // Activer à faire
            }
            else {
                // Désactiver à faire
            }
        })
}


function main(){
    
};

// TODO (commentaire à supprimer après)
// 4 champs texte/date/bouton radio  (formulaire)
// Sur l'appui d'un bouton valider, on filtre
// Pour filtrer, on active/désactive les publication (en utilisant les classes pour savoir si il faut filtrer ou non)

main();