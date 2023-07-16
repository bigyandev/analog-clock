let secondHand = document.querySelector("[data-sec]");
let minHand = document.querySelector("[data-min]");
let hourHand = document.querySelector("[data-hour]");
let countryName = [];
let btn = document.getElementsByTagName("button")[0];
let autocomplete = document.getElementsByClassName("autocomplete")[0];
let input = document.getElementById("input");
btn.addEventListener("click", fetchClock);
let buttonPressed = false;
function setTime() {
    let date = new Date();
    let hour = date.getHours() / 12;
    let min = date.getMinutes() / 60;
    let sec = date.getSeconds() / 60;
    convertDegree(secondHand, sec);
    convertDegree(minHand, min);
    convertDegree(hourHand,hour);
    
}
setTime();
setInterval(setTime, 1000);


function convertDegree(element, rotation) {
 element.style.setProperty("--rotation", rotation * 360);

}

//fetch country name 
function allCountryName() {
    fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
       console.log(data);
       countryName =  data.map((country,index) => {
        let name = country.name.common;
        let flag = country.flags.png;
        let continent = country.continents;
        return {name: name, flag: flag, continent: continent}

        
       })
     
    })

}
allCountryName();
input.addEventListener("input", checkName);
function checkName() {
    
    removeCountry();
    let value = input.value;
    console.log(input.value.length);
    if(value.length === 0) return
    
    let searchName = [];
    
   countryName.forEach((data) => {
   let name = data.name.toLowerCase();
   let flag = data.flag;
   let continent = data.continent[0];
   
   if(name.substr(0,value.length) === value.toLowerCase()) {
    searchName.push({name,flag,continent});
   }
})
   displayFunction(searchName);
   selectedValue();
  
}
   



function displayFunction(searchName) {
    
    
    let box = document.createElement("div");
    box.className = "design";
    box.id = "design"
    searchName.forEach((name) => {
    
    let list = document.createElement("li");
    list.innerHTML = name.name.toUpperCase();
    box.appendChild(list);
    
   
})
autocomplete.appendChild(box);

   
}

function removeCountry() {
let design = document.getElementById("design");
if(design)   design.remove();
  

}
//display input seleceted value
function selectedValue() {
    let list = document.getElementsByTagName("li");
    [...list].forEach((list) => {
        list.addEventListener("click", ()=> {
            input.value = list.innerHTML;
            
        })
       
    })
}
function fetchClock() {
    let value = input.value;
   countryName.forEach((country) => {
   if(country.name.toLowerCase() == value.toLowerCase()) {
    let name = country.name;
    let continent = country.continent[0];
    console.log(name,continent)
    fetch(`https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam`)
    .then((res) => res.json())
    .then((data) => console.log(data))
   
} 

   })
       
   
}
