/////////////Start//////////////
var base = 0;
var loggedInUser = [];
var loggedInFakeUser = ["fake","fake"];

init();

   
function init() {
    eventListeners(); 
    checkedOption();
    //baseQuestions();
    //html();
}

function html() {
    var result = Math.round(personBaseValue()*100)/100;
    document.getElementById("id00").innerHTML = "Water Project";
    document.getElementById("id01").innerHTML = "<p>Hello " + personObj.name + "! You are " + personObj.height + " cm tall and weigh " + personObj.weight + " kg.</p>";
    document.getElementById("id02").innerHTML = "<p>You currently need to drink " + result + " litres of water per day.</p>";
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/////////////////Water Section//////////////
function baseQuestions() {
   var f1,f2,f3;
   f1 = document.getElementById('id04');
   f2 = document.getElementById('id05');
   f3 = document.getElementById('id06');

    f1.style.display = "none";
    f2.style.display = "none";
    f3.style.display = "none";
    
    var username, weight, height, fitness, disease, person;
    username = loggedInUser[0];
    weight = prompt("How much do you weigh in kilograms?");
    height = prompt("How tall are you in cm?");
    fitness = prompt("How many hours of sport do you generally do a week?");   
    disease = prompt("Do you have any diseases that you take medicine regularly for? y/n");
    
    function person(weight, height, fitness, disease) {
        return {
            weight: weight,
            height: height,
            fitness: fitness,
            disease: disease
        };
    }
    f1.style.display = "block";
    f2.style.display = "block";
    f3.style.display = "block";
        
        var quesValues = {username:username, weight:weight, height:height, fitness:fitness, disease:disease}
        
            $.ajax({
                data: quesValues,
                method: 'POST',
                url: "includes/questions.php",
            }).done(function (response) {
                console.log(response);
                document.getElementById('id08').innerHTML = response;
                document.getElementById('answerQues').value = "Change Answers";
            });
    
    return personObj = person(weight, height, fitness, disease);
}

function personBaseValue(user) {
    var newBase, weightManR, weightFemR, heightManR, heightFemR, weightHeightMan, weightHeightFem, diseaseR;
    // change this so that this does something
    weightManR = user[0].weight/82;
    weightFemR = user[0].weight/67;
    heightManR = user[0].height/177;
    heightFemR = user[0].height/163;
    
    weightHeightMan = (weightManR + heightManR) / 2;
    weightHeightFem = (weightFemR + heightFemR) / 2;
    
    if (user[0].gender == "1"){
        newBase = 3.7;
    } else if (user[0].gender == "2"){
        newBase = 2.7;
    } else {
        newBase = 3.2;
    }
    
    if (user[0].disease == "y"){
        diseaseR = 0;
    } else {
        diseaseR = 1;
    }
    
    if (user[0].gender == "1"){
        var newBase = newBase * (weightHeightMan * diseaseR);
    } else {
        var newBase = newBase * (weightHeightFem * diseaseR);
    }
    
    return newBase;
}





/////////////Food Section//////////////////
var foodListToday = [];
var drinkListToday = [];
var alcoholListToday = [];

function consumableItem(food, amount, cooking, drink, volume, alcohol, water, sugar) {
    return {
            food: food,
            amount: amount,
            cooking: cooking,
            drink: drink,
            volume: volume,
            alcohol: alcohol,
            water: water,
            sugar: sugar
        };
}

function addConsumableItem(){
    var food = document.getElementById('food').value;
    var amount = document.getElementById('amount').value;
    var cooking = document.getElementById('cooking').value;
    var drink = document.getElementById('drink').value;  /////// when adding drink option, it puts values into food amount cooking
    var volume = document.getElementById('volume').value;
    var alcohol = document.getElementById('alcohol').value;

    if (food !== null && food !== '' && amount !== null && amount !== '' && cooking !== null && cooking !== ''){
            foodListToday.push(consumableItem(food, amount, cooking));
            document.getElementById("addFood").reset();
            addFoodItem();
    } else if (drink !== null && drink !== '' && volume !== null && volume !== '' && alcohol !== null && alcohol !== ''){
            drinkListToday.push(consumableItem(0,0,0, drink, volume, alcohol));
            document.getElementById("addDrink").reset();
            addDrinkItem();
    } else {
            document.getElementById("addFood").reset();
            document.getElementById("addDrink").reset();
    }
}



//////////////Excercise/////////////////////
var excerciseListToday = [];

function excerciseItem(excercise, duration, intensity, outside) {
    return {
            excercise: excercise,
            duration: duration,
            intensity: intensity,
            outside: outside
        };

}

function addExcercise(){
    var excercise = document.getElementById('excercise').value;
    var duration = document.getElementById('duration').value;
    var intensity = document.getElementById('intensity').value;
    var outside = document.getElementById('outside').value;
        if (excercise !== null && excercise !== '' && duration !== null && duration !== '' && intensity !== null && intensity !== '' && outside !== null && outside !== ''){
            excerciseListToday.push(excerciseItem(excercise, duration, intensity, outside));
            addExcerciseItem();
            document.getElementById("addExc").reset();
    } else {
            document.getElementById("addExc").reset();
    }

}

function excerciseWaterValue(){
    var excercise, duration, intensity, outside, additionalWater, weather; 
        weather = 0;
        additionalWater = 0;
    
        for (x = 0; x < excerciseListToday.length; x++) {
            if (excerciseListToday[x].outside == false) {
                additionalWater = additionalWater + ((duration * intensity)/500);
              } else {
                additionalWater = additionalWater + weather + ((excerciseListToday[x].duration * excerciseListToday[x].intensity)/500); 
              } 
        }
    return additionalWater;
}



//////////////Adding items to Website Graphs/////////////////////

function addFoodItem(){
    var link = "<p> Name Amount Cooked </p><br>";    
    foodListToday.forEach(function(element){
        link = link + "<p>" + element.food + " " + element.amount + " grams and " + element.cooking + "</p>"; 
    });
    document.getElementById("graphFood").innerHTML = link;
}

function addDrinkItem(){
    var link = "<p> Type Volume Alcohol </p><br>";    
    drinkListToday.forEach(function(element){
        link = link + "<p>" + element.drink + " " + element.volume + " ml and " + element.alcohol + "% </p>"; 
    });
    document.getElementById("graphDrink").innerHTML = link;   
}


function addExcerciseItem(){
    var link = "<p> Type Intensity Duration OI</p><br>";    
        excerciseListToday.forEach(function(element){
            link = link + "<p>" + element.excercise + " " + element.duration + " of " + element.intensity + " " + element.outside + "</p>"; 
    });
    document.getElementById("graphExcercise").innerHTML = link;
}




///////////////// Water Values/////////////////

function consumedWaterValue(){
    var food, amount, cooking, alcohol, water, sugar; 
        weather = 0;
        additionalWater = 0;
    
        for (x = 0; x < excerciseListToday.length; x++) {
            if (excerciseListToday[x].outside == false) {
                additionalWater = additionalWater + ((duration * intensity)/500);
              } else {
                additionalWater = additionalWater + weather + ((excerciseListToday[x].duration * excerciseListToday[x].intensity)/500); 
              } 
        }
    return additionalWater;
}


function objectWaterValue(){
    var totalList = foodListToday + drinkListToday + alcoholListToday + excerciseListToday;
        for (x = 0; x < foodListToday.length; x++) {
          console.log(foodListToday[x]);
      }
      
}

function calculate(){
      var result = excerciseWaterValue();
      document.getElementById("id03").innerHTML = "<p>Due to " + excerciseListToday[0].excercise + " and " + excerciseListToday[1].excercise + " you need to drink " + result + " extra litres of water today.</p>";
}


    
//////////////Event listeners//////////////////////

    
function eventListeners() {
    var date = new Date().toISOString().slice(0, 10);
    
    document.getElementById('registerBtn').addEventListener('click', function (event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var last = document.getElementById('last').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var email = document.getElementById('email').value;
        var month = document.getElementById('month').value;
        var day = document.getElementById('day').value;
        var year = document.getElementById('year').value;
        var gender = document.getElementById('gender').value;
        var regValues = {name:name, last:last, username:username, password:password, email:email, month:month, day:day, year:year, gender:gender}
        
            $.ajax({
                data: regValues,
                method: 'POST',
                url: "includes/register.php",
                //contentType:'application/json',
                //data: JSON.stringify(drinkValues),
                //dataType:'json',
            }).done(function (response) {
                registerToggle();
                console.log(response);
                document.getElementById('id07').innerHTML = response;
                document.getElementById('id08').innerHTML = "Please log in to continue:";
                // use json to add elements to Food etc
            });
        });
    
	document.getElementById('returnUserInfo').addEventListener('click', function (event) {
        var username = loggedInUser[0];
        // using jquery https://api.jquery.com/serialize/ can send the form data from within javascript
        var userValue = {username:username}
        
        $.ajax({
            data: userValue,
	        method: 'POST',
	        url: 'includes/returnUser.php',
        }).done(function (response) {
            var user = JSON.parse(response);
            var name = capitalizeFirstLetter(user[0].name);
            var waterValue = Math.round((personBaseValue(user)*1000));
            var time = new Date().toLocaleDateString();
            document.getElementById('id01').innerHTML = "WaterWorld: " + time + " " + name;
            document.getElementById('id003').innerHTML = "You are " + user[0].height + "cms tall and weigh " + user[0].weight + "kgs" + " with " + user[0].fitness + " hours of fitness per week you currently need " + waterValue + "ml of water per day.";
        });
	});
    
    document.getElementById('loginButton').addEventListener('click', function (event) {
        event.preventDefault();
        
        var username = document.getElementById('loginUsername').value;
        var password = document.getElementById('loginPassword').value;
        var values = {username:username, password:password}
        //var myJSON = JSON.stringify(values);
        
            $.ajax({
                data:values,
                //data: {myData:myJSON},
                //dataType: "json",
                method: 'POST',
                url: "includes/checkLogin.php",
            }).done(function (response) {
                console.log(response);
                document.getElementById('id07').innerHTML = response;
                    if (response=="Login successful") {
                        loggedInUser.push(username);  
                        loggedInUser.push(password);  
                    } else {
                        loggedInUser=[];
                    }
                checkQuestions();
                returnData();
            });
        });
    
    document.getElementById('answerQues').addEventListener('click', function (event) {
        event.preventDefault();
            document.getElementById('id04').style.display = "none";
            document.getElementById('id05').style.display = "none";
            document.getElementById('id06').style.display = "none";
            document.getElementById('answerQues').style.display = "none";
            document.getElementById('returnGraph').style.display = "block";

        baseQuestions();   
        });
    
    document.getElementById('returnGraph').addEventListener('click', function (event) {
        event.preventDefault();
            document.getElementById('id04').style.display = "block";
            document.getElementById('id05').style.display = "block";
            document.getElementById('id06').style.display = "block";
            document.getElementById('answerQues').style.display = "block";
            document.getElementById('returnGraph').style.display = "none";
         });
    
    document.getElementById('drinkBtn').addEventListener('click', function (event) {
        event.preventDefault();
        
        var username = loggedInUser[0];
        var drink = document.getElementById('drink').value;
        var volume = document.getElementById('volume').value;
        var alcohol = document.getElementById('alcohol').value;
        
        var drinkValues = {username:username, drink:drink, volume:volume, alcohol:alcohol, date:date}
        
            $.ajax({
                data: drinkValues,
                method: 'POST',
                url: "includes/drink.php",
                //contentType:'application/json',
                //data: JSON.stringify(drinkValues),
                //dataType:'json',
            }).done(function (response) {
                console.log(response);
                addConsumableItem();
            });
        });
    
    document.getElementById('foodBtn').addEventListener('click', function (event) {
        event.preventDefault();
        
        var username = loggedInUser[0];
        var food = document.getElementById('food').value;
        var amount = document.getElementById('amount').value;
        var cooking = document.getElementById('cooking').value;
        
        var foodValues = {username:username, food:food, amount:amount, cooking:cooking, date:date}
        
            $.ajax({
                data: foodValues,
                method: 'POST',
                url: "includes/food.php",
                //contentType:'application/json',
                //data: JSON.stringify(drinkValues),
                //dataType:'json',
            }).done(function (response) {
                console.log(response);
                addConsumableItem();
            });
        });
    
    document.getElementById('excerciseBtn').addEventListener('click', function (event) {
        event.preventDefault();
        
        var username = loggedInUser[0];
        var excercise = document.getElementById('excercise').value;
        var duration = document.getElementById('duration').value;
        var intensity = document.getElementById('intensity').value;
        var outside = document.getElementById('outside').value;
        
        var excValues = {username:username, excercise:excercise, duration:duration, intensity:intensity, outside:outside, date:date}
        
            $.ajax({
                data: excValues,
                method: 'POST',
                url: "includes/excercise.php",
                //contentType:'application/json',
                //data: JSON.stringify(drinkValues),
                //dataType:'json',
            }).done(function (response) {
                console.log(response);
                addExcercise();
            });
        });
    
    document.getElementById('logoutbutton').addEventListener('click', function (event) {
        event.preventDefault();
        loggedInUser = [];
           $.ajax({
                data: loggedInUser,
                method: 'POST',
                url: "includes/logOut.php",
            });

        window.location.href = 'http://localhost/Water-Project-1/waterlogged.html'
        });
    
}

//////////////Retrieving Information For User//////////////////////

function returnData() {
    //event.preventDefault();
    var username = loggedInUser[0];
    var userValue = {username:username}
    
    $.ajax({
                data: userValue,
                method: 'POST',
                url: "includes/returnData.php",
            }).done(function (response) {
                console.log(response); //JSON
                var data = JSON.parse(response);
                console.log(data); 
                // loop through this retrieved JSON to add buttons for dates which are available for the person to check their history
            });    
}

function checkQuestions() {
        document.getElementById('frmLogin').style.display = "none";
        document.getElementById('id09').style.display = "block";
        document.getElementById('logoutbutton').style.display = "block";
        document.getElementById('registerToggle').style.display = "none";
        var username = loggedInUser[0];
        var userValue = {username:username}
    
    $.ajax({
                data:userValue,
                method: 'POST',
                url: "includes/returnAnswers.php",
            }).done(function (response) {
                var user = JSON.parse(response);
        
                if (user[0].weight != "0") {
                    document.getElementById('id08').innerHTML = "Previously answered questions:";
                    document.getElementById('checkUserData').style.display = "block";
                    document.getElementById('answerQues').style.display = "block";
                } else {
                    document.getElementById('id08').innerHTML = "Please answer a few questions:";
                    document.getElementById('answerQues').style.display = "block";
                    document.getElementById('checkUserData').style.display = "block";
                    document.getElementById('id09').innerHTML = "Dates";
                }
            });
}

function checkedOption() {  
    if (document.getElementById("frm0Food").checked == true) { 
            document.getElementById("form1").style.display = "block";
            document.getElementById("form2").style.display = "none";
            document.getElementById("form3").style.display = "none";
    } else if (document.getElementById("frm0Drink").checked == true){
            document.getElementById("form1").style.display = "none";
            document.getElementById("form2").style.display = "none";
            document.getElementById("form3").style.display = "block";
    } else {
            document.getElementById("form1").style.display = "none";
            document.getElementById("form2").style.display = "block";
            document.getElementById("form3").style.display = "none";
    }
}

function registerToggle() {
    var z = document.getElementById("login");
    var y = document.getElementById("register");
    var x = document.getElementById("registerToggle")
    if (z.style.display == "none") {
        z.style.display = "block";
        y.style.display = "none";
        x.value = "Register";
    } else {
        z.style.display = "none";
        y.style.display = "block";
        x.value = "Login";
    }
}

