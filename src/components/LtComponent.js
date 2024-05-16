import React from 'react';
import Header from './Header';
import { LtMainTable } from '../utils/lt/ltMainTable';
import { hexToBinary } from '../utils/calculate';
import { oneTouch } from '../utils/checkButton';
import useFileNavigation from './useFileNavigation';

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
      {file && ( //fileが存在すれば以下を表示
        <div>
          <Header />
          <h2 style={{ marginBottom: '50px', marginLeft: '20px', marginTop: '20px' }}>Lt Page</h2>
          {fileContent && (
            <div>
              {datasets.map((data, index) => (
                <div key={index} style={{padding: '5px'}}>
                  <LtMainTable power={data[0]} id={data[1]} week={data[2]} title={data[3]} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {!file && <h2>Lt Page</h2>} {/* fileが存在しなければタイトルだけ表示（/に遷移するとかでもよさそう) */}
    </div>
  );
};

export default LtComponent;