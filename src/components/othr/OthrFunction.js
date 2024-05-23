import React from 'react';
import { processBGMBand } from '../../utils/bgmBand';
import { processVolume } from '../../utils/processVolume';
import { hexToBinary, checkBit, hexToSignedDecimal } from '../../utils/calculate';
import { checkButton } from '../../utils/checkButton';

  // ここから１行ずつのルール定義に入る(1~33行目)------------------------
export const processFunction1 = (property) => {
  const result1 = [];
  const binaryString = hexToBinary(property);

  const bitDefinitions = [
    { bit: 0, property: 'タイムテーブル(ONで有効)' },
    { bit: 1, property: '店内BGMカット' },
    { bit: 2, property: '事務所BGMカット' },
    { bit: 3, property: '店内CMカット' },
    { bit: 4, property: '事務所CMカット' },
    { bit: 9, property: 'バックアップ(ONで有効)' },
    { bit: 10, property: '店内ワンタッチ分指定カット' },
    { bit: 11, property: '事務所ワンタッチ分指定カット' },
    { bit: 12, property: 'インカムCMカット' },
    { bit: 13, property: 'インカムワンタッチ分指定カット' },
    { bit: 14, property: 'インカム音量(ON=インカム/OFF=ライン)' },
    { bit: 15, property: 'ログファイル複製(ON=済/OFF=未)' },
  ];

  bitDefinitions.forEach(({ bit, property }) => {
    const isBitSet = checkBit(binaryString, bit);
    result1.push({ property, value: isBitSet ? 'ON' : 'OFF' });
  });

  return result1;
};
//未使用
export const processFunction2 = (property) => {
  const result2 = [];
  result2.push({ property, value: "未使用" });

  return result2;
};
//未使用
export const processFunction3 = (property) => {
  const result3 = [];
  result3.push({ property, value: "未使用" });
  return result3;
};
//未使用
export const processFunction4 = (property) => {
  const result4 = [];
  result4.push({ property, value: "未使用" });  

  return result4;
};
//未使用
export const processFunction5 = (property) => {
  const result5 = [];
  result5.push({ property, value: "未使用" });

  return result5;
};
export const processFunction6 = (property) => {
  const result6 = [];
  result6.push({ property: "radiko放送局名", value: (property ? property.trim() : "") || '未設定' })

  return result6;
};
export const processFunction7 = (property) => {
  const result7 = [];
  if (property) {
    const firstTwoDigits = property.substring(0, 2);
    const lastTwoDigits = parseInt(property.substring(2), 16);
    const bgm = processBGMBand(firstTwoDigits);
    result7.push({ property: 'BGMバンド', value: `${bgm}${lastTwoDigits}` });
  } else {
    result7.push({ property: 'BGMバンド', value: '未設定' });
  }

  return result7;
};
export const processFunction8 = (property) => {
  const result8 = [];
  if (property) {
    const firstTwoDigits = property.substring(0, 2);
    const lastTwoDigits = parseInt(property.substring(2), 16);
    const bgm = processBGMBand(firstTwoDigits);
    result8.push({ property: '最大BGMバンド', value: `${bgm}${lastTwoDigits}` });
  } else {
    result8.push({ property: '最大BGMバンド', value: '未設定' });
  }
  return result8;
};
export const processFunction9 = (property) => {
  const result9 = [];
  if (property) {
    const firstTwoDigits = parseInt(property.substring(0, 2), 16);
    if(firstTwoDigits === 0) {
      result9.push({ property: '範囲外チャンネル', value: '未設定' })
    } else {
      result9.push({ property: '範囲外チャンネル', value: `${firstTwoDigits}` })
    }
  } else {
    result9.push({ property: '範囲外チャンネル', value: '未設定' })
  }
  return result9;
};
export const processFunction10 = (property) => {
  const result10 = [];
  if (property) {
    const band = processBGMBand(property);
    result10.push({ property: '範囲外バンド', value: `${band}` });
  } else {
    result10.push({ property: '範囲外バンド', value: '未設定' });
  }
  return result10;
};
export const processFunction11 = (property) => {
  const result11 = [];
  if (property) {
    const band = processBGMBand(property);
    result11.push({ property: '保存用バンド', value: `${band}` });
  } else {
    result11.push({ property: '保存用バンド', value: '未設定' });
  }
  return result11;
};
export const processFunction12 = (property) => {
  return processVolume(property, '店内音量');
};
export const processFunction13 = (property) => {
  const result13 = [];
  if (property) {
    const volume = parseInt(property, 16);
    if (volume === 255 ) {
      result13.push({ property: '店内音量基準値', value: '未設定' });
    } else {
      result13.push({ property: '店内音量基準値', value: `${volume}` });
    }
  } else {
    result13.push({ property: '店内音量基準値', value: '不明' });
  }
  return result13;
};
export const processFunction14 = (property) => {
  return processVolume(property, '事務所音量');
};
export const processFunction15 = (property) => {
  const result15 = [];
  if (property) {
    const volume = parseInt(property, 16);
    if (volume === 255 ) {
      result15.push({ property: '事務所音量基準値', value: '未設定' });
    } else {
      result15.push({ property: '事務所音量基準値', value: `${volume}` });
    }
  } else {
    result15.push({ property: '事務所音量基準値', value: '不明' });
  }
  return result15;
};
export const processFunction16 = (property) => {
  const result16 = [];
  if (property) {
    const volume = parseInt(property, 16);
    result16.push({ property: '店内CMバランス', value: `${volume}%` });
  } else {
    result16.push({ property: '店内CMバランス', value: '不明' });
  }
  return result16;
};
export const processFunction17 = (property) => {
  const result17 = [];
  if (property) {
    const volume = parseInt(property, 16);
    result17.push({ property: '店内CMバランス基準値', value: `${volume}%` });
  } else {
    result17.push({ property: '店内バランス基準値', value: '不明' });
  }
  return result17;
};
export const processFunction18 = (property) => {
  const result18 = [];
  if (property) {
    const volume = parseInt(property, 16);
    result18.push({ property: '事務所CMバランス', value: `${volume}%` });
  } else {
    result18.push({ property: '事務所CMバランス', value: '不明' });
  }
  return result18;
};
export const processFunction19 = (property) => {
  const result19 = [];
  if (property) {
    const volume = parseInt(property, 16);
    result19.push({ property: '事務所CMバランス基準値', value: `${volume}%` });
  } else {
    result19.push({ property: '事務所CMバランス基準値', value: '不明' });
  }
  return result19;
};
export const processFunction20 = (property) => {
  return processVolume(property, 'インカム音量ライン出力');
};
export const processFunction21 = (property) => {
  const result21 = [];
  if (property) {
    const volume = hexToSignedDecimal(parseInt(property, 16));
    result21.push({ property: 'インカム音量インカム出力', value: `${volume}` });
  } else {
    result21.push({ property: 'インカム音量インカム出力', value: '不明' });
  }
  return result21;
};
export const processFunction22 = (property) => {
  const result22 = [];
  if (property) {
    const volume = parseInt(property, 16);
    if (volume === 255 ) {
      result22.push({ property: 'インカム音量ライン出力基準値', value: '未設定' });
    } else {
      result22.push({ property: 'インカム音量ライン出力基準値', value: `${volume}` });
    }
  } else {
    result22.push({ property: 'インカム音量ライン出力基準値', value: '不明' });
  }
  return result22;
};
export const processFunction23 = (property) => {
  const result23 = [];
  if (property) {
    const volume = hexToSignedDecimal(property, 16);
    if (volume === 255 ) {
      result23.push({ property: 'インカム音量インカム出力基準値', value: '未設定' });
    } else {
      result23.push({ property: 'インカム音量インカム出力基準値', value: `${volume}` });
    }
  } else {
    result23.push({ property: 'インカム音量インカム出力基準値', value: '不明' });
  }
  return result23;
};
export const processFunction24 = (property) => {
  return processVolume(property, 'イヤホン音量値');
};
export const processFunction25 = (property) => {
  return processVolume(property, '再生/試聴店内音量値');
};
export const processFunction26 = (property) => {
  return processVolume(property, '再生/試聴事務所音量値');
};
export const processFunction27 = (property) => {
  return processVolume(property, '再生/試聴インカム音量値ライン');
};
export const processFunction28 = (property) => {
  const result28 = [];
  if (property) {
    const volume = hexToSignedDecimal(parseInt(property, 16));
    result28.push({ property: '再生/試聴インカム音量値インカム', value: `${volume}` });
  } else {
    result28.push({ property: '再生/試聴インカム音量値インカム', value: '不明' });
  }
  return result28;
};
export const processFunction29 = (property) => {
  const result29 = [];
  if (property) {
    const second = parseInt(property, 16);
    result29.push({ property: 'CM総長', value: `${second}秒` });
  } else {
    result29.push({ property: 'CM総長', value: '不明' })
  }
  return result29;
};
//ルールがあってるか確認が必要？
export const processFunction30 = (property) => {
  return checkButton(property, 14, 'ワンタッチ変更許可ボタン');
};
export const processFunction31 = (property) => {
  const results31 = [];
  if (property) {
    const binaryArray = property.split('').map((hexDigit) => {
        const binaryDigit = parseInt(hexDigit, 16).toString(2).padStart(4, '0');
        return binaryDigit;
    });
    const binaryString = binaryArray.join('');
    for (let i = 399; i >= 0; i--) {
        const bitValue = binaryString[i];
        const buttonName = `${400 - i}`;
        const result = { property: buttonName, value: bitValue === '0' ? '許可' : '禁止' };
        results31.push(result);
    }
    const deniedButtons = results31.filter((result) => result.value === '禁止');
    const propertyString = deniedButtons.map(result => result.property).join(',');
    if (results31.every((result) => result.value === '許可')) {
        return [{ property: 'スタッフコール無線①変更', value: '全て許可' }];
    } else if (results31.every((result) => result.value === '禁止')) {
        return [{ property: 'スタッフコール無線①変更', value: '全て禁止' }];
    }
    return [{ property: <b>スタッフコール無線①変更禁止ボタン</b>, value: propertyString }];
  } else {
    return [{ property: 'スタッフコール無線①変更', value: '不明' }];
  }
};

export const processFunction32 = (property) => {
  return checkButton(property, 16, 'スタッフコール無線②変更許可ボタン');
};
export const processFunction33 = (property) => {
  return checkButton(property, 16, 'スタッフコール有線許可ボタン');
};

// ここまで-----------------------------------------------------------
