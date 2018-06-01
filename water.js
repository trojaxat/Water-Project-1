console.log("Git Test"); /// has this worked?

/////////////Start//////////////
var base = 0;
init();

function init(){
    baseQuestions();
    html();
};

function html(){
    var result = Math.round(personBaseValue()*100)/100;
    document.getElementById("id00").innerHTML = "Water Project";
    document.getElementById("id01").innerHTML = "<p>Hello " + personObj.name + "! You are " + personObj.height + " cm tall and weigh " + personObj.weight + " kg.</p>";
    document.getElementById("id02").innerHTML = "<p>You currently need to drink " + result + " litres of water per day.</p>";
};



/////////////////Water Section//////////////
function baseQuestions(){
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
};

function personBaseValue(){
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
};





/////////////Food Section//////////////////
var foodListToday = [];
var drinkListToday = [];
var alcoholListToday = [];

foodListToday.push(consumableItem("apple", 100, "raw", 0, 20, 10));

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
};

function addConsumableItem(){
    var food = document.getElementById('Food').value;
    var amount = document.getElementById('Amount').value;
    var cooking = document.getElementById('Cooking').value;
    var drink = document.getElementById('Drink').value;  /////// when adding drink option, it puts values into food amount cooking
    var volume = document.getElementById('Volume').value;
    var alcohol = document.getElementById('Alcohol').value;

    if (food !== null && food !== '' && amount !== null && amount !== '' && cooking !== null && cooking !== ''){
            foodListToday.push(consumableItem(food, amount, cooking));
            document.getElementById("frm1").reset();
            addFoodItem();
    } else if (drink !== null && drink !== '' && volume !== null && volume !== '' && alcohol !== null && alcohol !== ''){
            drinkListToday.push(consumableItem(0,0,0, drink, volume, alcohol));
            document.getElementById("frm3").reset();
            addDrinkItem();
    } else {
            document.getElementById("frm1").reset();
            document.getElementById("frm3").reset();
    }
};



//////////////Excercise/////////////////////
var excerciseListToday = [];
excerciseListToday.push(excerciseItem("climbing", 100, 4, true));

function excerciseItem(excercise, duration, intensity, outside) {
    return {
            excercise: excercise,
            duration: duration,
            intensity: intensity,
            outside: outside
        };

};

function addExcerciseItem(){
    var excercise = document.getElementById('Excercise').value;
    var duration = document.getElementById('Duration').value;
    var intensity = document.getElementById('Intensity').value;
    var outside = document.getElementById('Outside').value;
        if (excercise !== null && excercise !== '' && duration !== null && duration !== '' && intensity !== null && intensity !== '' && outside !== null && outside !== ''){
            excerciseListToday.push(excerciseItem(excercise, duration, intensity, outside));
            document.getElementById("frm2").reset();
    } else {
            document.getElementById("frm2").reset();
    }

};

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
};



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
};

function objectWaterValue(){
    var totalList = foodListToday + drinkListToday + alcoholListToday + excerciseListToday;
        for (x = 0; x < foodListToday.length; x++) {
          console.log(foodListToday[x]);
      }
      
};

function calculate(){
      var result = excerciseWaterValue();
      document.getElementById("id03").innerHTML = "<p>Due to " + excerciseListToday[0].excercise + " and " + excerciseListToday[1].excercise + " you need to drink " + result + " extra litres of water today.</p>";
};


    
//////////////UI interface//////////////////////
function addFoodItem(){
    var link;    
    foodListToday.forEach(function(element){
        link = link + "<p>" + element.food + " " + element.amount + " grams and " + element.cooking + "</p>"; 
    });
    document.getElementById("id04").innerHTML = link;
};

function addDrinkItem(){
    var link;    
    drinkListToday.forEach(function(element){
        link = link + "<p>" + element.drink + " " + element.volume + " milliliters and " + element.alcohol + "</p>"; 
    });
    document.getElementById("id05").innerHTML = link;   
};

function checkedOption(){  
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
};



////////////////Start////////////////////////////    to seperate second half
function init2(){
    var result = excerciseWaterValue();
    //document.getElementById("id03").innerHTML = "<p>Due to " + excerciseListToday[0].excercise + " you need to drink " + result + " extra litres of water today.</p>";// change this to scroll through sporting activities and say how much more water due to sport//
};

init2();

