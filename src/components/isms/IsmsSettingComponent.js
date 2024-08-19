import React from 'react';
import useFileNavigation from '../../fileOperation/useFileNavigation';
import CardComponent from '../general/CardComponent';

export const IsmsSettingComponent = ({ results_all, ismsRef }) => {
  const { fileContent } = useFileNavigation();
  return (
    <div id="main-content">
      <h2 ref={ismsRef}>isms プロパティ</h2>
      {fileContent && fileContent.if_config ? (
        <div>
          {results_all && results_all.slice(0, 1).map((result, index) => (
            <div key={index}>
              <h4>初期設定</h4>
              <CardComponent results={[result]} />
            </div>
          ))}
          <h4>DNS設定</h4>
          <CardComponent results={results_all.slice(2, 5)} />
          <h4>放送優先順位</h4>
          <CardComponent results={results_all.slice(5)} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );}