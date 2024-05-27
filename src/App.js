// App.js
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { FileProvider } from './fileOperation/FileContext';
import OthrComponent from './components/mainpage/SettingPage';
import MainComponent from './components/mainpage/HomePage';
import IsmsComponent from './components/mainpage/ChannelMaskPage';
import LtPage from './components/mainpage/LtPage.js';
import LtDetail from './components/lt/LtDetail';
import FileInputScreen from './components/startpage/FileInputScreen';
import ResetComponent from './components/general/ResetComponent'
import './App.css';

function App() {
  return (
    <Router>
      <FileProvider>
          <Routes>
            <Route path={ "/" } element={<FileInputScreen />} />  {/* components/startpage */}
            <Route path={ "/main" } element={<MainComponent />} /> {/* components/mainpage/HomePage */}
            <Route path={ "/isms" } element={<IsmsComponent />} /> {/* components/mainpage/ChannelMask */}
            <Route path={ "/lt" } element={<LtPage />} /> {/* components/mainpage/LtPage */}
              <Route path={ "/lt/:id" } element={<LtDetail />} /> {/* components/lt/LtDetail */}
            <Route path={ "/othr" } element={<OthrComponent />} /> {/* components/startpage/SettingPage */}
            <Route path={ "/reset" } element={<ResetComponent />} /> {/* components/general/ResetComponent */}
          </Routes>
      </FileProvider>
    </Router>
  );
}

export default App;
