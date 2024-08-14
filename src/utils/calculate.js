// １６進数を２進数に変換する
export const hexToBinary = (hexString) => {
  return parseInt(hexString, 16).toString(2).padStart(16, '0');
};

// 特定のビットがセットされているかを確認する
export const checkBit = (binaryString, position) => {
  return binaryString.charAt(binaryString.length - 1 - position) === '1';
};

//符号付16進数を10進数に変換する
export const hexToSignedDecimal = (hexString) => {
  const decimalValue = parseInt(hexString, 16);
  const byteLength = hexString.length / 2; // バイト数を計算
  const maxPositiveValue = Math.pow(2, 8 * byteLength - 1) - 1; // 正の最大値を計算
  const maxValue = Math.pow(2, 8 * byteLength); // 最大値を計算
  return decimalValue > maxPositiveValue ? decimalValue - maxValue : decimalValue;
}


//ボリューム値の変換
export const processVolume = (property, propertyName) => {
  const result = [];

  if (property) {
    const volume = parseInt(property, 16);
    result.push({ property: propertyName, value: `${volume}` });
  } else {
    result.push({ property: propertyName, value: '不明' });
  }

  return result;
};