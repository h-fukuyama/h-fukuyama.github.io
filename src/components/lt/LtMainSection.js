import React from 'react';
import { hexToBinary } from '../../utils/calculate';
import { LtMainTable } from './ltMainTable';
import { oneTouch } from '../../utils/checkButton';

const LocalTimerSection = React.forwardRef(({ fileContent }, ref) => {
  const lt = fileContent?.if_config?.lt;
  const menu = fileContent?.if_config?.menu[10];
  const datasets4 = [];
  if (lt && menu) {
    const ltOn = oneTouch(menu, '');
    for (let i = 1; i <= 7; i++) {
      const title = lt[(i - 1) * 4702 + 1] ? lt[(i - 1) * 4702 + 1] : 'ローカルタイマー' + i + '(ユーザ未定義)';
      const numbers = ltOn[0].value.split(',').map(Number);
      datasets4.push([numbers.includes(i) ? 'ON' : 'OFF', i, hexToBinary(lt[(i - 1) * 4702]), title]);
    }
  }

  return (
    <div ref={ref}>
      <h2>ローカルタイマーON状態のみ</h2>
      {datasets4.map((data, index) => (
        <div key={index}>
          {data[0] !== 'OFF' && <LtMainTable power={data[0]} id={data[1]} week={data[2]} title={data[3]} />}
        </div>
      ))}
      <br /><br /><br />
    </div>
  );
});

export default LocalTimerSection;
