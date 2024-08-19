import React from 'react';
import CardComponent from '../general/CardComponent';

export const OthrTable = ({ results_all, othrRef }) => {
  return (
  <div id="main-content">
    <h2 ref={othrRef} style={{ marginBottom: '20px', marginTop: '20px' }}>Othr プロパティ</h2>
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <CardComponent results={results_all.slice(0, 1)} />
          </div>
          <div style={{ flex: 1 }}>
            <CardComponent results={results_all.slice(1, 4)} />
            <h4>特殊バンド設定</h4>
            <CardComponent results={results_all.slice(4, 7)} />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h4>店内/事務所音量</h4>
            <CardComponent results={results_all.slice(7, 11)} />
          </div>
          <div style={{ flex: 1 }}>
            <h4>CMバランス</h4>
            <CardComponent results={results_all.slice(11, 15)} />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h4>インカム音量</h4>
            <CardComponent results={results_all.slice(15, 19)} />
          </div>
          <div style={{ flex: 1 }}>
            <h4>音量値</h4>
            <CardComponent results={results_all.slice(19, 24)} />
          </div>
        </div>
        <CardComponent results={results_all.slice(24, 25)} />
        <h4>許可ボタン設定</h4>
        <CardComponent results={results_all.slice(25)} />
      </div>
    </div>
  )
}