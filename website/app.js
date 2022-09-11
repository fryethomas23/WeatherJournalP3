/* Global Variables */
let zipCode = "28052";
const countryCode = "us";
const openWeatherAPIKey = "4f88d26e33288b267bde8380a0f929cc";
const openWeatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather`;
const apiUrl = "http://127.0.0.1:3000/";
const generateButton = document.getElementById("generate");

// Create a new date instance dynamically with JS
const getCurrentDate = () => {
  let d = new Date();
  let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
  return newDate;
};

const getTemperatureData = async () => {
  const zipCode = document.getElementById("zip").value || "28052";
  const response = await fetch(
    `${openWeatherAPIUrl}?zip=${zipCode},${countryCode}&appid=${openWeatherAPIKey}&units=imperial`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data.main.temp;
};

const getUserResponse = () => {
  const feelings = document.getElementById("feelings");
  return feelings.value;
};

const storeData = async (body) => {
  const response = await fetch(apiUrl + "data", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

const getStoredData = async () => {
  const response = await fetch(apiUrl + "data", {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

generateButton.addEventListener("click", () => {
  getTemperatureData()
    .then((temperature) => {
      return storeData({
        temperature: temperature,
        date: getCurrentDate(),
        userResponse: getUserResponse(),
      });
    })
    .then(() => {
      return getStoredData();
    })
    .then((data) => {
      document.getElementById("date").innerHTML = data.date;
      document.getElementById("temp").innerHTML =
        Math.round(allData.temp) + "degrees";
      document.getElementById("content").innerHTML = data.userResponse;
    })
    .catch((err) => {
      console.log(err);
    });
});
