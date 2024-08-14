import React from 'react';
import { menuProcessor3 } from './menuProcessor';
import { MenuTable } from './MenuTable';

const OneTouchButtonSection = React.forwardRef(({ fileContent }, ref) => {
  const datasets3 = menuProcessor3({ menu: fileContent?.if_config?.menu || [] });

  return (
    <div ref={ref}>
      {datasets3.map((data, index) => (
        <div key={index}>
          {(data[1] !== '<未登録>' || data[2] !== '') && <MenuTable id={data[0]} title={data[1]} call={data[2]} />}
        </div>
      ))}
      <br /><br /><br />
    </div>
  );
});

export default OneTouchButtonSection;
