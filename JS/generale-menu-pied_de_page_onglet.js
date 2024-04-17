// ------- CLOCK -------

function addSegments(digitId){
    // Get digit html element
    let digit = document.getElementById(digitId);

    // Add the 7 segments
    for (let i=0; i<7; i++) {
        let segment = document.createElement("div");
        segment.className = `segment off segment${i}`;
        digit.appendChild(segment);
    }
}

function updateDigit(digitId, value){

    let segmentStates = [
        [1, 1, 1, 0, 1, 1, 1],
        [0, 0, 1, 0, 0, 1, 0],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0, 1, 0],
        [1, 1, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1]
    ];

    // Get digit HTML element
    let digit = document.getElementById(digitId);

    // Check if 
    if (digit.children.length < 7) {    // Check if digit has enough segments
        console.log("digit element has too few digits");
    }

    // Update each digit
    for (let i=0; i<7; i++) {
        let segment = digit.children[i];    // Get segment number i
        if (segmentStates[value][i]) {
            segment.classList.remove("segmentOff");    // Remove off state
        }
        else {
            segment.classList.add("segmentOff");       // Set off state
        }
    }
}

function updateTime() {
    let date = new Date();
    let digitIDs = ["hours-tens", "hours-units", "minutes-tens", "minutes-units"];

    // Update hours tens
    let hours = date.getHours();
    if (hours >= 10) {
        updateDigit(digitIDs[0], (hours - hours%10)/10);
    }
    else {
        updateDigit(digitIDs[0], 0);
    }

    // Update hours units
    updateDigit(digitIDs[1], hours%10);

    // Update minutes tens
    let minutes = date.getMinutes();
    if (minutes >= 10) {
        updateDigit(digitIDs[2], (minutes - minutes%10)/10);
    }
    else {
        updateDigit(digitIDs[2], 0);
    }

    // Update minutes units
    updateDigit(digitIDs[3], minutes%10);
}

function updateTimeInit() {
    // We need to init time update differently because we want to garantee precision
    // in time update without updating every second
    updateTime();
    setInterval(updateTime, 60000);     // every minute
}

function setColonOn() {
    let colonHTML = document.getElementById("colon");
    colonHTML.classList.remove("segmentOff");  // Remove off state
}

function setColonOff() {
    let colonHTML = document.getElementById("colon");
    colonHTML.classList.add("segmentOff");     // Set off state
}

function initRoutineColonOff() {
    setColonOff();
    setInterval(setColonOff, 2000); // Set colon off every 2 seconds
}

function initRoutineColonOn() {
    setColonOn();
    setInterval(setColonOn, 2000);  // Set colon on every 2 seconds
}

function updateColonInit() {
    // Call this function to init colon animation
    initRoutineColonOn();
    setTimeout(initRoutineColonOff, 1000);  // Delay colon off animation by 1 second
}


function initClock(){
    
    let digitIDs = ["hours-tens", "hours-units", "minutes-tens", "minutes-units"];

    for (digitID of digitIDs) {
        // Add segments for the 4 digits
        addSegments(digitID);
    }

    // // Prepare for time updates
    updateTime();
    let date = new Date();
    // Wait for the next minute update to call initialization
    setTimeout(updateTimeInit, 60000 -date.getSeconds()*1000 -date.getMilliseconds());

    // Prepare for colon updates
    setTimeout(updateColonInit, 1000 -date.getMilliseconds());
}

/*
function printInputError(event){
    let inputId = event.target;
    console.error("La saisie de l'id" + inputId + "est erronée.");
}

function verif_input(inputId){
    let input = document.getElementById("inputId");
    input.addEventListener("load",printInputError);
}
*/
function main() {
    //verif_input();
    initClock();
}

main();