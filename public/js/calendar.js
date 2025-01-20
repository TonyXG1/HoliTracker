const calendarDays = document.getElementById('calendar-days');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let curDate = new Date();

function renderCalendar(date){
    const year = date.getFullYear();
    const month = date.getMonth();

    monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
    calendarDays.innerHTML = '';

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day-header');
        dayElement.textContent = day;
        calendarDays.appendChild(dayElement);
    });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for(let i = 0; i < firstDayOfMonth; i++){
      const dayCell = document.createElement('div');
      calendarDays.appendChild(dayCell);  
    } 

    let previousDayCell = document.querySelector(".current-day");
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day");
        dayCell.textContent = day;
  
        // Highlight current day
        if (
          day === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear()
        ) {
          dayCell.classList.add("current-day");
          previousDayCell = dayCell;
        }

        dayCell.addEventListener('click', () => {
            if(previousDayCell && previousDayCell !== dayCell){
                previousDayCell.classList.remove("current-day");
            }
            dayCell.classList.add("current-day");
            previousDayCell = dayCell;
            curDate.setDate(day);
            selectDate(curDate);
        });

        calendarDays.appendChild(dayCell);
    }
}    

renderCalendar(curDate);  

prevMonthBtn.addEventListener('click', () => {
    curDate.setMonth(curDate.getMonth() - 1);
    renderCalendar(curDate);
});

nextMonthBtn.addEventListener('click', () => {
    curDate.setMonth(curDate.getMonth() + 1);
    renderCalendar(curDate);
});

function selectDate(date){
    console.log(date);
    const selectedDateInput = document.getElementById("selectedDate");
    var formattedDate = formatDate(date);
    selectedDateInput.value = formattedDate;
    console.log(formattedDate);
}

function formatDate(date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

