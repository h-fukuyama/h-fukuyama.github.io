import React, { useEffect } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { LtMainTable } from '../utils/lt/ltMainTable';
import { hexToBinary } from '../utils/calculate';
import { oneTouch } from '../utils/checkButton';

const LtComponent = () => {
  const { file } = useFileContext(); //fileとsetFileContextを取得
  const { fileContent } = useFileContent(file); //fileのファイルの内容を読み込む
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      navigate('/reset');
    }
  }, [file, navigate]);

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