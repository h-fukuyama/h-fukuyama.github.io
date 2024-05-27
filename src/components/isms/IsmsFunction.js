import { hexToBinary, checkBit } from '../../utils/calculate';
import { processIsmsBGMBand } from '../../utils/bgmBand';

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

 // ここから１行ずつのルール定義に入る(1~33行目)------------------------
 export const processFunction1 = (property) => {
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
export const processFunction2 = () => {
};
//未使用
export const processFunction3 = (property) => {
  return [{ property, value: "未使用" }];
};
export const processFunction4 = (property) => {
  if (property === "00") {
    return [{ property: 'DNS設定', value: '自動' }];
  } else if (property === "01") {
    return [{ property: 'DNS設定', value: '手動' }];
  } else {
    return [{ property: 'DNS設定', value: '不明' }];
  }
};
export const processFunction5 = (property) => {
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
export const processFunction6 = (property) => {
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
export const processFunction7 = (property) => {
  return [{ property, value: "未使用" }];
};
//未使用
export const processFunction8 = (property) => {
  return [{ property, value: "未使用" }];
};
//未使用
export const processFunction9 = (property) => {
  return [{ property, value: "未使用" }];
};
//未使用
export const processFunction10 = (property) => {
  return [{ property, value: "未使用" }];
};
//未使用
export const processFunction11 = (property) => {
  return [{ property, value: "未使用" }];
};
export const processFunction12 = (property) => {
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
export const processFunction13 = (property) => {
  if (property === "00") {
    return [{ property: 'AUX優先順位エリア①店内', value: 'low' }];
  } else if (property === "01") {
    return [{ property: 'AUX優先順位エリア①店内', value: 'high' }];
  } else {
    return [{ property: 'AUX優先順位エリア①店内', value: '不明' }];
  }
};
export const processFunction14 = (property) => {
  if (property === "00") {
    return [{ property: 'AUX優先順位エリア②事務所', value: 'low' }];
  } else if (property === "01") {
    return [{ property: 'AUX優先順位エリア②事務所', value: 'high' }];
  } else {
    return [{ property: 'AUX優先順位エリア②事務所', value: '不明' }];
  }
};
// ここまで-----------------------------------------------------------
