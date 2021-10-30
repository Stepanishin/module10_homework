const textValue = document.querySelector('.text_value');
const sendBtn = document.querySelector('.btn-send');
const geoLocationBtn = document.querySelector('.btn-location');
const resultField = document.querySelector('.result');

const wsUri = "ws://echo.websocket.org/";

let websocket = new WebSocket(wsUri);

websocket.onopen = () => {
    console.log('Соединение установлено');
}
  
websocket.onmessage = (event) => {
    writeToChat(event.data, true);
}
  
websocket.onerror = () => {
    console.log('При передаче данных произошла ошибка');
}

////////////////////////////////////////////////////////////

function sendMessage() {
    if (!textValue.value) return
    websocket.send(textValue.value);
    writeToChat(textValue.value, false);
    textValue.value = "";
}

function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    resultField.innerHTML += messageHTML;
}

sendBtn.addEventListener("click", sendMessage);

///////////////////////////////////////////////////////////
// Функция, выводящая текст об ошибке
const error = () => {
    status.textContent = 'Невозможно получить ваше местоположение';
  }
  
// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    let link = `
    <a href='https://www.openstreetmap.org/#map=18/${latitude}/${longitude}' name='location'>click me, i am here</a>`;
    writeToChat(link); 
}
  
geoLocationBtn.addEventListener('click', () => {

    if (!navigator.geolocation) {
      alert('Geolocation не поддерживается вашим браузером');
    } else {
      console.log('Определение местоположения…');
      navigator.geolocation.getCurrentPosition(success, error);
    }
})
