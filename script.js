let days, months, years, wrapper, datePicker, leftNav, rightNav, today, todayDate, todayMonth, todayYear, reset, td, dateHolder, navWrap, selectedMonth, selectedMonthIndex, selectedYear, firstDay, monthStartDay, selectedYearIndex, monthsOptions, yearOptions, activeDateDay, splitDateDay, SplitDate, activeDay, activeDate, activeYearIndex;

days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
years = [];
for (x = 1900; x < 2099; x++) { years.push(x); }

today = new Date();
todayDay = today.getDay();
todayDate = today.getDate();
todayMonth = today.getMonth();
todayYear = today.getFullYear();

wrapper = document.querySelector('.date-picker');
datePicker = document.getElementById('dateInput');
monthPicker = document.getElementById('month');
yearPicker = document.getElementById('year');
navWrap = document.querySelector('.actions');
leftNav = document.getElementById('nav-left');
rightNav = document.getElementById('nav-right');
reset = document.getElementById('reset-icon');
td = document.getElementsByTagName('td');
dateHolder = Array.from(td);

//Setting Pointer Events None to All Date Columns;
dateHolder.forEach(function (li) {
    li.style.pointerEvents = "none";
});

//Changing to Current Date on loading
window.onload = function () {
    datePicker.value = todayDate + "/" + (todayMonth + 1) + "/" + todayYear + ", " + days[todayDay];

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

    monthsOptions = monthPicker.querySelectorAll('option');
    yearOptions = yearPicker.querySelectorAll('option');
    getActiveDate();
}

//Delete Old Dates
function clearDates() {
    dateHolder.forEach(item => {
        item.classList.remove('active');
        item.innerHTML = "";
        item.style.pointerEvents = "none";
    });
}

//Create New Dates
function CreateDates(start, total) {
    for (i = 1; i <= total; i++) {
        dateHolder[start].innerHTML = i;
        dateHolder[start].style.pointerEvents = "initial";
        start++;
    }
}

//Getting Date from Input Field
function getActiveDate() {
    activeDateDay = datePicker.value;
    splitDateDay = activeDateDay.split(',');
    activeDate = splitDateDay[0].split('/');
    activeDay = splitDateDay[1];
    activeMonth = parseInt(activeDate[1]);
    activeMonthIndex = activeMonth - 1;
    activeYear = parseInt(activeDate[2]);
    activeYearIndex = years.indexOf(parseInt(activeDate[2]));
    yearOptions[activeYearIndex].selected = true;
    monthsOptions[activeDate[1] - 1].selected = true;
}

//Getting Active Month and Year
function getActiveMonthYear() {
    selectedMonth = monthPicker.options[monthPicker.selectedIndex].textContent;
    selectedMonthIndex = months.indexOf(selectedMonth);
    selectedYear = parseInt(yearPicker.options[yearPicker.selectedIndex].textContent);
    selectedYearIndex = years.indexOf(selectedYear);
    firstDay = new Date(selectedYear, selectedMonthIndex, 1);
    monthStartDay = firstDay.getDay();
}

//Creating Dates for Complete Month
function changeDates() {
    getActiveMonthYear();
    clearDates();
    if (selectedMonth == "Jan" || selectedMonth == "Mar" || selectedMonth == "May" || selectedMonth == "Jul" || selectedMonth == "Aug" || selectedMonth == "Oct" || selectedMonth == "Dec") { CreateDates(monthStartDay, 31); }
    else if (selectedMonth === "Feb") { selectedYear % 4 === 0 ? CreateDates(monthStartDay, 29) : CreateDates(monthStartDay, 28); }
    else { CreateDates(monthStartDay, 30); }
}

//Calendar Opener
datePicker.addEventListener('click', function () {
    wrapper.classList.toggle('show');
    getActiveDate();
    clearDates();
    changeDates();
    dateHolder.forEach(function (each) {
        if (parseInt(each.innerHTML) === parseInt(activeDate[0])) {
            each.classList.add('active');
        };
    });
});

//Changing Month through Navigation Keys
navWrap.addEventListener('click', function () {
    getActiveMonthYear();
    if (event.target.classList.contains('right')) {
        if (!(selectedMonthIndex === 11 && selectedYearIndex === (years.length - 1))) {
            if (selectedMonthIndex === 11) {
                monthsOptions[0].selected = true;
                yearOptions[selectedYearIndex + 1].selected = true;
            }
            else {
                monthsOptions[selectedMonthIndex + 1].selected = true;
            }
            clearDates();
            changeDates();
        }
        checkActiveDate();
    }
    else if (event.target.classList.contains('left')) {
        if (!(selectedYearIndex === 0 && selectedMonthIndex === 0)) {
            if (selectedMonthIndex === 0) {
                monthsOptions[11].selected = true;
                yearOptions[selectedYearIndex - 1].selected = true;
            }
            else {
                monthsOptions[selectedMonthIndex - 1].selected = true;
            }
            clearDates();
            changeDates();
        }
        checkActiveDate();
    }
});

//Changing Active Date on Click
dateHolder.forEach(date => {
    date.addEventListener('click', function () {
        dateHolder.forEach(item => {
            item.classList.remove('active');
        })
        date.classList.add('active');
        let newActiveDate = parseInt(date.textContent);
        let newActiveDay = new Date(selectedYear, selectedMonthIndex, newActiveDate);
        getActiveMonthYear();
        datePicker.value = newActiveDate + "/" + (selectedMonthIndex + 1) + "/" + selectedYear + ", " + days[newActiveDay.getDay()];
        wrapper.classList.remove('show');
    });
});

//Change While selection Months
monthPicker.addEventListener('change', function () {
    clearDates();
    changeDates();
    checkActiveDate();
});

//Change While selection Years
yearPicker.addEventListener('change', function () {
    clearDates();
    changeDates();
    checkActiveDate();
});

//Close Date Picker when clicked outside
document.addEventListener('click', function (e) {
    if (!(event.target.closest(".date-picker"))) {
        wrapper.classList.remove('show');
    }
});

//Checking active date is in the selected Month
function checkActiveDate() {
    if (activeMonthIndex === selectedMonthIndex && selectedYear === activeYear) {
        dateHolder.forEach(function (each) {
            if (parseInt(each.innerHTML) === parseInt(activeDate[0])) {
                each.classList.add('active');
            };
        });
    }
}

//Reset Date
reset.addEventListener('click', function () {
    datePicker.value = todayDate + "/" + (todayMonth + 1) + "/" + todayYear + ", " + days[todayDay];
    getActiveDate();
    clearDates();
    changeDates();
    dateHolder.forEach(function (each) {
        if (parseInt(each.innerHTML) === parseInt(activeDate[0])) {
            each.classList.add('active');
        };
    });
});