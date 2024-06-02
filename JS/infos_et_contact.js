function buttonDisabler(){
    let form = document.getElementById("contact-form");
    form.addEventListener("input",validContact);
    }
function validContact(event){
    let name = document.getElementById("contact-name-field").value;
    let content = document.getElementById("contact-comment").value;
    let mail = document.getElementById("contact-email-field").value;
    let isDisabled = document.getElementById("contact-submit-button").hasAttribute("disabled");
    if(!validName(name)){
        document.getElementById("invalidName").innerText = "Le Nom Est Invalide ! Il doit ressembler à ça : Nom Prénom";
    }
    else{
        document.getElementById("invalidName").innerText = "";
    }
    if(!validMail(mail)){
        document.getElementById("invalidMail").innerText = "L'Email Est Invalide ! Il doit ressembler à ça : *****@*****.**";
    }
    else{
        document.getElementById("invalidMail").innerText = "";
    }
    if(!validContent(content)){
        document.getElementById("invalidComment").innerText = "Le Commentaire Est Invalide ! Il doit y avoir au moins 20 caractères, mais pas plus de 1000.";
    }
    else{
        document.getElementById("invalidComment").innerText = "";
    }
    if(validName(name) && validContent(content) && validMail(mail) &&isDisabled==true){
        document.getElementById("contact-submit-button").removeAttribute("disabled");
    }
    else{
        if(isDisabled==false){
            if(!validName(name) || !validContent(content) || !validMail(mail)){
                document.getElementById("contact-submit-button").setAttribute("disabled","");
            }
        }
    }
}
function invalidNameMessage(){
    document.getElementById("invalidName").innerText = "Le Nom Est Invalide ! Il doit ressembler à ça : Nom Prénom";
}
function invalidMailMessage(){
    document.getElementById("invalidMail").innerText = "L'Email Est Invalide ! Il doit ressembler à ça : *****@*****.**";
}
function invalidContentMessage(){
    document.getElementById("invalidComment").innerText = "Le Commentaire Est Invalide ! Il doit y avoir au moins 20 caractères, mais pas plus de 1000.";
}
function validName(name){
    let strName = name+"";
    if(strName.length<3){
        return false;
    }
    let nbWords = 1;
    for(let e of strName){
        if(e==" "){
            nbWords++;
        }
    }
    if(nbWords==2){
        return true;
    }
    return false;
}
function validMail(mail){
    let strMail = mail+"";
    let isAt = 0;
    let isDot = 0;
    let isAtBeforeDot = false;
    for(let elem of strMail){
        if(elem=="@"){
            isAt++;
            if(isDot==0){
            }
        }
        if(elem=="."){
            isDot++;
            if(isAt==1){
                isAtBeforeDot = true;
            }
        }
    }
    if(isAt==1 && isDot==1 && isAtBeforeDot){
        return true;
    }
    return false;
}
function validContent(content){
    let strContent = content+"";
    if(strContent.length>=20 && strContent.length<=1000){
        return true;
    }
    return false;
}
function readyTimer(){
    document.getElementById("form-game").getElementsByTagName("h3")[0].innerText = "Pourras-tu faire 50 clics en 10 secondes ?";
    setInterval(readyTimerUpdate,1000);
    
}
function readyTimerUpdate(){
    if(document.getElementById("readyTimer").innerText == ""){
        document.getElementById("readyTimer").innerText = "À vos marques...";
    }
    else if(document.getElementById("readyTimer").innerText == "À vos marques..."){
        document.getElementById("readyTimer").innerText = "Prêts...";
    }
    else if(document.getElementById("readyTimer").innerText == "Prêts..."){
        document.getElementById("readyTimer").innerText = "Partez !";
        document.getElementById("clicker-button").removeAttribute("hidden");
        formGame();
    }
}
function formGame(){
    document.getElementById("gameTimer").removeAttribute("hidden");
    document.getElementById("clicker-button").removeAttribute("disabled");
    document.getElementById("clicker-button").addEventListener("click",buttonClicked50);
    setInterval(gameTimerUpdate,1000);
}
let score = 0;
function buttonClicked50(){
    score++;
}
let gameTimer = 10;
function gameTimerUpdate(){
    gameTimer--;
    document.getElementById("gameTimer").innerText = gameTimer+"";
    if(gameTimer=="0"){
        gameTimer++;
        document.getElementById("clicker-button").setAttribute("disabled","");
        if(score>=30){
            document.getElementById("contact-send-button").removeAttribute("disabled");
        }
        else{
            document.getElementById("contact-name-field").innerText = "";
            document.getElementById("contact-email-field").innerText = "";
            document.getElementById("contact-comment").innerText = "";
        }
    }
}
function gameLaunch(){
    document.getElementById("contact-submit-button").addEventListener("click",readyTimer);
}
function main(){
    buttonDisabler();
    gameLaunch();
}
main();