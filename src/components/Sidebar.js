import React from 'react';

const Sidebar = ({ items, scrollToRef }) => (
  <div id="sidebar">
    <ul>
      {items.map(({label, ref }, index) => (
        <b key={index}>
          <li onClick={() => scrollToRef(ref)}>
            {label}
          </li>
        </b>
      ))}
    </ul>
  </div>
);

export default Sidebar;
