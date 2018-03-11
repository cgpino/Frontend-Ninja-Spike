var moment = require('moment');
moment.locale('es');


// Solo cambiará el formato de las fechas si las encuentra (para evitar warnings)
var date1 = document.querySelector('#date1');
if (date1 != null) {
    document.querySelector('#date1').textContent = moment(date1.textContent, "YYYYMMDD, h:mm").fromNow();
}

var date2 = document.querySelector('#date2');
if (date2 != null) {
    document.querySelector('#date2').textContent = moment(date2.textContent, "YYYYMMDD, h:mm").fromNow();
}

var date3 = document.querySelector('#date3');
if (date3 != null) {
    document.querySelector('#date3').textContent = moment(date3.textContent, "YYYYMMDD, h:mm").fromNow();
}

var date4 = document.querySelector('#date4');
if (date4 != null) {
    document.querySelector('#date4').textContent = moment(date4.textContent, "YYYYMMDD, h:mm").fromNow();
}

var date5 = document.querySelector('#date5');
if (date5 != null) {
    document.querySelector('#date5').textContent = moment(date5.textContent, "YYYYMMDD, h:mm").fromNow();
}


var date6 = document.querySelector('#date6');
if (date6 != null) {
    document.querySelector('#date6').textContent = moment(date6.textContent, "YYYYMMDD, h:mm").fromNow();
}

var date7 = document.querySelector('#date7');
if (date7 != null) {
    document.querySelector('#date7').textContent = moment(date7.textContent, "YYYYMMDD, h:mm").fromNow();
}

var date8 = document.querySelector('#date8');
if (date8 != null) {
    document.querySelector('#date8').textContent = moment(date8.textContent, "YYYYMMDD, h:mm").fromNow();
}

var date9 = document.querySelector('#date9');
if (date9 != null) {
    document.querySelector('#date9').textContent = moment(date9.textContent, "YYYYMMDD, h:mm").fromNow();
}

var date10 = document.querySelector('#date10');
if (date10 != null) {
    document.querySelector('#date10').textContent = moment(date10.textContent, "YYYYMMDD, h:mm").fromNow();
}