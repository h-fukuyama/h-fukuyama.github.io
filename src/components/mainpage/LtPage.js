import React from 'react';
import Header from '../general/Header';
import { LtMainTable } from '../lt/ltMainTable';
import { hexToBinary } from '../../utils/calculate';
import { oneTouch } from '../../utils/checkButton';
import useFileNavigation from '../../fileOperation/useFileNavigation';

const LtComponent = () => {
  const { file, fileContent} = useFileNavigation();
  const lt = fileContent?.if_config?.lt;
  const menu = fileContent?.if_config?.menu[10];
  const datasets = [];
  if(lt&&menu){
    const ltOn = oneTouch(menu, '');
    for( let i = 1; i <= 7; i++ ){
      const title = lt[((i-1)*4702)+1]? lt[((i-1)*4702)+1] : 'ローカルタイマー'+i+'(ユーザ未定義)';
      const numbers = ltOn[0].value.split(',').map(Number);
      datasets.push([numbers.includes(i) ? 'ON' : 'OFF',i,hexToBinary(lt[(i-1)*4702]),title]);
    }
  }

  return (
    <div>
      {file ? (
        <div>
          <Header />
          <h2 style={{ marginBottom: '50px', marginLeft: '20px', marginTop: '20px' }}>Lt Page</h2>
          {fileContent ? (
            <div>
              {datasets.map((data, index) => (
                <div key={index} style={{padding: '5px'}}>
                  <LtMainTable power={data[0]} id={data[1]} week={data[2]} title={data[3]} />
                </div>
              ))}
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

export default LtComponent;