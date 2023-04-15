let curcity ="tokyo";
let units ="metric";

// selectors
// let city = document.querySelector(".wcity");
let wdaytime = document.querySelector(".wdaytime");
// let wforcast = document.querySelector('.wforcast');
// let wtemp = document.querySelector(".wtemp");
// let wminmax = document.querySelector(".wminmax")
// let wrealfeel = document.querySelector('.wrealfeel');
// let whumidity = document.querySelector('.whumidity');

let wwind = document.querySelector('.wwind');
let wpressure = document.querySelector('.wpressure');
let wicon = document.querySelector(".wicon");

//search
document.querySelector(".weather__search").addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform");
    // prevent default action
    e.preventDefault();
    // change current city
    curcity = search.value;
    // get weather forecast 
    getweather();
    // clear form
    search.value = ""
})

// convert country code to name
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

//daytime conversion
function convertTimeStamp(timestamp, timezone){
    const convertTimezone = timezone / 3600; // convert seconds to hours 

   const date = new Date(timestamp * 1000);
   
   const options = {
       weekday: "long",
       day: "numeric",
       month: "long",
       year: "numeric",
       hour: "numeric",
       minute: "numeric",
       timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
       hour24: true,
   }
   return date.toLocaleString("en-US", options)
  
}

function getweather(){
    const API_KEY='e9c2f00f5f5c1e30042f0219f43ec6ef'

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${curcity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {

    console.log(data)

    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`

    wdaytime.innerHTML = convertTimeStamp(data.dt, data.timezone);

    wforcast.innerHTML = `<p>${data.weather[0].main}`

    wtemp.innerHTML = `${data.main.temp.toFixed()}&#176`

    wminmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p> <p>Max: ${data.main.temp_max.toFixed()}&#176</p> `

   wrealfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`

   whumidity.innerHTML = `${data.main.humidity}%`

    wwind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}`

   wpressure.innerHTML = `${data.main.pressure} hPa`

   

   weather__icon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`

})
}

document.body.addEventListener('load',getweather())