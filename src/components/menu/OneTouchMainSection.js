import React from 'react';
import { MenuProcessor3 } from '../menu/MenuComponent';
import { MenuTable } from '../../utils/menu/menuTable';

const OneTouchButtonSection = React.forwardRef(({ fileContent }, ref) => {
  const datasets3 = MenuProcessor3({ menu: fileContent?.if_config?.menu || [] });

  return (
    <div ref={ref}>
      <h2>登録済みワンタッチボタン</h2>
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
