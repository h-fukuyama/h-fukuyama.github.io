import React, { useRef, useState } from 'react';
import Header from '../general/Header';
import Sidebar from '../general/Sidebar';
import useFileNavigation from '../../fileOperation/useFileNavigation';
import { InfoTable } from './InfoTable';
import StaffCallSection from '../sc/StaffCallSection';
import OneTouchButtonSection from '../menu/OneTouchMainSection';
import { useVisible } from '../../fileOperation/VisibleContext';

const MainComponent = () => {
  const { file, fileContent } = useFileNavigation();
  const { isVisible, setIsVisible } = useVisible();
  const [highlightedRef, setHighlightedRef] = useState(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const scrollToRef = (ref) => {
    window.scrollTo(0, ref.current.offsetTop - 80);
    if (highlightedRef) {
      highlightedRef.classList.remove('highlight');
    }
    const h2Element = ref.current.querySelector('h2');
    if (h2Element) {
      h2Element.classList.add('highlight');
      setHighlightedRef(h2Element);
      setTimeout(() => {
        h2Element.classList.remove('highlight');
        setHighlightedRef(null);
      }, 1000);
    }
  };

  const refs = {
    mainPage: useRef(null),
    staffCall: useRef(null),
    oneTouchButton: useRef(null),
  };

  const items = [
    { label: 'メインページ', ref: refs.mainPage },
    { label: 'スタッフコール', ref: refs.staffCall },
    { label: 'ワンタッチボタン', ref: refs.oneTouchButton },
  ];

  return (
    <div>
      {file && (
        <div>
          <Header />
          <Sidebar items={items} scrollToRef={scrollToRef} />
          <div id="main-content">
            <div ref={refs.mainPage}>
              <h2 >メインページ</h2>
              <p>ファイル名: {file.name}</p>
            </div>
            {fileContent ? (
              <div>
                <button onClick={toggleVisibility} style={{ marginBottom: '30px' }}>
                  {isVisible ? '機器情報一覧非表示' : '機器情報一覧表示'}
                </button>
                {isVisible && <InfoTable info={fileContent} />}
                <div ref={refs.staffCall}>
                  <h2>スタッフコール</h2>
                  <StaffCallSection fileContent={fileContent} />
                </div>
                <div ref={refs.oneTouchButton}>
                  <h2>ワンタッチボタン</h2>
                  <OneTouchButtonSection fileContent={fileContent} />
                </div>
              </div>
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
