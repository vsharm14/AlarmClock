let hourDigit = document.getElementById("hours");
let minDigit = document.getElementById("mins");
let hourIncrimentBtn = document.getElementById("hourIncriment");
let hourDecrimentBtn = document.getElementById("hourDecriment");
let minuteIncrimentBtn = document.getElementById("minuteIncriment");
let minuteDecrimentBtn = document.getElementById("minuteDecriment");
let setAlarm = document.getElementById("setAlarm");
let alarmListToday = document.getElementById("alarmListToday");

console.log("hours are ",hourDigit.innerText);

hourIncrimentBtn.addEventListener('click',incriment);
hourDecrimentBtn.addEventListener('click',decriment);
minuteIncrimentBtn.addEventListener('click',incriment);
minuteDecrimentBtn.addEventListener('click',decriment);
setAlarm.addEventListener('click',addAlarm);

function incriment(event){
    console.log('event is ', event.target.id);

    if(event.target.id == 'hourIncriment' && hourDigit.innerText < 23 ){
        console.log(hourDigit);
        hourDigit.innerText = ++hourDigit.innerText;
        console.log(hourDigit);
    }

    else if(event.target.id == 'minuteIncriment' && minDigit.innerText < 59 ){
        minDigit.innerText = ++minDigit.innerText;
    }
}


function decriment(event){
    if(event.target.id == 'hourDecriment' && hourDigit.innerText > 0 ||
       event.target.id == 'minuteDecriment' && minDigit.innerText > 0){
        if(event.target.id == 'hourDecriment'){
            hourDigit.innerText = --hourDigit.innerText;
    }
        else{
            minDigit.innerText = --minDigit.innerText;
        }
    }
}

let alarmList = [];

class Alarm {
    constructor(hours,mins){
        this.hours = hours;
        this.mins = mins;
    }
    get hour() {
        return this.hours;
    }
    get min() {
        return this.mins;
    }
}


function addAlarm(){
    let hours = hourDigit.innerText;
    let mins = minDigit.innerText;
    console.log(hours,mins);
    if(hours > 0 || mins > 0){
        let alarm = new Alarm(hours,mins);
        alarmList.push(alarm);
        console.log(alarm.hour);
        alert(`Alarm is set for ${alarm.hour} : ${alarm.min}`);
        renderAlarmList();
        initializeAlarmSetter();
    }else{
        alert ("Please provide time to set alarm");
    }
}

function initializeAlarmSetter(){
    hourDigit.innerText = 00;
    minDigit.innerText = 00;
}

function renderAlarmList(){
        alarmListToday.innerHTML ='';
        let alarmsList = document.createElement('ul');
        alarmListToday.appendChild(alarmsList);
        alarmList.forEach(function(alarm){
        console.log(alarm.hour);
        let li = document.createElement("li");
        let children = alarmsList.children.length + 1;
        li.setAttribute("id",children);
        let time = (`Alarm Time is ${alarm.hour} : ${alarm.min}`);
        li.innerHTML = time + '&nbsp' + '&nbsp' + '<button class="deleteBtn" onclick="deleteAlarm(id)" id="children"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
        alarmsList.appendChild(li);
    })
}


let deleteBtn = document.getElementsByClassName("deleteBtn");

deleteBtn.addEventListener('click',deleteAlarm);

function deleteAlarm(id){
    console.log(id);
}