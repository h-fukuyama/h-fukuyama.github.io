export const checkButton = (property, buttonCount, buttonDisplayName) => {
  const binary = parseInt(property, 16).toString(2).padStart(16, '0');
  const buttonStatus = binary.slice(-buttonCount).split('').map(bit => (bit === '0' ? '許可': '禁止')).reverse();

  if (buttonStatus.every(status => status === '禁止')){ return [{ property: buttonDisplayName, value: '全て禁止' }];}
  if (buttonStatus.every(status => status === '許可')) { return [{ property: buttonDisplayName, value: '全て許可' }];}
  const activeButtons = buttonStatus.reduce((acc, status, index) => {
    if (status === '許可') {  
      acc.push(index + 1);
    }
    return acc;
  }, []);
  return [{ property: <b>{buttonDisplayName}</b>, value: activeButtons.join(',') }];
};

export const oneTouch = (property, title) => {
  if (property) {
    const binaryString = property.split('').map((hexDigit) => {
      const binaryDigit = parseInt(hexDigit, 16).toString(2).padStart(4, '0');
      return binaryDigit;
    }).join('');
    const buttons = [];
    for (let i = 1; i <= binaryString.length; i++) {
      const value = binaryString[binaryString.length - i] === '1' ? 'ON' : 'OFF';
      buttons.push({ property: i, value });
    }
    const onButtons = buttons.filter(button => button.value === 'ON');
    const onButtonNumbers = onButtons.map(button => button.property).join(',');
    return [{ property: title, value: onButtonNumbers }];
  }
};

// export const channelMask = (property, prefix) => {
//   if (property) {
//     const binaryString = property.split('').map((hexDigit) => parseInt(hexDigit, 16).toString(2).padStart(4, '0')).join('');
//     const groupedResults = {};

//     for (let i = binaryString.length - 1; i >= binaryString.length - 100; i--) {
//       const bitValue = binaryString[i];
//       const buttonName = `${binaryString.length - i}`;
//       const result = { property: buttonName, value: bitValue === '0' ? 'OFF' : 'ON' };
//       console.log(result)
//       if (!groupedResults[result.value]) {
//         groupedResults[result.value] = [];
//       }

//       groupedResults[result.value].push(result);
//     }

//     let resultEntries = [];

//     if (Object.keys(groupedResults).length === 1 && 'ON' in groupedResults) {
//       resultEntries = [{ property: `${prefix}チャンネルマスク`, value: '全てON' }];
//     } else if (Object.keys(groupedResults).length === 1 && 'OFF' in groupedResults) {
//       resultEntries = [{ property: `${prefix}チャンネルマスク`, value: '全てOFF' }];
//     } else {
//       resultEntries = Object.entries(groupedResults)
//         .filter(([value]) => value === 'ON')
//         .map(([value, buttons]) => ({
//           property: `${prefix}チャンネルマスク`,
//           value: `${buttons.map((button) => button.property).join(', ')}`
//         }));
//     }
//     // console.log(`channelMask for ${prefix}:`, resultEntries); 
//     return resultEntries;
//   } else {
//     return [{ property: `${prefix}チャンネルマスク:`, value: '不明' }];
//   }
// };

export const channelMask = (property) => {
  if (property) {
    const binaryString = property.split('').map((hexDigit) => parseInt(hexDigit, 16).toString(2).padStart(4, '0')).join('');
    const onButtons = [];
    for (let i = binaryString.length - 1; i > binaryString.length - 100; i--) {
      if (binaryString[i] === '1') {
        onButtons.push('〇');
      } else {
        onButtons.push('');
      }
    }
    return onButtons;
  }
}