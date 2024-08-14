import React, { useRef } from 'react';
import { useState } from 'react';
import Header from '../general/Header';
import useFileNavigation from '../../fileOperation/useFileNavigation';
import Sidebar from '../general/Sidebar';
import { IsmsProcessor } from '../isms/IsmsFunction';
import { IsmsSettingComponent } from '../isms/IsmsSettingComponent';
import MenuComponent from '../menu/MenuComponent';
import { menuProcessor, menuProcessor2 } from '../menu/MenuComponent';
import { OthrProcessor } from '../othr/OthrFunction';
import { OthrTable } from '../othr/othrTable';

const SettingPage = () => {
  const { file, fileContent } = useFileNavigation();
  const [highlightedRef, setHighlightedRef] = useState(null);
  
  const scrollToRef = (ref) => {
    window.scrollTo(0, ref.current.offsetTop - 80);
    if (highlightedRef) {
      highlightedRef.current.classList.remove('highlight');
    }
    ref.current.classList.add('highlight');
    setHighlightedRef(ref);
    setTimeout(() => {
      ref.current.classList.remove('highlight');
      setHighlightedRef(null);
    }, 1000);
  };

  const refs = {
    othr: useRef(null),
    menu: useRef(null),
    isms: useRef(null)
  };
  const items = [
    { label: 'isms設定値', ref: refs.isms },
    { label: 'menu設定値', ref: refs.menu },
    { label: 'othr設定値', ref: refs.othr }
  ];

  const results_all = OthrProcessor({ other: fileContent?.if_config?.othr || [] });
  const menu_all = menuProcessor({ menu: fileContent?.if_config?.menu || [] });
  const menu_all2 = menuProcessor2({ menu: fileContent?.if_config?.menu || [] });
  const isms_all = IsmsProcessor({ isms: fileContent?.if_config?.isms || [] })

  return (
    <div>
      {file ? (
        <div>
          <Header />
          <Sidebar items={items} scrollToRef={scrollToRef} />
          {fileContent && fileContent.if_config ? (
            <div>
              <IsmsSettingComponent results_all={isms_all} ismsRef={refs.isms} />
              <MenuComponent results_all={menu_all} results_all2={menu_all2} menuRef={refs.menu} />
              <OthrTable results_all={results_all} othrRef={refs.othr} />
            </div>
          ) : ( <p>Loading...</p>)}
        </div>
      ) : ( <p>Resetting...</p> )}
    </div>
  );
};

export default SettingPage;
