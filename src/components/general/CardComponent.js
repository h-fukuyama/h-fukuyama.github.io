import React from 'react';

const CardComponent = ({ results }) => (
  <div className="card">
    {results.map((result, index) => (
      <div key={index} style={{ marginBottom: '0.1em' }}>
        {result.map(({ property, value }) => (
          <div
            key={property}
            className={`${value === 'ON' ? 'underline' : ''} ${value === '未使用' ? 'line-through' : ''}`}
            style={{ margin: '0.3em' }}
          >
            {`${property}: ${value}`}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default CardComponent;
