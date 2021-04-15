const database = firebase.database();
var date = new Date();
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October',"November","December"];
var currentCalendarMonth = date.getMonth();
var currentYear = date.getFullYear();
console.log(currentYear);

function createCalendar(month,year){
//Update year calendar
var calendarYear = document.querySelector("div.calendar_year");
calendarYear.innerHTML = year;
//update year calendar
var calendarMonth = document.querySelector("span.monthName");
calendarMonth.innerHTML = months[month];
//Initialise 
let choosenDate = new Date(year,month);
 var table = document.querySelector("table.calendar_table");
 var tableBody = document.createElement("tbody");
 tableBody.classList.add("calendar_tableBody");
 var daysinMonth = 32 - (new Date(year,month,32).getDate());
 var day = choosenDate.getDay();
 var date = 1;
 for(let i=0;i<6;i++){
     //Create week row
    var tr = document.createElement("tr");
    tr.classList.add("claendar_week");
    for(let d=0;d<7;d++){
        //create day cells
        if(i == 0 && day > d){
            let td = document.createElement("td");
            let text = document.createTextNode(" ");
            td.classList.add("calendar_cell");
            td.appendChild(text);
            tr.appendChild(td);
        }
        else if(date > daysinMonth){
            //if days of the month are done
            break;
        }
        else{
            let td = document.createElement("td");
            let text = document.createTextNode(date);
            td.classList.add("calendar_cell");
            td.appendChild(text);
            tr.appendChild(td);
            date++;
        }
    }
    tableBody.appendChild(tr);
 }

 table.appendChild(tableBody);
 formatCalendar(year,month);
}
function destroyCalendar(){
  //get table and remove the tablebody element 
    var calendarBody = document.querySelector("tbody.calendar_tableBody");
    var table = document.querySelector("table.calendar_table");
    table.removeChild(calendarBody);
}
var btnPrev = document.querySelector("span.btn_prev");//Get calendars Previous btn
var btnNext = document.querySelector("span.btn_next");//Get calendars Next button
btnPrev.addEventListener("click",prevMonth);
btnNext.addEventListener("click",nextMonth);

function nextMonth(){
//Add one to the calendars current month
  currentCalendarMonth++;
  //Check if calendar moved to next year
if(currentCalendarMonth >=12){
    //Increase calendar year by 1
    currentYear++;
    //Set month to first month of the year
    currentCalendarMonth = 0;
}
destroyCalendar();
createCalendar(currentCalendarMonth,currentYear);
}
function prevMonth(){
  //check that the calendar is not the current month of the the current year if its not sub 1 from the calendars current month
  //else check if the calendar month is equal to the current month but not the current year 
  //This allows use of the previous button in months with same name as the current month but in different year
    if(currentYear == (new Date().getFullYear()) && currentCalendarMonth !== (new Date().getMonth())){
        currentCalendarMonth -= 1;
        //Check if calendar moved to previous year if so sub 1 from the current year 
        //and set current month to the last month of the year
        if(currentCalendarMonth == -1){
            currentYear -= 1;
            currentCalendarMonth  =11;
        }
        destroyCalendar();
        createCalendar(currentCalendarMonth,currentYear);
    }
  //Check that the calendar is not at the current year 
  //if its not subtract 1 from current month even if its the same as the current month of the year
    else if( currentYear !== (new Date().getFullYear())){
        currentCalendarMonth-=1;
        //Check if calendar moved to previous year if so sub 1 from the current year 
        //and set current month to the last month of the year
        if(currentCalendarMonth == -1){
            currentYear -= 1;
            currentCalendarMonth = 11;
        }
        destroyCalendar();
        createCalendar(currentCalendarMonth,currentYear);
    }
    else{
      //Nothing To do;
    }
}
createCalendar(currentCalendarMonth,currentYear);
// destroyCalendar();
/*
if(monthchnages to next){
    change month in calendar +1
    if(month >= 12){
        changeyear
        month = 0;
    }
    destroyCalendar
    createCalendar(month,year)
}
if(monthchanges to previous){
    
    if(year == currentYear && month !== currentMonth){
        month-=1;
        if(month == -1) {year -=1,month=11};
        destroyCalendar;
        createCalendar(month,year);
    }
    else if( year !== currentYear) {
        month-=1;
        if(month == -1) {year -=1,month=11};
        destroyCalendar;
        createCalendar(month,year);
    }else{
        disable prevBtn;
    }
    change month in calendar -1
     if(month!==currentMonth) {enable previous btn;}else{disable prevBtn}
}
*/

async function formatCalendar(years,months){
  //Getting calendar cells
  var days = document.querySelectorAll('td.calendar_cell');
for(let  i =0;i<days.length;i++){
  //getting calendar cell dates
  let cell = parseInt(days[i].innerHTML);
 await database.ref(`BOOKER/Tegutwo Culture/${years}/${this.months[months]}/${cell}`).on("value",(snapshot)=>{
    if(snapshot.exists()){
      //check if fully booked
      var data = snapshot.val();
      if(Object.values(data).length > 1){
        days[i].removeEventListener("click",updateDatePicker);
        days[i].style.color = "Grey"; 
      }
      else{
        days[i].addEventListener("click",updateDatePicker);
      }
  }
  else{
    //check if date is passed or is current day of current month of the current year
    if((cell <= date.getDate() || cell == NaN) && months == date.getMonth() && years == date.getFullYear()){
      cell == date.getDate() ? (days[i].style ="color:blue;border-radius:50%;"): days[i].style.color = "grey";
    }else{
      //Add click listener if day is not fully booked or booked at all
      days[i].addEventListener("click",updateDatePicker);
    }
      
  }
    })
}
}





  
