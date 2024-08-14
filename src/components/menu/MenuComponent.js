import React from 'react';
import useFileNavigation from '../../fileOperation/useFileNavigation';
import CardComponent from '../general/CardComponent';
import { processFunction1, processFunction2, processFunction3, processFunction4, processFunction5, processFunction6, processFunction7, processFunction8, processFunction9, processFunction10, processFunction11, processFunction12, processFunction13, processFunction14, processFunction15, processFunction16, processFunction17, processFunction997, processFunction998, processFunction999  } from './menuFunction';
  
 const MenuComponent = ({ results_all, results_all2, menuRef }) => {
  const { fileContent } = useFileNavigation();
  return (
    <div id="main-content">
      <h2 ref={menuRef}>Menu Page</h2>
      {fileContent && fileContent.if_config ? (
        <div>
          <h4>イコライザ設定</h4>
          <div className='card' style={{ display: 'flex' }}>
            {results_all.slice(0, 3).map((result, index) => (
              <div key={index} style={{ flex: 1 }}>
                <div>
                  {result.map(({ property, value }) => (
                    <div key={property}> {`${property}: ${value}`}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
              <h4>LCD設定</h4>
              <CardComponent results={results_all.slice(3, 7)} />
            </div>
            <div style={{ flex: 1 }}>
              <h4>入力レベル</h4>
              <CardComponent results={results_all.slice(8, 11)} />
            </div>
          </div>
          <CardComponent results={results_all.slice(11, 12)} />
          <CardComponent results={results_all.slice(13, 15)} />
          <h4>配信設定</h4>
          <CardComponent results={results_all2} />
        </div>
      ) : ( 
        <p>Loading...</p>
      )}
    </div>
  );};
export default MenuComponent;

export const menuProcessor = ({ menu }) => {
  const menuPropertyFunctions = [
    processFunction1, processFunction2, processFunction3, processFunction4, processFunction5, processFunction6, processFunction7, processFunction8, processFunction9, processFunction10,
    processFunction11, processFunction12, processFunction13, processFunction14, processFunction15, processFunction16, processFunction17
  ];
  const results = [];
  for (let i = 0; i < 17 ; i++) {
    if(i===0||i===1||i===2){continue}
    const property = menu[i];
    if(property){
      const func = menuPropertyFunctions[i];
      const result = func(property);
      results.push(result);
    }
  }
  return results;
};

export const menuProcessor2 = ({ menu }) => {
  const menuPropertyFunctions = [
    processFunction997, processFunction998, processFunction999
  ];
  const results = [];
  for (let i = 997; i < 1000 ; i++) {
    const property = menu[i];
    if(property){
      const func = menuPropertyFunctions[i-997];
      const result = func(property);
      results.push(result);
    }
  }
  return results;
};

