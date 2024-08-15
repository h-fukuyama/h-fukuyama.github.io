export const checkButton = (property, buttonCount, buttonDisplayName) => {
  const result = [];
  const binary = parseInt(property, 16).toString(2).padStart(16, '0');
  const allowedNumbers = [];
  
  for (let i = 0; i < buttonCount; i++) {
    if (binary[i] === '0') {
      allowedNumbers.push(i + 1);
    }
  }
  if (allowedNumbers.length === buttonCount) {
    result.push([{ property: buttonDisplayName, value: "すべて許可" }]);
  } else if (allowedNumbers.length === 0) {
    result.push([{ property: buttonDisplayName, value: "すべて禁止" }]);
  } else {
    result.push([{ property: buttonDisplayName, value: allowedNumbers.join(',') }]);
  }
  return result;
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