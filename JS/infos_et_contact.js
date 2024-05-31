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
    let timeLeft = 3;
    
}
function timerUpdate(time){
    let sec = time % 60;
    let result = `${sec.toString().padStart(2, "0")}`;
    return result
}
function formGame(){

}
function main(){
    buttonDisabler();
}
main();