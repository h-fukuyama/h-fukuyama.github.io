import React, { useRef } from 'react';
import Header from '../Header';
import useFileNavigation from '../useFileNavigation';
import Sidebar from '../Sidebar';
import { IsmsProcessor } from './ChannelMaskPage';
import { IsmsSettingComponent } from '../isms/IsmsSettingComponent';
import MenuComponent from '../menu/MenuComponent';
import { MenuProcessor, MenuProcessor2 } from '../menu/MenuComponent';
import { processFunction1, processFunction2, processFunction3, processFunction4, processFunction5, processFunction6, processFunction7, processFunction8, processFunction9, processFunction10,
  processFunction11, processFunction12, processFunction13, processFunction14, processFunction15, processFunction16, processFunction17, processFunction18, processFunction19, processFunction20,
  processFunction21, processFunction22, processFunction23, processFunction24, processFunction25, processFunction26, processFunction27, processFunction28, processFunction29, processFunction30,
  processFunction31, processFunction32, processFunction33 } from '../othr/OthrFunction';

const OthrComponent = () => {
  const { file, fileContent} = useFileNavigation();
  const OthrProcessor = ({ other }) => {
    const otherPropertyFunctions = [
      processFunction1, processFunction2, processFunction3, processFunction4, processFunction5, processFunction6, processFunction7, processFunction8, processFunction9, processFunction10,
      processFunction11, processFunction12, processFunction13, processFunction14, processFunction15, processFunction16, processFunction17, processFunction18, processFunction19, processFunction20,
      processFunction21, processFunction22, processFunction23, processFunction24, processFunction25, processFunction26, processFunction27, processFunction28, processFunction29, processFunction30,
      processFunction31, processFunction32, processFunction33
    ];
    const results = [];

    for (let i = 0; i < 33 ; i++) {
      if(i===1||i===2||i===3||i===4){continue}
      const property = other[i];
      const func = otherPropertyFunctions[i];
      const result = func(property);
      results.push(result);
    }
    return results;
  };

  //サイドバーのitems定義
  const refs = {
    othr: useRef(null),
    menu: useRef(null),
    isms: useRef(null)
  };
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 80);
  const items = [
    { label: 'isms設定値', ref: refs.isms },
    { label: 'menu設定値', ref: refs.menu },
    { label: 'othr設定値', ref: refs.othr }
  ];

  //Othr設定値の呼出し
  const results_all = OthrProcessor({ other: fileContent?.if_config?.othr || [] });
  //Menu設定値の呼出し
  const menu_all = MenuProcessor({ menu: fileContent?.if_config?.menu || [] });
  const menu_all2 = MenuProcessor2({ menu: fileContent?.if_config?.menu || [] });
  //isms設定値の呼出し
  const isms_all = IsmsProcessor({ isms: fileContent?.if_config?.isms || []  })
  
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
            <othrTable results_all={results_all} othrRef={refs.othr} />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      ) : (
        <p>Resetting...</p>
      )}
    </div>
  );
};

export default OthrComponent;
