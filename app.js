//Functions
// getBookedDates();
// updateDatePicker();
// book();
// displayConfirmationPage();
// sendconfirmationEmail();
function writeBookingData(userId, year, month, day, time, details) {
    firebase.database().ref('BOOKER/' + userId + "/" + year + "/" + month + "/" + day + "/" + time).set({
        details: details
    });
}
//Add click listener that displays calendar
var calendarInput = document.querySelector("input#calendar_input");
calendarInput.addEventListener("click", popCalendar);

function popCalendar() {
    var calendar = document.querySelector("div#calendar");
    calendar.classList.toggle("hidden");
}
//Function for when a date is clicked on the calendar
async function updateDatePicker() {
    var daysInCalendar = document.querySelectorAll(".calendar_cell");
    for (let i = 0; i < daysInCalendar.length; i++) {
        if (daysInCalendar[i].classList.contains("selected")) {
            daysInCalendar[i].classList.remove("selected");
        }
    }
    this.classList.toggle("selected");
    var month = document.querySelector("span.monthName").innerHTML;
  
    var year = document.querySelector("div.calendar_year").innerHTML;
  
    var EveningCheckBox = document.querySelector("input#Afternoon");
    console.dir(EveningCheckBox);
    var MorningCheckBox = document.querySelector("input#Morning");
    var EveningChoice = document.querySelector("label.afternoon");
    var MorningChoice = document.querySelector("label.morning");
    EveningChoice.style.display = "initial";
    MorningChoice.style.display = "initial";
    EveningCheckBox.disable = false;
    MorningCheckBox.disable = false;
    var dateInput = document.querySelector("input#calendar_input");
    dateInput.value = `${this.innerHTML}/${month}/${year}`;
    return await database.ref(`BOOKER/Tegutwo Culture/${year}/${month}/${this.innerHTML}`).on("value", (snapshot) => {
        if (snapshot.exists()) {
            if (Object.keys(snapshot.val())[0] == "Evening") {
                var data = Object.keys(snapshot.val());
               
                EveningChoice.style.display = "none";
                MorningCheckBox.checked = true;
            } else if (Object.keys(snapshot.val())[0] == "Morning") {
                var data = Object.keys(snapshot.val());
               
                MorningChoice.style.display = "none";
                EveningCheckBox.checked = true;
            }
        }


    });
}
//Validate form data
var errors = [];
var nameInput = document.querySelector("input.personalDetails_name");
var numberInput = document.querySelector("input.personalDetails_number");
var locationInput = document.querySelector("input.personalDetails_location");
["input"].forEach(event=>{
    nameInput.addEventListener(event, (e) => {
        checkInputLengthValidity(nameInput, 3, 30, e);
    });
    numberInput.addEventListener(event, (e) => {
        checkInputLengthValidity(numberInput, 9, 17, e);
    })
    locationInput.addEventListener(event, (e) => {
        checkInputLengthValidity(locationInput, 3, 30, e);
    })
})


function isEmpty(str) {
    //
    if (str == null || str == undefined || str.trim().length < 1) {
        return true;
    }
    return false;
}

function isValidEmail(str) {
    let exp = /^[a-z]+.+\@+.+.com/gi;
    if (exp.test(str.trim())) {
    
        return true;
    }
    return false;
}

function isAboveMinLength(Length, strLength) {
    if (strLength < Length) {
        return false;
    }
    return true;
}

function isBelowMaxLength(Length, strLength) {
    //
    if (strLength > Length) {
        return false;
    }
    return true;
}

function checkInputLengthValidity(input, MinLength, MaxLength, e) {
    //checkLengthValidity flaws
    //Doesnt detect when option is picked from a list of options
    //When an input has an error other inputs dont show their errors
    var str = input.value;
    str = str.trim();
    var length = str.length;
    var exp = /[a-z]{2}/i;
    if (!exp.test(e.key)) {
        length++;
    } else if (e.key == "Backspace") {
        length--;
    } else {
        //Nothing 
    }
    //
    var errorList = document.createElement("ul");
    errorList.classList.add(`errors_${input.id}`);
    if (!document.querySelector(`ul.errors_${input.id}`)) {
        input.insertAdjacentElement("afterend", errorList);
    }

     if (!isAboveMinLength(MinLength, length)) {
        
        var liError2 = document.createElement("li");
        liError2.classList.add("MinLength");
        liError2.innerHTML = `Input cannot be Empty and must be ${MinLength} or more characters`;
        errorList.appendChild(liError2);
    } else {
        var el = document.querySelector("li.MinLength");
        if (el)
            el.parentNode.removeChild(el);
    }

    if (!isBelowMaxLength(MaxLength, length)) {
        var liError3 = document.createElement("li");
        liError3.classList.add("MaxLength");
        liError3.innerHTML = `Input cannot be more than ${MaxLength} characters`;
        errorList.appendChild(liError3);
    } else {
        var el = document.querySelector("li.MaxLength");
        if (el)
            el.parentNode.removeChild(el);
    }
    //check for errors
    //add error message when input doesnt meet specifications
    //Change box shadow color to blue when input is valid
    if (document.querySelector(`ul.errors_${input.id}`).childNodes.length < 1) {
        document.querySelector(`ul.errors_${input.id}`).parentNode.removeChild(document.querySelector(`ul.errors_${input.id}`));
    }
}
var form = document.querySelector("form.Details");
var paymentForm = document.querySelector("form.payment");


// form.addEventListener("onSubmit",onSubmit);

form.onsubmit = ()=>{
    var paymentPage = document.querySelector("div#payment");
    paymentPage.style.display = "flex";
    var forData = new FormData(form);
    for(var elem of forData){
    }
    window.location.href= "#payment";
    paymentPage.focus({preventScroll:false});
    return false;
}
paymentForm.onsubmit = (event)=>{
//  var formData = new FormData(paymentForm);
//  for(var elem of formData){
     
//  }
//  fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',{
// 	method: 'POST',
// 	body: JSON.stringify({
//         "BusinessShortCode": "174379",
//         "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjAwNTIxMDAwNjAw",
//         "Timestamp": "20200521000600",
//         "TransactionType": "CustomerPayBillOnline",
//         "Amount": "4",
//         "PartyA": `${formData["pesa_number"]}`,
//         "PartyB": "174379",
//         "PhoneNumber": `${formData["pesa_number"]}`,
//         "CallBackURL": "https://unlucky-vampirebat-80.loca.lt",
//         "AccountReference": "test",
//         "TransactionDesc": "test"
// 	}),
// 	headers: {
// 		'Content-type': 'application/json; charset=UTF-8',
//         'Authorization':"Bearer unRO1xdtDyHW6FQ1kkYKDlcbHCPY"
// 	}
// }).then((response)=>{
   
// })
//  event.preventDefault();

// return false;
}
 
["keydown" ,"paste" ,"focus" ,"mousedown"].forEach(elem=>{
    calendarInput.addEventListener(elem,(event)=>{
        if(event.keyCode != 9)
        event.preventDefault();
    })
})

var hair_type = document.querySelectorAll(".hair_type");
var hair_length = document.querySelectorAll(".hair_length")
    hair_type.forEach(el=>{
        el.addEventListener("change",(event)=>{
          
            let value = event.target.defaultValue;
                hair_length.forEach(le =>{  
                    if(value== "Boho Locs" && le.value== "Mid-Back"){

                        le.disabled = true;       
                    }
                    else{
                        le.disabled = false;
                    }
                })
            

        })
    })
    hair_type.forEach(el=>{
        if(el.value=="Boho Locs" && el.checked == true){
            hair_length.forEach(le =>{  
                if(le.value== "Mid-Back"){
                    le.disabled = true;       
                }
            })
        }
    })