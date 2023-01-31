const map = new Map();
const userAction = async () => {
    for (const key of map.keys()) {
        let searchList = document.getElementById("previousSearch");
        let tag = document.createElement("div");
        tag.href = "";
    
        tag.className = "previousSearch";
        tag.innerHTML = localStorage.getItem("lastname");
        searchList.appendChild(tag);
        console.log(key);
      }
  }
  async function validateForm() {
    let city = document.forms["myform"]["city"].value;
    if (city != "") {
        document.getElementById("weatherList").innerHTML = "";
        let key = "e445f7988428137d6a9dee589f20291a";
        let url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city;
        url+= "&units=imperial&appid=";
        url+=key;
        const response = await fetch(url);
        setTimeout(3000);
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        let weatherArray = [];
        let tempList = myJson.list;
        let currentDay = 0 ;
        for(let i=0; i< tempList.length; i+=3) {
            let timeStamp = tempList[i].dt;
            let date = new Date(0);
            date.setUTCSeconds(timeStamp);
            if( i == 0 || date.getDate() > currentDay) {
                let weather = {};
                weather.date = date.toLocaleDateString();
                weather.temp = tempList[i].main.temp;
                weather.wind = tempList[i].wind.speed;
                weather.humidity = tempList[i].main.humidity;
                weather.icon = tempList[i].weather[0].icon;
                weather.description = tempList[i].weather[0].description;
                weatherArray.push(weather);
                currentDay = date.getDate();
                if(i!==0) {
                    let currentList = document.getElementById("weatherList");
                    let tag2 = document.createElement("div");
                    let image = document.createElement("img");
           
                    image.src = "http://openweathermap.org/img/wn/"+weather.icon + ".png";
                    

                    tag2.className = "tile";
                    let h = "<h5>" + date.toLocaleDateString() +"</h5>";
                    h+= "<h5>Temp: "+ weather.temp + "°F"+ "</h5>";
                    h+= "<h5>Wind: " + weather.wind + " MPH"+ "</h5>";
                    h+= "<h5>Humidity: " + weather.humidity + " %</h5>";
                    tag2.innerHTML = h;
                    tag2.appendChild(image);
                    currentList.appendChild(tag2);
                    
                } else {
                    document.getElementById("title").innerHTML = city+ " (" + date.toLocaleDateString()+ ")";
                    document.getElementById("temp").innerHTML = "Temp: " + weather.temp + "°F";
                    document.getElementById("wind").innerHTML = "Wind: " + weather.wind +" MPH";
                    document.getElementById("humidity").innerHTML = "Humidity: " + weather.humidity + " %";
                    document.getElementById("image1").src = "http://openweathermap.org/img/wn/"+weather.icon + ".png";
                }
                
            }
        }
        let searchList = document.getElementById("previousSearch");
        let tag = document.createElement("button");
        tag.href = "" ;

        tag.className = "previousSearch";
        tag.id = city;
        tag.innerHTML = city;
        
        searchList.prepend(tag);

        localStorage.setItem(city, JSON.stringify(weatherArray));
        document.forms["myform"]["city"].value = "";
        document.getElementById(city).onclick = function(){
            document.getElementById("weatherList").innerHTML = "";
            weatherArray = JSON.parse(localStorage.getItem(city));
            console.log(JSON.parse(localStorage.getItem(city)));
            for(let i=0; i<weatherArray.length;i++) {
                let weather = weatherArray[i];
                let timeStamp = weather.dt;
                let date = new Date(0);
                date.setUTCSeconds(timeStamp);
               
                if(i!==0) {
                    let currentList = document.getElementById("weatherList");
                    let tag2 = document.createElement("div");
                    let image = document.createElement("img");
           
                    image.src = "http://openweathermap.org/img/wn/"+weather.icon + ".png";
                    

                    tag2.className = "tile";
                    let h = "<h5>" + weather.date +"</h5>";
                    h+= "<h5>Temp: "+ weather.temp + "°F"+ "</h5>";
                    h+= "<h5>Wind: " + weather.wind + " MPH"+ "</h5>";
                    h+= "<h5>Humidity: " + weather.humidity + " %</h5>";
                    tag2.innerHTML = h;
                    tag2.appendChild(image);
                    currentList.appendChild(tag2);
                } else {
                    document.getElementById("title").innerHTML = city+ " (" + weather.date+ ")";
                    document.getElementById("temp").innerHTML = "Temp: " + weather.temp + "°F";
                    document.getElementById("wind").innerHTML = "Wind: " + weather.wind +" MPH";
                    document.getElementById("humidity").innerHTML = "Humidity: " + weather.humidity + " %";
                    document.getElementById("image1").src = "http://openweathermap.org/img/wn/"+weather.icon + ".png";
                }
            }
        }
    }
  }
  
  
  userAction();
 // validateForm();