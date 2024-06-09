const wheatherForm =document.querySelector(".weatherSearch");
const cityInput =document.querySelector(".cityInput");
const card= document.querySelector('.card');
const apiKey="7fb5200b763d7288c83ced85d9e5c9aa";




wheatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    const city = cityInput.value;
    
    if(city){
        try{
            const wheatherData = await getWeatherData(city);
            displayWeatherInfo(wheatherData);
            
        }
        catch(error){
            displayError(error);
        }
      
        
    }else{
        displayError('city not found');
    }

});


async function getWeatherData(city){
    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error('could not fetch data')
    }
    return response.json();
    
}
function displayWeatherInfo(Data){
    const {
        name: city,
        main: {temp, humidity},
        weather: [{description, id}] } = Data;
        card.textContent="";
        card.style.display="flex";




          const cityDisplay = document.createElement("h1");
          const tempDisplay = document.createElement("p");
          const humidityDisplay = document.createElement("p");
          const descDisplay = document.createElement("p");
          const emojiDisplay = document.createElement("p");
          
          cityDisplay.textContent = city;
          tempDisplay.textContent =`${(temp -273.15).toFixed(1)}°C`;
          humidityDisplay.textContent=`  humidity : ${humidity}%`;
          descDisplay.textContent = description;
          emojiDisplay.textContent =getWeatherEmoji(id);
         
          cityDisplay.classList.add("cityDisplay");
          tempDisplay.classList.add("tempDisplay");
          humidityDisplay.classList.add("humidityDisplay");
          descDisplay.classList.add("descDisplay");
          emojiDisplay.classList.add("emojiDisplay");

          card.appendChild(cityDisplay);
          card.appendChild(tempDisplay);
          card.appendChild(humidityDisplay);
          card.appendChild(descDisplay);
          card.appendChild(emojiDisplay);
}


function getWeatherEmoji(weatherId){

    switch(true){
        case(weatherId >=200 && weatherId < 300):
        return "🌩";
        case(weatherId >=300 && weatherId < 400):
        return "🌧";
        case(weatherId >=500 && weatherId < 600):
        return "🌧";
        case(weatherId >=600 && weatherId < 700):
        return "❄";
        case(weatherId >=700 && weatherId < 800):
        return "🌫";
        case(weatherId===800):
        return "🌞"
        case(weatherId>=801 && weatherId<810):
        return "☁"
        default:
            return "🎁"

        
        
        





    }

}
function displayError(message){
    const errorDisplay =document.createElement('p');
    errorDisplay.textContent= message ;
    errorDisplay.classList.add("errorDisplay");
    card.textContent="";
    card.style.display ="flex";
    card.appendChild(errorDisplay);


}