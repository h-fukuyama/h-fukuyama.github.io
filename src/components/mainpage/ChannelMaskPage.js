import React, { useRef } from 'react';
import { processIsmsBGMBand } from '../../utils/bgmBand';
import { channelMask } from '../../utils/checkButton';
import useFileNavigation from '../../fileOperation/useFileNavigation';
import Header from '../general/Header';
import { Matrix } from '../isms/renderMatrixComponent';
import Sidebar from '../general/Sidebar';

const IsmsComponent = () => {
  const { fileContent } = useFileNavigation();
  const maskItem = [];
  const bgmItem = [];
  const refs = {
    atoz: useRef(null),
    uatouz: useRef(null),
    zatozz: useRef(null)
  };
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 80);
  const items = [
    { label: 'A~Zチャンネルマスク', ref: refs.atoz },
    { label: 'UA~UZチャンネルマスク', ref: refs.uatouz },
    { label: 'ZA~ZZチャンネルマスク', ref: refs.zatozz }
  ];

  for (let i = 0x41; i <= 0x8E; i++) {
    const bgmBand = processIsmsBGMBand(i);
    const channelMaskResult = channelMask(fileContent?.if_config?.isms[i - 0x40]);
    bgmItem.push(bgmBand);
    if(channelMaskResult) {
      maskItem.push(channelMaskResult)
    }
  }

  return (
    <div>
      <Header />
      <Sidebar items={items} scrollToRef={scrollToRef} />
      <div id="main-content">
        <div>
          {!maskItem && !bgmItem ? (
            <div>Loading...</div>
          ) : (
            <>
              <Matrix ref={refs.atoz} data={maskItem.slice(0,26)} band={bgmItem.slice(0,26)} title="A~Zチャンネルマスク" />
              <Matrix ref={refs.uatouz} data={maskItem.slice(26,52)} band={bgmItem.slice(26,52)} title="UA~UZチャンネルマスク" />
              <Matrix ref={refs.zatozz} data={maskItem.slice(52,78)} band={bgmItem.slice(52,78)} title="ZA~ZZチャンネルマスク" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default IsmsComponent;