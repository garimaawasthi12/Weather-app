
import React, { useState } from "react";

const App = () => {
  const [cityName, setCityName] = useState("");
  const [dataResponse, setDataResponse] = useState(null);
  const [error, setError] = useState("");

  const onInputset = (citynamedata) => {
    setCityName(citynamedata);
  };
  console.log(cityName);

  const hitAPI = async () => {
    setError(""); 
    setDataResponse(null); 
    try {
      const apiData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3703e0d753948890bfef7c2abf53e85f&units=metric`
      );
      const data = await apiData.json();

      if (data.cod === 200) {
        setDataResponse(data);
      } else {
        setError("City not found. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log("Error:", error);
    }
  };

  return (
    <div className="App flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-400 to-purple-400 text-white">
      <div className="text-5xl font-extrabold mt-10 mb-6">🌤 SkyCast</div>
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => onInputset(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 text-gray-700 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 w-80"
        />
        <button
          onClick={hitAPI}
          className="mt-4 p-3 w-32 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all duration-300"
        >
          SUBMIT
        </button>
      </div>

      {error && <div className="mt-4 text-red-600">{error}</div>}

      {dataResponse && (
        <div className="mt-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-gray-800">
          <div className="text-3xl font-semibold mb-6 text-center">
            {dataResponse.name}, {dataResponse.sys.country}
          </div>

          <div className="grid grid-cols-2 gap-6">
            
            <div className="bg-blue-50 shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="text-xl font-bold text-blue-600">Temperature</div>
              <div className="text-4xl font-semibold text-blue-900 mt-2">
                {dataResponse.main.temp}°C
              </div>
              <i className="fas fa-temperature-high text-5xl text-blue-500 mt-4"></i>
            </div>

            
            <div className="bg-yellow-50 shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="text-xl font-bold text-yellow-600">Pressure</div>
              <div className="text-4xl font-semibold text-yellow-900 mt-2">
                {dataResponse.main.pressure} hPa
              </div>
              <i className="fas fa-tachometer-alt text-5xl text-yellow-500 mt-4"></i>
            </div>

          
            <div className="bg-green-50 shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="text-xl font-bold text-green-600">Humidity</div>
              <div className="text-4xl font-semibold text-green-900 mt-2">
                {dataResponse.main.humidity}%
              </div>
              <i className="fas fa-tint text-5xl text-green-500 mt-4"></i>
            </div>


            <div className="bg-purple-50 shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="text-xl font-bold text-purple-600">Wind Speed</div>
              <div className="text-4xl font-semibold text-purple-900 mt-2">
                {dataResponse.wind.speed} m/s
              </div>
              <i className="fas fa-wind text-5xl text-purple-500 mt-4"></i>
            </div>
          </div>


          {dataResponse.weather && (
            <div className="mt-8 text-center text-lg">
              <span className="font-bold">Weather: </span>
              {dataResponse.weather[0].description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;


