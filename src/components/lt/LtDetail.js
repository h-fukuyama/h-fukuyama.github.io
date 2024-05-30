import React from 'react';
import Header from '../general/Header';
import { useParams } from 'react-router-dom';
import { hexToBinary } from '../../utils/calculate';
import { LtDetailTable, LtDetailTable2 } from './ltDetailTable';
import { getActionResult } from './ltComponentFunction';
import useFileNavigation from '../../fileOperation/useFileNavigation';

const LtDetail = () => {
  const { file, fileContent } = useFileNavigation();
  const { id } = useParams();
  const LtDetailProcessor = ({ lt, id }) => {
    if (lt) {
      const datasets = [];
      const title = lt[((id - 1) * 4702) + 1] ? lt[((id - 1) * 4702) + 1] : 'ローカルタイマー' + id + '(ユーザ未定義)';
      datasets.push(hexToBinary(lt[(id - 1) * 4702]), title);
      return datasets;
    }
  }

  const LtDetailProcessor2 = ({ lt, id }) => {
    if (lt) {
      const datasets = [];
      for (let i = 1; i <= 100; i++) {
        const startIndex = ((47 * (i - 1)) + (4702 * (id - 1) + 2));
        const hour = lt[startIndex] === '18' ? '--' : parseInt(lt[startIndex], 16).toString().padStart(2, '0');
        const minute = lt[startIndex + 1] === '3C' ? '--' : parseInt(lt[startIndex + 1], 16).toString().padStart(2, '0');
        if (lt[startIndex + 2] === '00') {
          const dataset = [lt[startIndex + 3], lt[startIndex + 7], lt[startIndex + 11], lt[startIndex + 15], lt[startIndex + 19]];
          const firstArrayValue = dataset.find(value => value !== "");
          const call = firstArrayValue ? firstArrayValue : '<未登録>';
          datasets.push([id, i, hour, minute, call])//id, id2, hour, minute, call
        } else {
          const call = getActionResult(lt, startIndex);
          datasets.push([id, i, hour, minute, call])
        }
      }
      return datasets;
    }
  }

  const tableSet = LtDetailProcessor({ lt: fileContent?.if_config?.lt || [], id: id });
  const tableSet2 = LtDetailProcessor2({ lt: fileContent?.if_config?.lt || [], id: id });

  return (
    <div>
      {file && (
        <div>
          <Header />
          <div style={{ margin: '30px' }}>
            <h3>ローカルタイマー{Number(id)}の詳細</h3>
            {fileContent && (
              <>
                <div><LtDetailTable week={tableSet[0]} title={tableSet[1]} /></div>
                {tableSet2.map((data, index) => (
                  <div key={index}>
                    {(data[2] !== "--" && data[3] !== "--") && (
                      <div><LtDetailTable2 id={data[0]} id2={data[1]} hour={data[2]} minute={data[3]} call={data[4]} /></div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
      {!file && <h2>Lt Page</h2>}
    </div>
  );
};

export default LtDetail;
