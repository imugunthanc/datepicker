let date, parent, months, monthPicker, option, years, yearPicker, leftNav, rightNav, actions, col, dateIndex, day30, dateCol, today, todayDate, todayMonth, todayYear, optionsAllMonths, optionsAllYear, days, reset, monthstart, yearIndex, todayDay;

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
years = [];
days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

for (x = 1900; x < 2099; x++) { years.push(x); }

parent = document.querySelector('.date-picker');
date = document.getElementById('dateInput');
monthPicker = document.getElementById('month');
yearPicker = document.getElementById('year');
leftNav = document.getElementById('nav-left');
rightNav = document.getElementById('nav-right');
action = document.querySelector('.actions');
col = document.getElementsByTagName('td');
dateCol = Array.from(col);
today = new Date();
todayDate = today.getDate();
todayMonth = today.getMonth();
todayYear = today.getFullYear();
yearIndex = Array.prototype.slice.call(years).indexOf(todayYear);
todayDay = today.getDay();
reset = document.getElementById('reset-icon');

dateCol.forEach(function (li) {
    li.style.pointerEvents = "none";
})

//Months Options Creation
months.forEach(function (mo) {
    option = document.createElement('option');
    option.value = mo;
    option.appendChild(document.createTextNode(mo));
    monthPicker.appendChild(option);
});

//Years Options Creation
years.forEach(function (mo) {
    option = document.createElement('option');
    option.value = mo;
    option.appendChild(document.createTextNode(mo));
    yearPicker.appendChild(option);
});

//Changing to Current Date on loading
window.onload = function () {
    date.value = todayDate + "/" + (todayMonth + 1) + "/" + todayYear + ", " + days[todayDay];
}

//Calendar Opener
date.addEventListener('click', function () {
    parent.classList.toggle('show');
    let getValue = date.value;
    let seperateValue = getValue.split(',');
    let getActiveDate = seperateValue[0];
    var myarray = getActiveDate.split('/');
    dateCol = Array.from(col);
    clearValue();
    var firstDay = new Date(myarray[2], (myarray[1] - 1), 1);
    let monthStartDate = firstDay.getDay();
    var e = document.getElementById("month");
    let newMonth = months[myarray[1] - 1];
    var yearActive = myarray[2];
    if (newMonth == "Jan" || newMonth == "Mar" || newMonth == "May" || newMonth == "Jul" || newMonth == "Aug" || newMonth == "Oct" || newMonth == "Dec") { dateLoop(monthStartDate, 31); }
    else if (newMonth === "Feb") { yearActive % 4 === 0 ? dateLoop(monthStartDate, 29) : dateLoop(monthStartDate, 28); }
    else { dateLoop(monthStartDate, 30); }
    dateCol.forEach(function (da) {
        if (parseInt(da.innerHTML) === parseInt(myarray[0])) {
            dateIndex = Array.prototype.slice.call(col).indexOf(da);
            da.classList.add('active');
        };
    });
    optionsAllMonths = monthPicker.querySelectorAll('option');
    optionsAllMonths[parseInt(myarray[1] - 1)].selected = true;
    optionsAllYear = yearPicker.querySelectorAll('option');
    optionsAllYear[years.indexOf(parseInt(myarray[2]))].selected = true;
});

//Nav Change
action.addEventListener('click', function () {
    dateCol = Array.from(col);
    var e = document.getElementById("month");
    var eOptions = e.options;
    var strUser = e.options[e.selectedIndex];
    var index = Array.prototype.slice.call(eOptions).indexOf(strUser);
    let target = event.target;
    var yearOptions = yearPicker.options;
    var yearActive = yearPicker.options[yearPicker.selectedIndex];
    var yearIndex = Array.prototype.slice.call(yearOptions).indexOf(yearActive);
    optionsAllMonths.forEach(function (ea) {
        ea.selected = false;
    });
    if (target.classList.contains('right')) {
        dateCol.forEach(function (da) {
            if (parseInt(da.innerHTML) === 28) {
                dateIndex = Array.prototype.slice.call(col).indexOf(da);
            };
        });
        if (index === 11) {
            optionsAllMonths[0].selected = true;
            optionsAllYear.forEach(function (ye) {
                ye.selected = false;
            });
            optionsAllYear[yearIndex + 1].selected = true;
        }
        else {
            optionsAllMonths[index + 1].selected = true;
        }
        let startDate = dateIndex % 7;
        clearValue();
        let newMonth = e.options[e.selectedIndex].textContent;
        var yearActive = yearPicker.options[yearPicker.selectedIndex].textContent;
        if (newMonth === "May" || newMonth === "Jul" || newMonth === "Oct" || newMonth === "Dec") {
            let newStart = startDate + 3;
            newStart = dayReset(newStart);
            dateLoop(newStart, 31);
        }
        else if (newMonth === "Mar") {
            if (yearActive % 4 === 0) {
                let newStart = startDate + 2;
                newStart = dayReset(newStart);
                dateLoop(newStart, 31);
            }
            else {
                let newStart = startDate + 1;
                newStart = dayReset(newStart);
                dateLoop(newStart, 31);
            }
        }
        else if (newMonth === "Jan" || newMonth === "Aug") {
            let newStart = startDate + 4;
            newStart = dayReset(newStart);
            dateLoop(newStart, 31);
        }
        else if (newMonth === "Feb") {
            let newStart = startDate + 4;
            newStart = dayReset(newStart);
            yearActive % 4 === 0 ? dateLoop(newStart, 29) : dateLoop(newStart, 28);
        }
        else {
            let newStart = startDate + 4;
            newStart = dayReset(newStart);
            dateLoop(newStart, 30);
        }
    }
    else if (target.classList.contains('left')) {
        dateCol.forEach(function (da) {
            if (parseInt(da.innerHTML) === 1) {
                dateIndex = Array.prototype.slice.call(col).indexOf(da);
            };
        });
        if (index === 0) {
            optionsAllMonths[11].selected = true;
            optionsAllYear.forEach(function (ye) {
                ye.selected = false;
            });
            optionsAllYear[yearIndex - 1].selected = true;
        }
        else {
            optionsAllMonths[index - 1].selected = true;
        }
        let startDate = dateIndex % 7;
        clearValue();
        let newMonth = e.options[e.selectedIndex].textContent;
        var yearActive = yearPicker.options[yearPicker.selectedIndex].textContent;
        if (newMonth === "Jan" || newMonth === "Mar" || newMonth === "May" || newMonth === "Jul" || newMonth === "Aug" || newMonth === "Oct" || newMonth === "Dec") {
            let newStart = startDate - 3;
            newStart < 0 ? newStart = 7 + newStart : newStart = newStart;
            dateLoop(newStart, 31);
        }
        else if (newMonth === "Feb") {
            if (yearActive % 4 === 0) {
                let newStart = startDate - 1;
                newStart < 0 ? newStart = 7 + newStart : newStart = newStart;
                dateLoop(newStart, 29);
            }
            else {
                let newStart = startDate - 0;
                newStart < 0 ? newStart = 7 + newStart : newStart = newStart;
                dateLoop(newStart, 28);
            }
        }
        else {
            let newStart = startDate - 2;
            newStart < 0 ? newStart = 7 + newStart : newStart = newStart;
            dateLoop(newStart, 30);
        }
    }
})

//Change While selection Months
monthPicker.addEventListener('change', function () {
    changeDates();
});

//Change While selection Years
yearPicker.addEventListener('change', function () {
    changeDates();
})

//Change Date Function
function changeDates() {
    let selectedMonth = monthPicker.options[monthPicker.selectedIndex].value;
    let selectedMonthIndex = months.indexOf(selectedMonth);
    let selectedYear = yearPicker.options[yearPicker.selectedIndex].value;
    var firstDay = new Date(selectedYear, selectedMonthIndex, 1);
    dateCol = Array.from(col);
    clearValue();
    var e = document.getElementById("month");
    let newMonth = e.options[e.selectedIndex].textContent;
    var yearActive = yearPicker.options[yearPicker.selectedIndex].textContent;
    let monthStartDate = firstDay.getDay();
    if (newMonth == "Jan" || newMonth == "Mar" || newMonth == "May" || newMonth == "Jul" || newMonth == "Aug" || newMonth == "Oct" || newMonth == "Dec") { dateLoop(monthStartDate, 31); }
    else if (newMonth === "Feb") {
        yearActive % 4 === 0 ? dateLoop(monthStartDate, 29) : dateLoop(monthStartDate, 28);
    }
    else { dateLoop(monthStartDate, 30); }
}

//Active Date Change
dateCol.forEach(item => {
    item.addEventListener('click', function () {
        dateCol.forEach(item => {
            item.classList.remove('active');
        })
        item.classList.add('active');
        let activeDate = parseInt(item.textContent);
        let selectedMonth = monthPicker.options[monthPicker.selectedIndex].text;
        let selectedYear = parseInt(yearPicker.options[yearPicker.selectedIndex].textContent);
        let activeMonthIndex = months.indexOf(selectedMonth);
        let selectedDay = new Date(selectedYear, activeMonthIndex, activeDate);
        date.value = activeDate + "/" + (activeMonthIndex + 1) + "/" + selectedYear + ", " + days[selectedDay.getDay()];
        parent.classList.remove('show');
    });
});

//Remove date Picker when clicked outside
document.addEventListener('click', function (e) {
    if (!(event.target.closest(".date-picker"))) {
        parent.classList.remove('show');
    }
});

reset.addEventListener('click', function () {
    date.value = todayDate + "/" + (todayMonth + 1) + "/" + todayYear + ", " + days[todayDay];
    dateCol = Array.from(col);
    clearValue();
    newMonth = months[todayMonth];
    monthstart = new Date(todayYear, todayMonth, 1);
    monthStartDate = monthstart.getDay();
    if (newMonth == "Jan" || newMonth == "Mar" || newMonth == "May" || newMonth == "Jul" || newMonth == "Aug" || newMonth == "Oct" || newMonth == "Dec") { dateLoop(monthStartDate, 31); }
    else if (newMonth === "Feb") {
        if (yearActive % 4 === 0) { dateLoop(monthStartDate, 29); }
        else { dateLoop(monthStartDate, 28); }
    }
    else { dateLoop(monthStartDate, 30); }
    dateCol.forEach(function (da) {
        if (parseInt(da.innerHTML) === todayDate) {
            dateIndex = Array.prototype.slice.call(col).indexOf(da);
            da.classList.add('active');
        };
    });
    optionsAllMonths = monthPicker.querySelectorAll('option');
    optionsAllMonths[todayMonth].selected = true;
    optionsAllYear = yearPicker.querySelectorAll('option');
    optionsAllYear[years.indexOf(todayYear)].selected = true;
    parent.classList.remove('show');
})

//Create Date Loop
function dateLoop(start, total) {
    for (i = 1; i <= total; i++) {
        dateCol[start].innerHTML = i;
        dateCol[start].style.pointerEvents = "initial";
        start++;
    }
}

//Delete Date Loop
function clearValue() {
    dateCol.forEach(function (item) {
        item.classList.remove('active');
        item.innerHTML = "";
    });
}

function dayReset(newStart) {
    newStart = newStart % 7;
    newStart === 7 ? newStart = 0 : newStart = newStart;
    return newStart;
}