//Following are the handlers for different elements and event handler
let hourDigit = document.getElementById("hours");
let minDigit = document.getElementById("mins");
let hourIncrimentBtn = document.getElementById("hourIncriment");
let hourDecrimentBtn = document.getElementById("hourDecriment");
let minuteIncrimentBtn = document.getElementById("minuteIncriment");
let minuteDecrimentBtn = document.getElementById("minuteDecriment");
let setAlarm = document.getElementById("setAlarm");
let alarmListToday = document.getElementById("alarmListToday");
let alarmsSet = false;
let myAudio = document.getElementById("myAudio");
let clock= document.getElementById("clock");
let snooze = false;
hourIncrimentBtn.addEventListener('click',incriment);
hourDecrimentBtn.addEventListener('click',decriment);
minuteIncrimentBtn.addEventListener('click',incriment);
minuteDecrimentBtn.addEventListener('click',decriment);
setAlarm.addEventListener('click',addAlarm);

//Following will keeps updating the clock for current time
setInterval(showCurrentTime,1000);

//Following will clock
function showCurrentTime(){
    let date = new Date();
    clock.innerText ='';
    clock.innerText = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
}

//Following functions sets the alarms
function incriment(event){
    if(event.target.id == 'hourIncriment' && hourDigit.innerText < 23 ){
        hourDigit.innerText = ++hourDigit.innerText;
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

//Fowwing code includes functionality for alarm addition
function addAlarm(){
    let date = new Date();
    let currentHour = date.getHours();
    let currentMin = date.getMinutes();
    let hour = 0;
    let min = 0;
    let timeLeft = 0;
    if (snooze){
        if (currentMin >= 55){
            min = 5 - (60 %currentMin);
            hour = currentHour + 1;
        }else{
            min = currentMin + 5;
            hour = currentHour;
        }
        let alarm = new Alarm(hour,min);
        alarmList.push(alarm);
        alert(`Alarm is set for ${alarm.hour} : ${alarm.min}`);
        timeLeft = 300000;
        snooze = false;
    }
    else{
     hours = hourDigit.innerText;
     mins = minDigit.innerText;

     if(hours > 0 || mins > 0){
        let alarm = new Alarm(hours,mins);
        alarmList.push(alarm);
        currentHour = date.getHours() - (+alarm.hour);
        currentMin = date.getMinutes() - (+alarm.min);
        alert(`Alarm is set for ${alarm.hour} : ${alarm.min}`);
        timeLeft = (currentHour*60 - currentMin) * 60 * 1000;
    }else{
        alert ("Please provide time to set alarm");
    }
}
if(timeLeft < 0)
{
    timeLeft = timeLeft * -1;
}
setTimeout(function (id){
    return function(){
     let currentAlarmId = "alarm_" + id;
     let snoozeBtnId = "snoozeBtn_" + id;
     let currentAlarm = document.getElementById(currentAlarmId);
     let snoozeBtn = document.getElementById(snoozeBtnId);
     currentAlarm.classList.remove("deactivate");
     currentAlarm.style.width = 90 + "%";
     snoozeBtn.classList.add("activate");
     snoozeBtn.classList.add("snoozeBtn");
     currentAlarm.classList.add("alarmActive");
     myAudio.play();
    }
 }(alarmList.length),timeLeft);
 renderAlarmList();
 initializeAlarmSetter();
}


//Following is initialization code for the clock
function initializeAlarmSetter(){
    hourDigit.innerText = 00;
    minDigit.innerText = 00;
}

//Follwoing code will render the list for all alarms
function renderAlarmList(){
        alarmListToday.innerHTML ='';
        let alarmsList = document.createElement('ul');
        alarmsList.setAttribute("id","list");
        alarmListToday.appendChild(alarmsList);
        alarmList.forEach(function(alarm){
        let li = document.createElement("li");
        let children = alarmsList.children.length + 1;
        li.setAttribute("id","alarm_"+children);
        let time = (`Alarm Time is ${alarm.hour} : ${alarm.min}`);
        let btn = document.createElement('button');
        btn.setAttribute("class","deleteBtn");
        btn.setAttribute("id","delBtn_"+children);
        alarm.id = "alarm_"+children;
        btn.className = "deleteBtn";
        btn.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
        let snoozeBtn = document.createElement('button');
        snoozeBtn.setAttribute("class","deactivate");
        snoozeBtn.setAttribute("id","snoozeBtn_"+children);
        snoozeBtn.innerHTML = 'Snooze';
        li.innerHTML = time + '&nbsp' + '&nbsp';
        li.appendChild(btn);
        li.appendChild(snoozeBtn);
        alarmsList.appendChild(li);
        alarmsSet = true;
    })
}

//Following code will add the handler for any event which happens on click and 
//intercepts the different target like for delete and snooze
document.body.addEventListener('click',function(evt){
    if(evt.target.className =='deleteBtn' || evt.target.className == 'fa fa-trash-o'){
    let idArray = evt.composedPath()[1].id.split("_");
    let index =  +evt.composedPath()[1].id -1;
    alarmList.splice(index,1);
    renderAlarmList();
}
if(evt.target.className.includes("snoozeBtn")){
    let idArray = evt.composedPath()[1].id.split("_");
    let index =  +evt.composedPath()[1].id -1;
    alarmList.splice(index,1);
    snooze = true;
    addAlarm();
    renderAlarmList();
}
});
