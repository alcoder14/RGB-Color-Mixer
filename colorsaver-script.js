// WRITES IMMEDIATE VALUE INTO PARAGRAPH ELEMENT IN COLOR BOX
const cc2 = document.getElementById("hex");
cc2.innerHTML = "RGB(10, 10, 10)";

// GET SLIDER AND NUMBER INPUT VALUES
var colorSliders = document.getElementsByClassName("color");
var colorNumbers = document.getElementsByClassName("numColors");

// WRITES IMMEDIATE VALUES INTO NUMBER INPUTS AFTER PAGE HAS FINISHED LOADING
for(var i = 0; i < colorSliders.length; i++){
        colorNumbers[i].value = colorSliders[i].value;
}

// LINKS RANGE AND SLIDER VALUES
for(var i = 0; i < colorSliders.length; i++){
    colorSliders[i].addEventListener("input", updateValue);
    colorNumbers[i].addEventListener("input", updateValue);
}
function updateValue (e) {
    var sibling = e.target.previousElementSibling || e.target.nextElementSibling;
    sibling.value = e.target.value;//55
}


// MAKE STRING OUT OF INPUT VALUES
let colorString = "RGB(10, 10, 10)";

for(var i = 0; i < colorSliders.length; i++){
    colorSliders[i].addEventListener("input", makeColorString);
    colorNumbers[i].addEventListener("input", makeColorString);
}

let intRed, intGreen, intBlue;
function makeColorString(e){
    if(e.target == colorSliders[0]){
        colorString = "RGB(" + e.target.value + ", " + colorNumbers[1].value + ", " + colorNumbers[2].value + ")";

    } else if(e.target == colorSliders[1]){
        colorString = "RGB(" + colorSliders[0].value + ", " + e.target.value + ", " +  colorNumbers[2].value + ") ";
    } else{
        colorString = "RGB(" + colorSliders[0].value + ", " + colorNumbers[1].value + ", " + e.target.value + ") ";
    }
    //console.log(colorString);

    // COLOR THE COLOR PANEL WITH STRING

    const colorContainer = document.getElementById("color-container");
    colorContainer.style.backgroundColor = colorString;
    
    intRed = parseInt(colorNumbers[0].value);
    intGreen = parseInt(colorNumbers[1].value);
    intBlue = parseInt(colorNumbers[2].value);

    if(intRed < 95 && intGreen < 95 && intBlue < 95){
        cc2.style.color = "white";
    } else{
        cc2.style.color = "black";
    }
    
    cc2.innerHTML = colorString;
}

const masterParent = document.getElementById("records");
const saveBtn = document.getElementById("saveButton");
let counter = 0;

let colorStringsArray = [];
let arrayOfRecords = [];
let buttonsToCopy = [];

saveBtn.addEventListener("click", makeElement);

function makeElement(){
    counter++;

    var parentElement = document.createElement("div")
    parentElement.classList.add("elemDiv");

    if(intRed < 95 && intGreen < 95 && intBlue < 95){
        parentElement.classList.add("elemDivWhiteText");
    }

    parentElement.style.backgroundColor = colorString;

    var paraElement = document.createElement("p")
    var textNode = document.createTextNode(colorString);

    paraElement.appendChild(textNode);

    var copyButton = document.createElement("button")
    var btnNode = document.createTextNode("Copy");

    copyButton.appendChild(btnNode);
    copyButton.classList.add("copyButtons");
    copyButton.addEventListener("click", copyToClipboard);

    let deleteButton = document.createElement("button");
    let delete_btn_node = document.createTextNode("Delete");

    deleteButton.appendChild(delete_btn_node);
    deleteButton.addEventListener("click", deleteRecord);

    parentElement.appendChild(paraElement);
    parentElement.appendChild(copyButton);
    parentElement.appendChild(deleteButton);

    colorStringsArray.unshift(colorString);
    arrayOfRecords.unshift(parentElement);
    buttonsToCopy.unshift(copyButton);
    displayRecords();
}

function deleteRecord(e){
    let parentElem = e.target.parentElement;
    for(let i = 0; i < arrayOfRecords.length; i++){
        if(arrayOfRecords[i] == parentElem){
            parentElem.remove();
            arrayOfRecords.splice(i, 1);
            colorStringsArray.splice(i, 1);
            buttonsToCopy.splice(i, 1);
            displayRecords()
        }
    }
}

function displayRecords(){
    for(let i = 0; i < arrayOfRecords.length; i++){
        masterParent.appendChild(arrayOfRecords[i]);
    }
}

function copyToClipboard(e){
    let parent = e.target;
    for(let i = 0; i < buttonsToCopy.length; i++){
        if(parent == buttonsToCopy[i]){
            navigator.clipboard.writeText(colorStringsArray[i]);
        }
    }
}

const random_color_btn = document.querySelector("#random_color");

random_color_btn.addEventListener("click", generateRandomColor);

function generateRandomColor(){
    colorString = "RGB(";
    let random_value;
    for(let i = 0; i < 3; i++){
        random_value = Math.floor(Math.random() * 255);
        random_value = random_value.toString();
        if(i < 2){
            colorString += random_value + ", ";
        } else {
            colorString += random_value + ")"
        }
    }
    makeElement();

}
