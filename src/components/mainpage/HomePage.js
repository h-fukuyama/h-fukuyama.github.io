import React, { useRef, useState } from 'react';
import Header from '../general/Header';
import Sidebar from '../general/Sidebar';
import useFileNavigation from '../../fileOperation/useFileNavigation';
import { InfoTable } from './InfoTable';
import StaffCallSection from '../sc/ScMainSection';
import OneTouchButtonSection from '../menu/OneTouchMainSection';
import LocalTimerSection from '../lt/LtMainSection';

const MainComponent = () => {
  const { file, fileContent} = useFileNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  //サイドバーのitems定義
  const refs = {
    staffCall: useRef(null),
    oneTouchButton: useRef(null),
    localTimer: useRef(null)
  };
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 80);
  const items = [
    { label: 'スタッフコール', ref: refs.staffCall },
    { label: 'ワンタッチボタン', ref: refs.oneTouchButton },
    { label: 'ローカルタイマー', ref: refs.localTimer }
  ];
  return (
    <div>
      {file && (
        <div>
          <Header/>
          <Sidebar items={items} scrollToRef={scrollToRef} />
          <div id="main-content">
            <h2>Main Page</h2>
            <p>ファイル名: {file.name}</p>
            {fileContent? (
              <>
                <button id='info' onClick={toggleVisibility}>{isVisible ? '機器情報一覧非表示' : '機器情報一覧表示'}</button>
                {isVisible && <InfoTable info={fileContent} />}
                <StaffCallSection ref={refs.staffCall} fileContent={fileContent} />
                <OneTouchButtonSection ref={refs.oneTouchButton} fileContent={fileContent} />
                <LocalTimerSection ref={refs.localTimer} fileContent={fileContent} />
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        )}
    </div>
  );
};

export default MainComponent;
