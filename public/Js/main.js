const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const dataHide = document.querySelector(".middle_layer");
const temp = document.getElementById("temp");
const temp_realVal = document.getElementById("temp_realVal");

const minTemp = document.getElementById("minTemp");
const maxTemp = document.getElementById("maxTemp");
const atm = document.getElementById("atm");
const hum = document.getElementById("hum");

const key = document.getElementById("key");
const weather_api_key = key.innerText;
console.log(weather_api_key);
const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  // console.log(cityVal);
  if (cityVal === "") {
    city_name.innerText = `Please enter the City name before searching`;
    dataHide.classList.add("data_hide");
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${weather_api_key}`;
      const response = await fetch(url);
      //   console.log(response);
      const data = await response.json();
      // console.log(data);
      const arrData = [data];
      city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
      let tempCelcius = (arrData[0].main.temp - 273.15).toFixed(2);
      temp_realVal.innerText = tempCelcius;
      temp_status.innerText = arrData[0].weather[0].main;
      let minTemp1 = (arrData[0].main.temp_min - 273.15).toFixed(2);
      let maxTemp1 = (arrData[0].main.temp_max - 273.15).toFixed(2);
      let pressure1 = arrData[0].main.pressure;
      let humidity1 = arrData[0].main.humidity;
      minTemp.innerText = minTemp1;
      maxTemp.innerText = maxTemp1;
      atm.innerText = pressure1;
      hum.innerText = humidity1;

      const tempMood = arrData[0].weather[0].main;
      if (tempMood == "clear") {
        temp_status.innerHTML =
          "<i class='fas fa-sun  fa-9x ' style='color:white;' ></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud  fa-9x ' style='color:white;' ></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud-rain  fa-9x ' style='color:white;' ></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-sun  fa-9x ' style='color:white;' ></i>";
      }
      dataHide.classList.remove("data_hide");
    } catch {
      city_name.innerText = "Please enter valid city name";
      dataHide.classList.add("data_hide");
    }
  }
};
submitBtn.addEventListener("click", getInfo);
