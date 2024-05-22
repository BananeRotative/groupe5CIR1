function buttonDisabler(){
    let name = document.getElementById("contact-name-field");
    name.addEventListener("input")
    let email = document.getElementById("contact-email-field");
    let com = document.getElementById("contact-comment");
    name.setAttribute("pattern","`[A-Z][a-z]* [A-Z][a-z]*`");
    com.setAttribute("minlength",20);
    com.setAttribute("maxlength",1000);
    }

function main(){
    buttonDisabler();
}
main();