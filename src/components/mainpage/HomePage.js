import React, { useRef, useState } from 'react';
import Header from '../Header';
import { ScProcessor1, ScProcessor2 } from '../sc/ScComponent'
import { ScTable1, ScTable2 } from '../../utils/sc/scTable';
import { MenuTable } from '../../utils/menu/menuTable';
import { MenuProcessor3 } from '../menu/MenuComponent';
import { hexToBinary } from '../../utils/calculate';
import { LtMainTable } from '../../utils/lt/ltMainTable';
import { oneTouch } from '../../utils/checkButton';
import Sidebar from '../Sidebar';
import useFileNavigation from '../useFileNavigation';
import { InfoTable } from '../../InfoTable';

const MainComponent = () => {
  const { file, fileContent} = useFileNavigation();
  const info = fileContent;

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

  //スタッフコールの設定値呼出し
  const datasets1 = ScProcessor1({ sc: fileContent?.if_config?.sc || [] });
  const datasets2 = ScProcessor2({ sc: fileContent?.if_config?.sc || [] });
  
  //ワンタッチボタンの設定値呼出し
  const datasets3 = MenuProcessor3({ menu: fileContent?.if_config?.menu || [] });
 
  //ON状態のローカルタイマーの設定値呼出し
  const lt = fileContent?.if_config?.lt;
  const menu = fileContent?.if_config?.menu[10];
  const datasets4 = [];
  if(lt&&menu){
    const ltOn = oneTouch(menu, '');
    for( let i = 1; i <= 7; i++ ){
      const title = lt[((i-1)*4702)+1]? lt[((i-1)*4702)+1] : 'ローカルタイマー'+i+'(ユーザ未定義)';
      const numbers = ltOn[0].value.split(',').map(Number);
      datasets4.push([numbers.includes(i) ? 'ON' : 'OFF',i,hexToBinary(lt[(i-1)*4702]),title]);
    }
  }

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
                <button id='info' onClick={toggleVisibility}>
                  {isVisible ? '機器情報一覧非表示' : '機器情報一覧表示'}
                </button>
                {isVisible &&
                  <InfoTable info={info} />
                }
                <h2 ref={refs.staffCall}>スタッフコール(両方未接続の設定以外を表示)</h2>
                <h3>無線① WCシリーズ(101~400)</h3>
                {datasets1.map((data, index) => (
                  <div key={index}>
                    {(data[1] !== "<未登録>" || data[2] !== "<未登録>") && (
                      <ScTable1 id={data[0]} button={data[0]+100} call={data[1]} back={data[2]} />
                    )}
                  </div>
                ))}
                <br /><br /><br />
                <h3>無線② UTW/WCシリーズ(1~16)</h3>
                {datasets2.map((data, index) => (
                  <div key={index}>
                    {((data[1] !== "<未登録>" && data[1] !== "") || (data[2] !== "<未登録>" && data[2] !== "")) && (
                      <ScTable1 id={data[0]} button={data[0]} call={data[1]} back={data[2]} />
                    )}
                  </div>
                ))}
                <br /><br /><br />
                <h3>有線(1~16)</h3>
                {datasets2.map((data, index) => (
                  <div key={index}>
                    {((data[1] !== "<未登録>" && data[1] !== "") || (data[2] !== "<未登録>" && data[2] !== "")) && (
                      <ScTable2 id={data[0]} call={data[1]} />
                    )}
                  </div>
                ))}
                <br /><br /><br />
                <h2 ref={refs.oneTouchButton}>登録済みワンタッチボタン</h2>
                {datasets3.map((data, index) => (
                  <div key={index}>
                    {(data[1] !== "<未登録>" || data[2] !== "") && (
                      <MenuTable id={data[0]} title={data[1]} call={data[2]} />
                    )}
                  </div>
                ))}
                <br /><br /><br />
                <h2 ref={refs.localTimer}>ローカルタイマーON状態のみ</h2>
                {datasets4.map((data, index) => (
                  <div key={index}>
                    {(data[0] !== 'OFF') && ( 
                      <LtMainTable power={data[0]} id={data[1]} week={data[2]} title={data[3]} />
                    )}
                  </div>
                ))}
                <br /><br /><br />
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
