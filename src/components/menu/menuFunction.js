import { hexToBinary, checkBit, hexToSignedDecimal } from '../../utils/calculate';
import { replaceEQ, eqSetting } from './menuComponentFunction';
import { oneTouch } from '../../utils/checkButton';

  // ここから１行ずつのルール定義に入る------------------------
  export const processFunction1 = (property) => {
    const result1 = [];
    const binaryString = hexToBinary(property);

    const bitDefinitions = [
      { bit: 0, property: 'AUX(ONで「手動」)' },
      { bit: 1, property: 'チャンネルロック' },
      { bit: 2, property: 'ACアウトレット(ONで「連動」)' },
    ];

    bitDefinitions.forEach(({ bit, property }) => {
      const isBitSet = checkBit(binaryString, bit);
      result1.push({ property, value: isBitSet ? 'ON' : 'OFF' });
    });
    return result1;
  };
  export const processFunction2 = (property) => {
    const binary = parseInt(property, 16).toString(2).padStart(16, '0');
    const buttonStatus = binary.slice(0, 14).split('').map(bit => (bit === '0' ? '停止中' : '起動中'));
  
    if (buttonStatus.every(status => status === '停止中')) {
      return [{ property: 'ワンタッチボタン', value: '全て停止中' }];
    }
  
    if (buttonStatus.every(status => status === '起動中')) {
      return [{ property: 'ワンタッチボタン', value: '全て起動中' }];
    }
  
    const activeButtons = buttonStatus.reduce((acc, status, index) => {
      if (status === '起動中') {
        acc.push(index + 1);
      }
      return acc;
    }, []);
    return [{ property: '起動中のワンタッチボタン', value: activeButtons.join(',') }];
  };  
  export const processFunction3 = (property) => {
    const hexDigits = property.match(/.{1,2}/g) || []; // 2桁ずつ配列にセットする
    const chunkSize = 48;
  
    const output = [{ property: '整列順番', value: '' }];
  
    const chunks = [];
    for (let i = 0; i < hexDigits.length; i += chunkSize) {
      const chunk = hexDigits.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
  
    output.push(...chunks.map((chunk, index) => {
      const value = chunk.join(' ');
      const chunkIndex = `${index}巡目`;
      return { property: chunkIndex, value };
    }));
  
    return output;
  };
  export const processFunction4 = (property) => {
    const result4 = [{ property: 'エリア①店内の設定', value: "" }];
    const hexPairs = property.match(/.{1,2}/g);
    hexPairs.map((element, index) => {
      if ( index >= 0 && index <= 2) {
        return result4.push({ property: replaceEQ(index), value: hexToSignedDecimal(element) === 0 ? '±0': hexToSignedDecimal(element) });
      } else {
        return result4.push({ property: '種別', value: eqSetting(element)});
      }
    })
    return result4;
  };
  export const processFunction5 = (property) => {
    const result5 = [{ property: 'エリア②事務所の設定', value: "" }];
    const hexPairs = property.match(/.{1,2}/g);
    hexPairs.map((element, index) => {
      if ( index >= 0 && index <= 2) {
        return result5.push({ property: replaceEQ(index), value: hexToSignedDecimal(element) === 0 ? '±0': hexToSignedDecimal(element) });
      } else {
        return result5.push({ property: '種別', value: eqSetting(element)});
      }
    })
    return result5;
  };
  export const processFunction6 = (property) => {
    const result6 = [{ property: 'エリア③インカムの設定', value: "" }];
    const hexPairs = property.match(/.{1,2}/g);
    hexPairs.map((element, index) => {
      if ( index >= 0 && index <= 2) {
        return result6.push({ property: replaceEQ(index), value: hexToSignedDecimal(element) === 0 ? '±0': hexToSignedDecimal(element) });
      } else {
        return result6.push({ property: '種別', value: eqSetting(element)});
      }
    })
    return result6;
  };
  export const processFunction7 = (property) => {
    return [{property: 'LCDコントラスト', value: parseInt(property,10)}];
  };
  export const processFunction8 = (property) => {
    return [{property: 'LCD明るさ', value: parseInt(property,10)}];
  };
  export const processFunction9 = (property) => {
    return [{property: 'LCDエコモード明るさ', value: parseInt(property,10)}];
  };
  export const processFunction10 = (property) => {
    return [{property: 'LCDエコモード移行時間', value: `${parseInt(property, 10)}分`}];
  };
  export const processFunction11 = (property) => {
    return oneTouch(property,'★ローカルタイマーON番号');
  };
  export const processFunction12 = (property) => {
    return [{property: 'AUX入力レベル', value: hexToSignedDecimal(property)}];
  };
  export const processFunction13 = (property) => {
    return [{property: 'マイク入力レベル', value: hexToSignedDecimal(property)}];
  };
  export const processFunction14 = (property) => {
    return [{property: 'ライン入力レベル', value: hexToSignedDecimal(property)}];
  };
  export const processFunction15 = (property) => {
    return [{property: 'AUTO~AUX終了の無音時間', value: `${parseInt(property, 16)}秒`}];
  };
  export const processFunction16 = (property) => {
    return oneTouch(property,'★ワンタッチボタン自動ON/OFF時間有効');
  };
  export const processFunction17 = (property) => {
    return [{property: '時刻自動補正時間', value: `${parseInt(property, 16)}分`}];
  };
  // ---------------------------------------------------------------------
  export const processFunction997 = (property) => {
    return [{property: 'radiko', value: property === '00' ? "無効" : "有効" }];
  };
  export const processFunction998 = (property) => {
    return [{property: 'プログラム', value: `${parseInt(property, 10)}`}];
  };
  export const processFunction999 = (property) => {
    let allOn = true;
    let allOff = true;
    const results = [];
    for (let i = 0; i < property.length; i += 2) {
      const chunk = property.substring(i, i + 2);
      const buttonNumber = Math.floor(i / 2) + 1;
      const value = chunk === '01' ? 'ON' : 'OFF';
      if (value === 'ON') {
        results.push(buttonNumber);
      }
      if (value === 'OFF') {
        allOn = false;
      } else {
        allOff = false;
      }
    }
    if (allOn) {
      return [{ property: "CM選択スイッチ", value: "全てON" }];
    } else if (allOff) {
      return [{ property: "CM選択スイッチ", value: "全てOFF" }];
    } else {
      return [{ property: "CM選択(ONスイッチ)", value: results.join(',') }];
    }
  };
  // ---------------------------------------------------------------------