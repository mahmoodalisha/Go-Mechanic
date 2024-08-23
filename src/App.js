import React from "react";
import Map from "./components/Map";
import MakeCall from "./components/MakeCall";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="header-container2">
        <h1>Go-Mechanic</h1>
      </div>
      <div className="header-container">
        <h2>Stranded on the road with a broken-down vehicle? No worries! Our app connects you with skilled mechanics right when you need them most. Simply call for help directly from the app, and a trusted mechanic will be on their way to get you back on the road in no time. Reliable assistance is just a tap away.</h2>
      </div>
      <div className="map-container">
        <Map />
      </div>
      <div className="call-section">
        <MakeCall />
      </div>
    </div>
  );
}

export default App;

