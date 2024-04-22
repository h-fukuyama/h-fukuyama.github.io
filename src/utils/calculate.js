import bigInt from 'big-integer';

// １６進数を２進数に変換するヘルパー関数
export const hexToBinary = (hexString) => {
  return parseInt(hexString, 16).toString(2).padStart(16, '0');
};

// 特定のビットがセットされているかを確認するヘルパー関数
export const checkBit = (binaryString, position) => {
  return binaryString.charAt(binaryString.length - 1 - position) === '1';
};

//符号付16進数を10進数に変換するヘルパー関数
export const hexToSignedDecimal = (hexString) => {
  const decimalValue = parseInt(hexString, 16);
  return decimalValue > 0x7FFFFFFF ? decimalValue - 0x100000000 : decimalValue;
}

export const bigHexToBinary = (hexString) => {
  const bigIntValue = bigInt(hexString, 16);
  const binaryString = bigIntValue.toString(2);
  const paddedBinaryString = binaryString.padStart(32, '0');
  return paddedBinaryString;
};