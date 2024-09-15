// import React,{ useState } from 'react'

// const App = () => {
//   const [cityName,setCityName]= useState("");
//   const [dataResponse,setDataResponse]= useState(null);
//   const onInputset=(citynamedata) =>{
//     setCityName(citynamedata);
//   }
//   const hitAPI= async () =>{
//     try{
//       const apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3703e0d753948890bfef7c2abf53e85f`);
//       const data = await apiData.json();
//       // console.log(data);
//       setDataResponse(data.main);
//     }
//     catch{
//       console.log("Error")
//     }
//   };

//   return (
//     <div className='App flex flex-col items-center min-h-screen bg-blue-100'>
//       <div className='text-4xl font-bold mt-10 text-gray-800 '>SkyCast</div>
//       <div className='Card text-4xl font-bold mt-10 text-gray-800 flex flex-col items-center min-h-screen bg-blue-100'>
//       <input
//           type="text"
//           placeholder="Enter city name"
//           value={cityName}
//           onChange={(e) => onInputset(e.target.value)}
//           className="p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       {/* <input onChange={(e) => onInputset(e.target.value)} type="text" /> */}
//       <button onClick={hitAPI}>SUBMIT</button>

//       </div>
//       {
//         dataResponse &&
//         <div>{dataResponse.temp}</div>
//       }
//       {
//         dataResponse &&
//         <div>{dataResponse.pressure}</div>
//       }
//       {
//         dataResponse &&
//         <div>{dataResponse.humidity}</div>
//       }
//       {
//         dataResponse &&
//         <div>{dataResponse.sea.level}</div>
//       }
//       {
//         dataResponse &&
//         <div>{dataResponse.wind.speed}</div>
//       }
//        {dataResponse && (
//         <div className="mt-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-gray-700">
//           <div className="text-2xl font-semibold mb-4">
//             {dataResponse.name}, {dataResponse.sys.country}
//           </div>
//
//           {dataResponse.weather && (
//             <div className="text-lg mb-2">
//               <span className="font-bold">Weather: </span>
//               {dataResponse.weather[0].description}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Error handling (optional) */}
//       {!dataResponse && cityName && (
//         <div className="mt-4 text-red-600">City not found. Please try again.</div>
//       )}
//     </div>
//   )
// }

// export default App




import React, { useState } from "react";

const App = () => {
  const [cityName, setCityName] = useState("");
  const [dataResponse, setDataResponse] = useState(null);
  const [error, setError] = useState("");

  const onInputset = (citynamedata) => {
    setCityName(citynamedata);
  };

  const hitAPI = async () => {
    setError(""); // Clear previous errors
    setDataResponse(null); // Reset data before fetching new data
    try {
      const apiData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3703e0d753948890bfef7c2abf53e85f&units=metric`
      );
      const data = await apiData.json();

      if (data.cod === 200) {
        setDataResponse(data); // Set the entire data response, not just 'main'
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
            {/* Temperature Card */}
            <div className="bg-blue-50 shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="text-xl font-bold text-blue-600">Temperature</div>
              <div className="text-4xl font-semibold text-blue-900 mt-2">
                {dataResponse.main.temp}°C
              </div>
              <i className="fas fa-temperature-high text-5xl text-blue-500 mt-4"></i>
            </div>

            {/* Pressure Card */}
            <div className="bg-yellow-50 shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="text-xl font-bold text-yellow-600">Pressure</div>
              <div className="text-4xl font-semibold text-yellow-900 mt-2">
                {dataResponse.main.pressure} hPa
              </div>
              <i className="fas fa-tachometer-alt text-5xl text-yellow-500 mt-4"></i>
            </div>

            {/* Humidity Card */}
            <div className="bg-green-50 shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="text-xl font-bold text-green-600">Humidity</div>
              <div className="text-4xl font-semibold text-green-900 mt-2">
                {dataResponse.main.humidity}%
              </div>
              <i className="fas fa-tint text-5xl text-green-500 mt-4"></i>
            </div>

            {/* Wind Speed Card */}
            <div className="bg-purple-50 shadow-lg rounded-lg p-6 flex flex-col items-center">
              <div className="text-xl font-bold text-purple-600">Wind Speed</div>
              <div className="text-4xl font-semibold text-purple-900 mt-2">
                {dataResponse.wind.speed} m/s
              </div>
              <i className="fas fa-wind text-5xl text-purple-500 mt-4"></i>
            </div>
          </div>

          {/* Weather Description */}
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

