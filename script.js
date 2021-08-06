const SERVER_URL_NAMES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants"
const SERVER_URL_STATUS = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/status"
const SERVER_URL_MESSAGES = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages"

let userName = "";

function renderPage () {
    const promiseMessages = axios.get(SERVER_URL_MESSAGES);
    promiseMessages.then(processMessagesSucess);
    promiseMessages.catch(handleMessagesError);
}

function processMessagesSucess (sucess) {

    let allMessages = document.querySelector("main");
    for (let i = 0; i < sucess.data.length; i++) {
        
        if (sucess.data[i].type === "status"){
            allMessages.innerHTML += `<div class="message-box status"><time>(${sucess.data[i].time})</time><strong class="font-weight-700">${sucess.data[i].from}</strong><p>${sucess.data[i].text}</p></div>`;
            document.querySelector("main").lastElementChild.scrollIntoView();
        }
        if (sucess.data[i].type === "message"){
            allMessages.innerHTML += `<div class="message-box normal-message"><time>(${sucess.data[i].time})</time><strong class="font-weight-700">${sucess.data[i].from}</strong><p> para </p><strong class="font-weight-700">${sucess.data[i].to}:</strong><p>${sucess.data[i].text}</p></div>`;
            document.querySelector("main").lastElementChild.scrollIntoView();
        }
        if (sucess.data[i].type === "private_message"){
            if (sucess.data[i].to === userName) {
                allMessages.innerHTML += `<div class="message-box private-message"><time>(${sucess.data[i].time})</time><strong class="font-weight-700">${sucess.data[i].from}</strong><p> reservadamente para </p><strong class="font-weight-700">${sucess.data[i].to}:</strong><p>${sucess.data[i].text}</p></div>`;
                document.querySelector("main").lastElementChild.scrollIntoView();
            }
            
        }
    }
}

function handleMessagesError (error) {
    console.log(error.response.status);
}

renderPage()
setInterval(renderPage, 3000);

function askUserName () {
    userName = prompt("Qual o seu nome?");
    while (userName === "") {
        userName = prompt("Qual o seu nome?");
    }

    let userNameData = {name: userName};
    checkUserName(userNameData);

    return userName;
}

askUserName();

function checkUserName (data) {
    
    let requestName = axios.post(SERVER_URL_NAMES, data);
    requestName.then(processNameSucess);
    requestName.catch(handleNameError);
}

function processNameSucess (sucess) {

    alert("Seu nome foi cadastrado!");
    //setInterval(userStatus, 5000, );

}

function handleNameError (error) {
    console.log(error);
    if (error.response.status === 400){
        alert("Já existe um usuário com esse nome!");
    } else {
        alert("Deu ruim mas não sei porque!");
    }
    askUserName();
}


function userStatus (data) {

    const requestStatus = axios.post(SERVER_URL_STATUS, data);
    requestStatus.then(function () {alert("voce se mantem conectado")});
    requestStatus.catch(function () {alert("Você deixou a sala")});
}


function sendMessage () {

    let from = userName;
    let to = document.querySelector(".all").innerHTML;
    let text = document.querySelector(".writing").value;
    
    let objectMessage = {from, to, text, type: "message"};
    const requestMessage = axios.post(SERVER_URL_MESSAGES, objectMessage);
    requestMessage.then(renderPage);
    requestMessage.catch(refreshPage);
    //document.querySelector("main").innerHTML += `<div>${text}</div>`
    //document.querySelector("main").lastElementChild.scrollIntoView();
    //let inputField = document.querySelector(".bottom-bar");
    //inputField.firstElementChild.innerHTML = '<input class="writing" type="text" placeholder="Escreva aqui...">'
}

function refreshPage () {
    window.location.reload();
}

function sideBar () {
    const sideBar = document.querySelector(".side-bar");
    sideBar.classList.remove("hidden");
    const blurredBackground = document.querySelector(".blurred-background");
    blurredBackground.classList.remove("hidden");
}

function closeSideBar () {
    const sideBar = document.querySelector(".side-bar");
    sideBar.classList.add("hidden");
    const blurredBackground = document.querySelector(".blurred-background");
    blurredBackground.classList.add("hidden");
}

function choose (element) {
    element.lastElementChild.lastElementChild.classList.add("visible");
}


/*  
function orderData () {
    const promise = axios.get(SERVER_URL);
    console.log(promise);
    promise.then(processOrderSucess);
    promise.catch(handleOrderError);
}

function processOrderSucess (sucess) {
    console.log(sucess);
    console.log(sucess.data);
    console.log(sucess.status);

}

function handleOrderError (error) {
    console.log("Status code: " + error.response.status); // Ex: 404
	console.log("Mensagem de erro: " + error.response.data); // Ex: Not Found
}
*/

/*
function sendData () {
    const data = {};
    const requisition = axios.get(SERVER_URL, data);
    console.log(requisition);
    requisition.then(processRequisitionSucess);
    requisition.catch(handleRequisitionError);

}

function processRequisitionSucess (sucess) {

}

function handleRequisitionError (error) {

}

*/