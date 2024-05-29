// --- Fenêtre modales

function createModals(){
    let id_dialogs = 1;
    Array.from(document.getElementsByClassName("plateforme"))
        .forEach(function(element) {
            // Obtenir le titre, image, et le texte
            let title = element.getElementsByClassName("titre-plateforme")[0];
            let image = element.getElementsByClassName("plateforme-image")[0];
            let text = element.getElementsByClassName("plateforme-desc")[0].innerText;
            let sliced_text;
            if (text.lenght < 150) {
                sliced_text = text;
            }
            else {
                sliced_text = text.slice(0, 147) + "...";
            }
            
            // Créer la fenêtre modale
            let dialog_window = document.createElement("dialog");
            dialog_window.innerHTML = `
<div class="align-line">
    <h3>${title.innerText}</h3>
    <form method="dialog">
        <button>X</button>
    </form>
</div>
<img src=${image.src} alt=${image.alt}>
<p>${sliced_text}`;
            dialog_window.id = "modale-" + id_dialogs;
            element.appendChild(dialog_window);

            title.addEventListener("click", () => {dialog_window.showModal();});

            id_dialogs += 1;
        });
}

function main(){
    createModals();
}
main();