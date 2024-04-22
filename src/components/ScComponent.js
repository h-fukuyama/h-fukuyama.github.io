// ScComponent.js

import React, { useEffect, useRef } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { getActionResult1, getActionResult2 } from '../utils/sc/scComponentFunction';
import { ScTable1, ScTable2 } from '../utils/sc/scTable';

const ScComponent = () => {
  const { file } = useFileContext();
  const { fileContent } = useFileContent(file);
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      navigate('/reset');
    }
  }, [file, navigate]);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const wireless1Ref = useRef(null);
  const wireless2Ref = useRef(null);
  const wiredRef = useRef(null);

  const datasets1 = ScProcessor1({ sc: fileContent?.if_config?.sc || [] });
  const datasets2 = ScProcessor2({ sc: fileContent?.if_config?.sc || [] });

  return (
    <div>
      {file && (
        <div>
          <Header />
          <div id="sidebar">
            {/* サイドバー */}
            <ul><b>
              <li onClick={() => scrollToRef(wireless1Ref)}>無線① WCシリーズ</li>
              <li onClick={() => scrollToRef(wireless2Ref)}>無線② UTW/WCシリーズ</li>
              <li onClick={() => scrollToRef(wiredRef)}>有線</li>
            </b></ul>
          </div>
          <div id="main-content">
            <h2 ref={wireless1Ref}>Sc Page</h2>
            <h3>無線① WCシリーズ(400ペア)</h3>
            {datasets1.map((data, index) => (
              <div key={index}>
                <ScTable1 id={data[0]} button={data[0]+100} call={data[1]} back={data[2]} />
              </div>
            ))}
            <h3 ref={wireless2Ref}>無線② UTW/WCシリーズ(1~16)</h3>
            {datasets2.map((data, index) => (
              <div key={index}>
                <ScTable1 id={data[0]} button={data[0]} call={data[1]} back={data[2]} />
              </div>
            ))}
            <h3 ref={wiredRef}>有線(1~16)</h3>
            {datasets2.map((data, index) => (
              <div key={index}>
                <ScTable2 id={data[0]} call={data[1]} />
              </div>
            ))}
          </div>
        </div>
      )}
      {!file && <h2>Sc Page</h2>}
    </div>
  );
};

export default ScComponent;

export const ScProcessor1 = ({ sc }) => {
  const datasets = [];
  for (let i = 0; i < 22400; i += 56) {
    if ((sc[i] === sc[i + 22400]) && sc[i]==='00') { //両方「コメント再生」
      const dataset = [
        [sc[i + 1], sc[i + 5], sc[i + 9], sc[i + 13], sc[i + 17]],
        [sc[i + 22401], sc[i + 22405], sc[i + 22409], sc[i + 22413], sc[i + 22417]],
      ];
      const firstArrayValue = dataset[0].find(value => value !== "");
      const secondArrayValue = dataset[1].find(value => value !== "");
      datasets.push([
        (i / 56) + 1,
        firstArrayValue || "<未登録>",
        secondArrayValue || "<未登録>",
      ]);
    } else if((sc[i] === sc[i + 22400]) && sc[i] !== '00') { //両方コメント再生「以外」
      const actionResult = getActionResult1(sc, i);
      datasets.push([(i / 56) + 1, ...actionResult]);
    } else if((sc[i] !== sc[i + 22400]) && sc[i] !== '00') {
      let actionResult = getActionResult1(sc, i);
      actionResult[1]=['<未登録>'];
      datasets.push([(i / 56) + 1, ...actionResult]);
    }
  }
  return datasets;
};

export const ScProcessor2 = ({ sc }) => {
  const datasets = [];
  for (let i = 44800; i < 45695; i += 56) {
    const isSameButton = sc[i] === sc[i + 448];
    if (isSameButton && sc[i]==='00') {
      const dataset = [
        [sc[i + 1], sc[i + 5], sc[i + 9], sc[i + 13], sc[i + 17]],
        [sc[i + 449], sc[i + 453], sc[i + 457], sc[i + 461], sc[i + 465]],
      ];
      const firstArrayValue = dataset[0].find(value => value !== "");
      const secondArrayValue = dataset[1].find(value => value !== "");
      datasets.push([
        (i / 56) - 799,
        firstArrayValue || "<未登録>",
        secondArrayValue || "<未登録>",
      ]);
    } else if(sc[i+448] === undefined) {
      const dataset = [sc[i + 1], sc[i + 5], sc[i + 9], sc[i + 13], sc[i + 17]];
      const firstArrayValue = dataset.find(value => value !== "");
      const secondArrayValue = "";
      datasets.push([
        (i / 56) - 799,
        firstArrayValue || "<未登録>",
        secondArrayValue,
      ]);
    } else {
      const actionResult = getActionResult2(sc, i);
      datasets.push([(i / 56) - 799, ...actionResult]);
    }
  }
  return datasets;
};
