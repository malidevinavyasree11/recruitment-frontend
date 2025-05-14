import React from 'react';
import App from './App';
import Upload from './Component/upload/Upload';
import History from './Component/Action/History/History';
import DaysDelta from './Component/Days Delta/DaysDelta';
//import Showdetails from './Component/Action/Showdetails/showdetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const MainApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/upload-excel" element={<Upload />} />
        <Route path="/5days" element={<DaysDelta/>}></Route>
        <Route path="/History" element={<History />}></Route>
        {/* <Route path="/Showdetails" element={<Showdetails/>}></Route> */}
      </Routes>
    </Router>
  );
};
export default MainApp;
