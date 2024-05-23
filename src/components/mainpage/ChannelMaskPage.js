// IsmsComponent.js
import React, {useState, useEffect, useRef} from 'react';
import { processIsmsBGMBand } from '../../utils/bgmBand';
import { hexToBinary, checkBit } from '../../utils/calculate';
import { channelMask } from '../../utils/checkButton';
import useFileNavigation from '../useFileNavigation';
import Header from '../Header';
import { renderMatrix } from '../isms/renderMatrixComponent';
import Sidebar from '../Sidebar';

 // ここから１行ずつのルール定義に入る(1~33行目)------------------------
 const processFunction1 = (property) => {
  const result1 = [];
  const binaryString = hexToBinary(property);

  const bitDefinitions = [
    { bit: 3, property: '初期設定(「有効」で完了)' },
    { bit: 4, property: 'スタッフコール' },
    { bit: 5, property: 'ワンタッチボタン' },
    { bit: 6, property: 'ローカルタイマー' },
    { bit: 7, property: 'オリジナル録音' },
    { bit: 8, property: 'バックアップBGM' },
    { bit: 9, property: 'オフラインモード' },
  ];

  bitDefinitions.forEach(({ bit, property }) => {
    const isBitSet = checkBit(binaryString, bit);
    result1.push({ property, value: isBitSet ? '有効' : '無効' });
  });

  return result1;
};
//チャンネルマスク
const processFunction2 = (property, prefix) => {
  const channelMaskResult = channelMask(property, prefix);
  return {
    property: channelMaskResult[0].property,
    value: Array.isArray(channelMaskResult) ? channelMaskResult[0].value : '不明'
  };
};
//未使用
const processFunction3 = (property) => {
  return [{ property, value: "未使用" }];
};
const processFunction4 = (property) => {
  if (property === "00") {
    return [{ property: 'DNS設定', value: '自動' }];
  } else if (property === "01") {
    return [{ property: 'DNS設定', value: '手動' }];
  } else {
    return [{ property: 'DNS設定', value: '不明' }];
  }
};
const processFunction5 = (property) => {
  let result5 = '';
  if ( property ){
    for (let i = 0; i < property.length; i += 2) {
      const twoBits = property.substr(i, 2);
      const decimalValue = parseInt(twoBits, 2);
      const formattedDecimal = decimalValue.toString();
      result5 += formattedDecimal;
      if (i < property.length - 2) {
        result5 += '.';
      }
    }
  } else {
    return [{ property: 'DNSプライマリ', value: '不明' }];
  }
  return [{ property: 'DNSプライマリ', value: result5 }];
};
const processFunction6 = (property) => {
  let result6 = '';
  if (property) {
    for (let i = 0; i < property.length; i += 2) {
      const twoBits = property.substr(i, 2);
      const decimalValue = parseInt(twoBits, 16);
      const formattedDecimal = decimalValue.toString();
      result6 += formattedDecimal;
      if (i < property.length - 2) {
        result6 += '.';
      }
    }
  } else {
    return [{ property: 'DNSセカンダリ', value: '不明' }];
  }
  return [{ property: 'DNSセカンダリ', value: result6 }];
};
//未使用
const processFunction7 = (property) => {
  return [{ property, value: "未使用" }];
};
//未使用
const processFunction8 = (property) => {
  return [{ property, value: "未使用" }];
};
//未使用
const processFunction9 = (property) => {
  return [{ property, value: "未使用" }];
};
//未使用
const processFunction10 = (property) => {
  return [{ property, value: "未使用" }];
};
//未使用
const processFunction11 = (property) => {
  return [{ property, value: "未使用" }];
};
const processFunction12 = (property) => {
  if ( property === '00' ) {
    return [{ property: '放送優先順位', value: 'ローカルタイマ > タイムテーブル > ワンタッチ分指定 > ワンタッチ連続' }];
  } else if ( property === '01' ) {
    return [{ property: '放送優先順位', value: 'ローカルタイマ > タイムテーブル > ワンタッチ連続 > ワンタッチ分指定' }];
  } else if ( property === '02' ) {
    return [{ property: '放送優先順位', value: 'ワンタッチ分指定 > ローカルタイマ > タイムテーブル > ワンタッチ連続' }];
  } else if ( property === '03' ) {
    return [{ property: '放送優先順位', value: 'ワンタッチ分指定 > ワンタッチ連続 > ローカルタイマ > タイムテーブル' }];
  } else if ( property === '04' ) {
    return [{ property: '放送優先順位', value: 'ワンタッチ連続 > ワンタッチ分指定 > ローカルタイマ > タイムテーブル' }];
  } else if ( property === '05' ) {
    return [{ property: '放送優先順位', value: ' ワンタッチ連続 > ローカルタイマ > タイムテーブル > ワンタッチ分指定' }];
  } else {
    return [{ property: '放送優先順位', value: '不明' }];
  }
};
const processFunction13 = (property) => {
  if (property === "00") {
    return [{ property: 'AUX優先順位エリア①店内', value: 'low' }];
  } else if (property === "01") {
    return [{ property: 'AUX優先順位エリア①店内', value: 'high' }];
  } else {
    return [{ property: 'AUX優先順位エリア①店内', value: '不明' }];
  }
};
const processFunction14 = (property) => {
  if (property === "00") {
    return [{ property: 'AUX優先順位エリア②事務所', value: 'low' }];
  } else if (property === "01") {
    return [{ property: 'AUX優先順位エリア②事務所', value: 'high' }];
  } else {
    return [{ property: 'AUX優先順位エリア②事務所', value: '不明' }];
  }
};
// ここまで-----------------------------------------------------------

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