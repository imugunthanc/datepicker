let days, months, years, wrapper, datePicker, leftNav, rightNav, today, todayDate, todayMonth, todayYear, reset, td, dateHolder, monthStartDay;

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
leftNav = document.getElementById('nav-left');
rightNav = document.getElementById('nav-right');
reset = document.getElementById('reset-icon');
td = document.getElementsByTagName('td');
dateHolder = Array.from(td);
// action = document.querySelector('.actions');
// yearIndex = Array.prototype.slice.call(years).indexOf(todayYear);

//Setting Pointer Events None to All Date Columns;
dateHolder.forEach(function (li) {
    li.style.pointerEvents = "none";
});

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
    datePicker.value = todayDate + "/" + (todayMonth + 1) + "/" + todayYear + ", " + days[todayDay];
}

//Delete Old Dates
function clearDates() {
    dateHolder.forEach(item => {
        item.classList.remove('active');
        item.innerHTML = "";
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

//Fetching Date from Input Field
function activeDate() {

}

//Creating Dates for Complete Month
function changeDates() {
    let selectedMonth = monthPicker.options[monthPicker.selectedIndex].textContent;
    let selectedMonthIndex = months.indexOf(selectedMonth);
    let selectedYear = yearPicker.options[yearPicker.selectedIndex].textContent;
    let firstDay = new Date(selectedYear, selectedMonthIndex, 1);
    let monthStartDay = firstDay.getDay();
    clearDates();
    if (selectedMonth == "Jan" || selectedMonth == "Mar" || selectedMonth == "May" || selectedMonth == "Jul" || selectedMonth == "Aug" || selectedMonth == "Oct" || selectedMonth == "Dec") { CreateDates(monthStartDay, 31); }
    else if (selectedMonth === "Feb") { yearActive % 4 === 0 ? CreateDates(monthStartDay, 29) : CreateDates(monthStartDay, 28); }
    else { CreateDates(monthStartDay, 30); }
}

//Calendar Opener
datePicker.addEventListener('click', function () {
    wrapper.classList.toggle('show');
    clearDates();
    changeDates();
});

//Close Date Picker when clicked outside
document.addEventListener('click', function (e) {
    if (!(event.target.closest(".date-picker"))) {
        wrapper.classList.remove('show');
    }
});
