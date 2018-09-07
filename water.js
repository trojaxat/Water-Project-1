/////////////Start//////////////
var base = 0;
var loggedInUser = ["dan","dan"];
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



/////////////////Water Section//////////////
function baseQuestions() {
    var name, gender, weight, height, fitness, disease, person;
    name = prompt("What is your name?")
    gender = prompt("Hello " + name + ", are you male or female? m/f");
    weight = prompt("How much do you weigh in kilograms?");
    height = prompt("How tall are you in cm?");
    fitness = prompt("How many hours of sport do you generally do a week?");   
    disease = prompt("Do you have any diseases that you take medicine regularly for? y/n");
    
    function person(name, gender, weight, height, fitness, disease) {
        return {
            name:  name,
            gender: gender,
            weight: weight,
            height: height,
            fitness: fitness,
            disease: disease
        };
    }
    return personObj = person(name, gender, weight, height, fitness, disease);
}

function personBaseValue() {
    var newBase, weightManR, weightFemR, heightManR, heightFemR, weightHeightMan, weightHeightFem, diseaseR;
    
    weightManR = personObj.weight/82;
    weightFemR = personObj.weight/67;
    heightManR = personObj.height/177;
    heightFemR = personObj.height/163;
    
    weightHeightMan = (weightManR + heightManR) / 2;
    weightHeightFem = (weightFemR + heightFemR) / 2;
    
    if (personObj.gender == "m"){
        newBase = 3.7;
    } else if (personObj.gender == "f"){
        newBase = 2.7;
    } else {
        newBase = 3.2;
    }
    
    if (personObj.disease == "y"){
        diseaseR = 0;
    } else {
        diseaseR = 1;
    }
    
    if (personObj.gender == "m"){
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
	document.getElementById('returnFood').addEventListener('click', function (event) {
        // event.preventDefault();  later I want to change this, so that it is sent with the form.
        // using jquery https://api.jquery.com/serialize/ can send the form data from within javascript
        $.ajax({
	        method: 'POST',
	        url: 'includes/ajaxTest.php',
        }).done(function (response) {
            console.log(response);

            document.getElementById('graphFood').innerHTML = response;
            var obj = JSON.parse(response);
            console.log(obj);
        });
	});
    
    document.getElementById('loginButton').addEventListener('click', function (event) {
        event.preventDefault();
        
        var username = document.getElementById('loginUsername').value;
        var password = document.getElementById('loginPassword').value;
        var values = {username:username, password:password}
        
            $.ajax({
                data: values,
                method: 'POST',
                url: "includes/checkLogin.php",
            }).done(function (response) {
                console.log(response);
                loggedInUser.push(username);  // this is added even if the login was unsuccessful
                loggedInUser.push(password);  // needs to be hashed or hidden  
                document.getElementById('id07').innerHTML = response;
            });
        });
    
    document.getElementById('drinkBtn').addEventListener('click', function (event) {
        event.preventDefault();
        
        var username = loggedInUser[0];
        var drink = document.getElementById('drink').value;
        var volume = document.getElementById('volume').value;
        var alcohol = document.getElementById('alcohol').value;
        var date = new Date().toISOString().slice(0, 10);

        
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
                // use json to add elements to Food etc
                addConsumableItem();
            });
        });
    
    document.getElementById('foodBtn').addEventListener('click', function (event) {
        event.preventDefault();
        
        var username = loggedInUser[0];
        var food = document.getElementById('food').value;
        var amount = document.getElementById('amount').value;
        var cooking = document.getElementById('cooking').value;
        var date = new Date().toISOString().slice(0, 10);

        
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
                // use json to add elements to Food etc
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
        var date = new Date().toISOString().slice(0, 10);

        
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
                // use json to add elements to Food etc
                addExcercise();
            });
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