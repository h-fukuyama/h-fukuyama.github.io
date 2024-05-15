import React, { useContext } from 'react';
import { SidebarContext } from './SidebarContext';

const Sidebar = () => {
  const { items } = useContext(SidebarContext);

  return (
    <div id="sidebar">
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
