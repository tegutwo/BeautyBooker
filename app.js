//Functions
// getBookedDates();
// updateDatePicker();
// book();
// displayConfirmationPage();
// sendconfirmationEmail();
function writeBookingData(userId, year, month, day, time, details){
    firebase.database().ref('BOOKER/' + userId + "/" + year + "/" + month + "/" + day + "/" + time).set({
        details: details
    });    
  }
//Add click listener that displays calendar
  var calendarInput = document.querySelector("input#calendar_input"); 
  calendarInput.addEventListener("click",popCalendar);
  function popCalendar(){
   var calendar = document.querySelector("div#calendar");
   calendar.classList.toggle("hidden");
  }
  //Function for when a date is clicked on the calendar
  async function updateDatePicker(){
      var daysInCalendar = document.querySelectorAll(".calendar_cell");
      for(let i =0;i<daysInCalendar.length;i++){
          if(daysInCalendar[i].classList.contains("selected")){
                daysInCalendar[i].classList.remove("selected");
          }
      }
   this.classList.toggle("selected");
   var month = document.querySelector("span.monthName").innerHTML;
   console.log(month);
   var year = document.querySelector("div.calendar_year").innerHTML;
   console.log(year,this.innerHTML);
   var EveningCheckBox = document.querySelector("input#Afternoon");
   console.dir(EveningCheckBox);
   var MorningCheckBox = document.querySelector("input#Morning");
   var EveningChoice =document.querySelector("label.afternoon");
   var MorningChoice = document.querySelector("label.morning");
   EveningChoice.style.display = "initial";
   MorningChoice.style.display = "initial";
   EveningCheckBox.disable= false;
   MorningCheckBox.disable = false;
   var dateInput = document.querySelector("input#calendar_input");
   dateInput.value= `${this.innerHTML}/${month}/${year}`;
  return await database.ref(`BOOKER/Tegutwo Culture/${year}/${month}/${this.innerHTML}`).on("value",(snapshot)=>{
   if(snapshot.exists()){
    if(Object.keys(snapshot.val())[0] == "Evening"){
        var data = Object.keys(snapshot.val());
        console.log(data);
        EveningChoice.style.display = "none";
        MorningCheckBox.checked= true;
    }
    else if(Object.keys(snapshot.val())[0]== "Morning"){
        var data = Object.keys(snapshot.val());
        console.log(data);
        MorningChoice.style.display = "none";
        EveningCheckBox.checked= true;
    }
   }
   
    
   });
}
//Validate form data
var errors = [];
var nameInput = document.querySelector("input.personalDetails_name");
var numberInput = document.querySelector("input.personalDetails_number");
var locationInput = document.querySelector("input.personalDetails_location");
nameInput.addEventListener("keydown",(e)=>{
    //data returns only the data that was there before keydown
    //check if if keypressed is a letter
    var str = nameInput.value;
    str = str.trim();
    var length = str.length;
    var exp = /[a-z]{2}/i;
    if(!exp.test(e.key)){
        length++;
    }
    else if(e.key == "Backspace"){
      length--;
    }
    else{
        //Nothing 
    }
    //
    var errorList = document.createElement("ul");
    errorList.classList.add("errors");
    console.log(document.querySelector("ul.errors"));
    if(!document.querySelector("ul.errors")){
        nameInput.insertAdjacentElement("afterend",errorList);
    }
   
    if(!isNaN(e.key)){
      var liError1 = document.createElement("li");
      liError1.classList.add("NaN");
      liError1.innerHTML = "Name Input cannot contain numbers or special characters";
      errorList.appendChild(liError1);
    }
    else{
       
        var el =document.querySelector("li.NaN");
        if(el)
       el.parentNode.removeChild(el);
    }
    if(!isAboveMinLength(3,length)){
        console.log("Error min");
      var liError2 = document.createElement("li");
      liError2.classList.add("MinLength");
      liError2.innerHTML = "Input cannot be Empty and must be 3 or more characters";
      errorList.appendChild(liError2);
    }
    else{
        var el =document.querySelector("li.MinLength");
        if(el)
       el.parentNode.removeChild(el);
    }
    
     if(!isBelowMaxLength(30,length)){
        var liError3 = document.createElement("li");
      liError3.classList.add("MaxLength");
      liError3.innerHTML = "Input cannot be more than 30 characters";
      errorList.appendChild(liError3);
    }
    else{
        var el =document.querySelector("li.MaxLength");
        if(el)
       el.parentNode.removeChild(el);
    }
   //check for errors
    //add error message when input doesnt meet specifications
    //Change box shadow color to blue when input is valid
    if(document.querySelector("ul.errors").childNodes.length <1){
        document.querySelector("ul.errors").parentNode.removeChild(document.querySelector("ul.errors"));
    }

});
numberInput.addEventListener("keydown",(e)=>{
    checkInputLengthValidity(numberInput,9,13,e);
})
locationInput.addEventListener("keydown",(e)=>{
   checkInputLengthValidity(locationInput,3,30,e);
})
function isEmpty(str){
    //
    if(str == null || str == undefined ||str.trim().length< 1){
        return true;
    }
    return false;
}
function isValidEmail(str){
    let exp = /^[a-z]+.+\@+.+.com/gi;
    if(exp.test(str.trim())){
        console.log(str);
        return true;
    }
    return false;
}
function isAboveMinLength(Length,strLength){
    if(strLength < Length){
        return false;
    }
    return true;
}

function isBelowMaxLength(Length,strLength){
    //
    if(strLength > Length){
        return false;
    }
    return true;
}

//check all inputs according to keypress and pass true if there are no erors 

//get all forms and check validity of details
//Return errror message at top page 

//Add keypress eventlistener
//check if data is valid as user types
//Add error to error array
function checkInputLengthValidity(input,MinLength,MaxLength,e){
//checkLengthValidity flaws
//Doesnt detect when option is picked from a list of options
//When an input has an error other inputs dont show their errors
    var str = input.value;
    str = str.trim();
    var length = str.length;
    var exp = /[a-z]{2}/i;
    if(!exp.test(e.key)){
        length++;
    }
    else if(e.key == "Backspace"){
      length--;
    }
    else{
        //Nothing 
    }
    //
    var errorList = document.createElement("ul");
    errorList.classList.add("errors");
    console.log(document.querySelector("ul.errors"));
    if(!document.querySelector("ul.errors")){
        input.insertAdjacentElement("afterend",errorList);
    }
   
    // if(!isNaN(e.key)){
    //   var liError1 = document.createElement("li");
    //   liError1.classList.add("NaN");
    //   liError1.innerHTML = "Name Input cannot contain numbers or special characters";
    //   errorList.appendChild(liError1);
    // }
    // else{
       
    //     var el =document.querySelector("li.NaN");
    //     if(el)
    //    el.parentNode.removeChild(el);
    // }
    if(!isAboveMinLength(MinLength,length)){
        console.log("Error min");
      var liError2 = document.createElement("li");
      liError2.classList.add("MinLength");
      liError2.innerHTML = `Input cannot be Empty and must be ${MinLength} or more characters`;
      errorList.appendChild(liError2);
    }
    else{
        var el =document.querySelector("li.MinLength");
        if(el)
       el.parentNode.removeChild(el);
    }
    
     if(!isBelowMaxLength(MaxLength,length)){
        var liError3 = document.createElement("li");
      liError3.classList.add("MaxLength");
      liError3.innerHTML = `Input cannot be more than ${MaxLength} characters`;
      errorList.appendChild(liError3);
    }
    else{
        var el =document.querySelector("li.MaxLength");
        if(el)
       el.parentNode.removeChild(el);
    }
   //check for errors
    //add error message when input doesnt meet specifications
    //Change box shadow color to blue when input is valid
    if(document.querySelector("ul.errors").childNodes.length <1){
        document.querySelector("ul.errors").parentNode.removeChild(document.querySelector("ul.errors"));
    }
}

