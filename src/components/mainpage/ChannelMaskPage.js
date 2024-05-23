// IsmsComponent.js
import React, {useState, useEffect, useRef} from 'react';
import { processIsmsBGMBand } from '../../utils/bgmBand';
import { channelMask } from '../../utils/checkButton';
import useFileNavigation from '../useFileNavigation';
import Header from '../Header';
import { renderMatrix } from '../isms/renderMatrixComponent';
import Sidebar from '../Sidebar';

const processResults = (results_all) => {
  const categories = {
    'A-Z': [],
    'UA-UZ': [],
    'ZA-ZZ': [],
  };
  results_all.forEach(({ property, value }) => {
    if (property.match(/^[A-Z]チャンネルマスク/)) {
      categories['A-Z'].push({ property, value });
    } else if (property.match(/^U[A-Z]チャンネルマスク/)) {
      categories['UA-UZ'].push({ property, value });
    } else if (property.match(/^Z[A-Z]チャンネルマスク/)) {
      categories['ZA-ZZ'].push({ property, value });
    }
  });
  return categories;
};

const IsmsComponent = () => {
  const { fileContent } = useFileNavigation();
  const [ categories, setCategories ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (categories && Object.keys(categories).length > 0) {
      setIsLoading(false);
    }
  }, [categories]);

  useEffect(() => {
    const results = [];
    for (let i = 0x41; i <= 0x8E; i++) {
      const bgmBand = processIsmsBGMBand(i);
      results.push(channelMask(fileContent?.if_config?.isms[i - 0x40], bgmBand));
    }
    const flattenedResults = results.flat(); // `results_all` がネストされている場合にフラット化
    setCategories(processResults(flattenedResults));
  }, [fileContent]);

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
  return (
    <div>
      <Header />
      <Sidebar items={items} scrollToRef={scrollToRef} />
      <div id="main-content">
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div ref={refs.atoz} style={{margin: '10px'}}>{categories['A-Z'] && renderMatrix(categories['A-Z'], 'A-Z チャンネルマスク')}</div>
              <div ref={refs.uatouz} style={{margin: '10px'}}>{categories['UA-UZ'] && renderMatrix(categories['UA-UZ'], 'UA-UZ チャンネルマスク')}</div>
              <div ref={refs.zatozz} style={{margin: '10px'}}>{categories['ZA-ZZ'] && renderMatrix(categories['ZA-ZZ'], 'ZA-ZZ チャンネルマスク')}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};export default IsmsComponent;

export const IsmsProcessor = ({ isms }) => {
  const ismsPropertyFunctions = [
    processFunction1, processFunction2, processFunction3, processFunction4, processFunction5, processFunction6, processFunction7, processFunction8, processFunction9, processFunction10,
    processFunction11, processFunction12, processFunction13, processFunction14
  ];

  const results = [];

  for (let i = 0; i < 14 ; i++) {
    if(i===2||i===6||i===7||i===8||i===9||i===10){continue}
    const property = isms[i];
    const func = ismsPropertyFunctions[i];
    const results2 = [];

    if( i === 0 ) {
      results.push(func(property));
    }
    else if ( i === 1 ) {
      for ( let j = 0x41; j <= 0x8E; j++ ) {
        const bgmBand = processIsmsBGMBand(j);
        results2.push(processFunction2(isms[j-0x40], bgmBand));
      }
      results.push(results2);
    } else {
      const property = isms[i+77];
      const result = func(property);
      results.push(result);
    }
  }
  return results;
};