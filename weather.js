const API_KEY = `e9c2f00f5f5c1e30042f0219f43ec6ef`

// const IMG_URL =   `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`

const form = document.querySelector(".weather__search")
const btn = document.querySelector('.btn')
const search = document.querySelector(".weather__searchform")
const wtemp = document.querySelector(".wtemp")
const wforcast = document.querySelector('.wforcast');
const wcity = document.querySelector(".wcity");
const wminmax = document.querySelector(".wminmax")
const wrealfeel = document.querySelector('.wrealfeel')
const whumidity = document.querySelector('.whumidity')
const wwind = document.querySelector('.wwind')
const wpressure = document.querySelector('.wpressure')
const wdaytime = document.querySelector(".wdaytime")
const wicon = document.querySelector('.wicon')

const winfo = document.querySelector('.winfo') 

//for displaying box with the click
btn.addEventListener("click",function(value){
    if(winfo.style.display === 'block' &&  getweather(search.value)=== true){
        winfo.style.display = 'none';
    }
    else{
        winfo.style.display = 'block';
    }
})

//for getting the search bar submit
form.addEventListener(
    "submit",
    function(event){
        getweather(search.value)
        event.preventDefault();

       
        
    }
)



//daytime conversion
function convertTimeStamp(timestamp){
    

   const date = new Date(timestamp * 1000);
   
   const options = {
       weekday: "long",
       day: "numeric",
       month: "long",
       year: "numeric",
       hour: "numeric",
       minute: "numeric",
       hour24: true,
    }
    return date.toLocaleString("en-US", options)
   
 }
// convert country code to name
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

//for geeting the search response
const getweather = async(city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    
    const response = await  fetch(url);
    const data = await response.json()
    return showweather(data)
   
 }

 //for displaying the search response
const showweather = (data) => {
console.log(data)
    wtemp.innerHTML =`<h4>${data.main.temp.toFixed()}&#176</h4>`

    wforcast.innerHTML =`<p>${data.weather[0].main}</p>`

    wcity.innerHTML = `<h3>${data.name}, ${convertCountryCode(data.sys.country)}</h3>`

    wminmax.innerHTML = `<p>Min : ${data.main.temp_min.toFixed()}&#176</p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>Max : ${data.main.temp_max.toFixed()}&#176</p> `

    wrealfeel.innerHTML =`${data.main.feels_like.toFixed()}&#176`

    whumidity.innerHTML = `${data.main.humidity}%`

    wwind.innerHTML = `${data.wind.speed}m/s`

    wpressure.innerHTML = `${data.main.pressure} hPa`

    wdaytime.innerHTML = convertTimeStamp(data.dt, data.timezone)

    wicon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`

    

    

}
