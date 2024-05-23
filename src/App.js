// App.js
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { FileProvider } from './context/FileContext';
import OthrComponent from './components/othr/OthrComponent';
import MainComponent from './components/mainpage/MainComponent';
import ScComponent from './components/sc/ScComponent';
import ScDetail from './components/sc/Scdetail';
import MenuComponent from './components/menu/MenuComponent';
import MenuDetail from './components/menu/MenuDetail';
import IsmsComponent from './components/isms/IsmsComponent';
import LtComponent from './components/lt/LtComponent';
import LtDetail from './components/lt/LtDetail';
import LtSpecific from './components/lt/LtSpecific';
import FileInputScreen from './components/startpage/FileInputScreen';
import ResetComponent from './components/ResetComponent';
import './App.css';

function App() {
  return (
    <Router>
      <FileProvider>
          <Routes>
            <Route path={ "/" } element={<FileInputScreen />} />
            <Route path={ "/main" } element={<MainComponent />} />
            <Route path={ "/sc" } element={<ScComponent />} /> {/* 詳細表示が必要 */}
              <Route path={ "/sc/:id" } element={<ScDetail />} />
            <Route path={ "/menu" } element={<MenuComponent />} /> {/* 詳細表示が必要 */} 
              <Route path={ "/menu/:id" } element={<MenuDetail />} />
            <Route path={ "/isms" } element={<IsmsComponent />} />
            <Route path={ "/lt" } element={<LtComponent />} /> {/* 詳細表示2階層分が必要 */}
              <Route path={ "/lt/:id" } element={<LtDetail />} />
                <Route path={ "/lt/:id/:id2" } element={<LtSpecific />} />
            <Route path={ "/othr" } element={<OthrComponent />} />
            <Route path={ "/reset" } element={<ResetComponent />} />
            {/* <Route path="*" element={<Error />} /> */}
          </Routes>
      </FileProvider>
    </Router>
  );
}

export default App;
