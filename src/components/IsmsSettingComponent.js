import React from 'react';
import useFileNavigation from './useFileNavigation';

export const IsmsSettingComponent = ({ results_all, ismsRef }) => {
  const { fileContent } = useFileNavigation();
  return (
    <>
      <div id="main-content">
        <h2 ref={ismsRef}>isms Page</h2>
        {fileContent && fileContent.if_config ? (
          <div>
              {results_all && results_all.slice(0,1).map((result, index) => (
              <div key={index}>
                <h4>初期設定</h4>
                <div className='card'>
                  {typeof result === 'object' && result.map && result.map(({ property, value }) => (
                    <div
                      key={property}
                      className={`item ${value === '有効' ? 'underline' : ''} ${value === '未使用' ? 'line-through' : ''}`}
                    >
                      {`${property}: ${value}`}
                    </div>
                  ))}
                </div>
              </div>
              ))}
              <h4>DNS設定</h4>
              <div className='card'>
                {results_all && results_all.slice(2,5).map((result, index) => (
                <>
                  {typeof result === 'object' && result.map && result.map(({ property, value }) => (
                    <div
                      key={property}
                      className={`${value === '有効' ? 'underline' : ''} ${value === '未使用' ? 'line-through' : ''}`}
                      style={{ margin: '0.2em' }}
                    >
                      {`${property}: ${value}`}
                    </div>
                  ))}
                </>
              ))}
              </div>
              <h4>放送優先順位</h4>
              <div className='card'>
                {results_all && results_all.slice(5).map((result, index) => (
                  <>
                    {typeof result === 'object' && result.map && result.map(({ property, value }) => (
                      <div
                        key={property}
                        className={`${value === '有効' ? 'underline' : ''} ${value === '未使用' ? 'line-through' : ''}`}
                        style={{ margin: '0.2em' }}
                      >
                        {`${property}: ${value}`}
                      </div>
                    ))}
                  </>
                ))}
              </div>
          </div>
        ): null}
      </div>
    </>
  );
}