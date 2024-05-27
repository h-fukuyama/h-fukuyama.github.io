import React from 'react';
import { ScProcessor1, ScProcessor2 } from '../sc/ScComponent';
import { ScTable1, ScTable2 } from './scTable';

const StaffCallSection = React.forwardRef(({ fileContent }, ref) => {
  const datasets1 = ScProcessor1({ sc: fileContent?.if_config?.sc || [] });
  const datasets2 = ScProcessor2({ sc: fileContent?.if_config?.sc || [] });

  return (
    <div ref={ref}>
      <h2>スタッフコール(両方未接続の設定以外を表示)</h2>
      <h3>無線① WCシリーズ(101~400)</h3>
      {datasets1.map((data, index) => (
        <div key={index}>
          {(data[1] !== '<未登録>' || data[2] !== '<未登録>') && (
            <ScTable1 id={data[0]} button={data[0] + 100} call={data[1]} back={data[2]} />
          )}
        </div>
      ))}
      <br /><br /><br />
      <h3>無線② UTW/WCシリーズ(1~16)</h3>
      {datasets2.map((data, index) => (
        <div key={index}>
          {((data[1] !== '<未登録>' && data[1] !== '') || (data[2] !== '<未登録>' && data[2] !== '')) && (
            <ScTable1 id={data[0]} button={data[0]} call={data[1]} back={data[2]} />
          )}
        </div>
      ))}
      <br /><br /><br />
      <h3>有線(1~16)</h3>
      {datasets2.map((data, index) => (
        <div key={index}>
          {((data[1] !== '<未登録>' && data[1] !== '') || (data[2] !== '<未登録>' && data[2] !== '')) && (
            <ScTable2 id={data[0]} call={data[1]} />
          )}
        </div>
      ))}
      <br /><br /><br />
    </div>
  );
});

export default StaffCallSection;
