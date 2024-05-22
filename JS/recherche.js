function modals1(){
    let text1 = document.getElementById("text1");
    console.log(text1);
    let title1 = text1.getElementsByTagName("h3")[0];
    console.log(title1);
    title1.addEventListener("click", () => {
        createModal1(text1);
    });
}
function createModal1(text){
    let modal = document.createElement("dialog");
    modal.id = "mod1";
    modal.innerHTML= text.getElementsByTagName("h3").innerHTML;
    console.log(modal);
    for(let image of document.images){
        if(image.src == "living-lab.png"){
            modal.innerText+=image;
            console.log(image);
            console.log(modal);
        }
    }
    let uncutText= text.getElementsByTagName("p")[0].innerText;
    let cutText = uncutText.slice(150);
    modal.value += `<p>${cutText}</p>`;
    console.log(cutText);
    console.log(modal);
    document.getElementById("mod1").showModal();
}
function main(){
    modals1();
}
main();