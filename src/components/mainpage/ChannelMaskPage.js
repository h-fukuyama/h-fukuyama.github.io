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
};
export default IsmsComponent;