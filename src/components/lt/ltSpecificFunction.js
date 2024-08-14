import { BinaryConverter, mapFolderValue, replaceControl, replaceValue } from '../sc/scProcessorFunction';
import { processBGMBand } from '../../utils/bgmBand';
import { hexToSignedDecimal } from '../../utils/calculate';

export const getHour = (lt, startIndex) => lt[startIndex] === '18' ? '--' : parseInt(lt[startIndex], 16).toString().padStart(2, '0');

export const getMinute = (lt, startIndex) => lt[startIndex + 1] === '3C' ? '--' : parseInt(lt[startIndex + 1], 16).toString().padStart(2, '0');

export const getFileName = (lt, startIndex) => [lt[startIndex + 3], lt[startIndex + 7], lt[startIndex + 11], lt[startIndex + 15], lt[startIndex + 19]];

export const getTransformedFolder = (lt, startIndex) => [lt[startIndex + 4], lt[startIndex + 8], lt[startIndex + 12], lt[startIndex + 16], lt[startIndex + 17]].map(mapFolderValue);

export const getTransformedVolume = (lt, startIndex) => [lt[startIndex + 5], lt[startIndex + 9], lt[startIndex + 13], lt[startIndex + 17], lt[startIndex + 20]].map(hexToSignedDecimal);

export const getTransformedMixing = (lt, startIndex) => [lt[startIndex + 6], lt[startIndex + 10], lt[startIndex + 14], lt[startIndex + 18], lt[startIndex + 21]].map(hexValue => parseInt(hexValue, 16));

export const getOutput = (lt, startIndex) => BinaryConverter(lt[startIndex + 23]);

export const getExternal = (lt, startIndex) => [lt[startIndex + 24] === '00' ? '利用しない' : '利用する', parseInt(lt[startIndex + 25], 16), replaceControl(lt[startIndex + 26]), parseInt(lt[startIndex + 27], 16)];

export const getExternal2 = (lt, startIndex) => [lt[startIndex + 40] === '00' ? '利用しない' : '利用する', parseInt(lt[startIndex + 41], 16), replaceControl(lt[startIndex + 42]), parseInt(lt[startIndex + 43], 16)];

export const getExternal3 = (lt, startIndex) => [parseInt(lt[startIndex + 44], 16), replaceControl(lt[startIndex + 45]), parseInt(lt[startIndex + 46], 16)];

export const getChannelName = (lt, startIndex) => {
    switch (lt[startIndex + 29]) {
        case '00':
            const num = lt[startIndex + 33] === '00' ? "" : parseInt(lt[startIndex + 33], 16);
            return `${processBGMBand(lt[startIndex + 32])}${num}`;
        case '01':
            return lt[startIndex + 30] === '00' ? '未設定' : `プログラム${lt[startIndex + 30]}`;
        case '02':
            return lt[startIndex + 31];
        default:
            return '不明';
    }
};

export const getPower = (lt, startIndex) => replaceValue(lt[startIndex + 34]);

export const getChannel = (lt, startIndex) => {
    if (lt[startIndex + 35] === '00') {
        const num = parseInt(lt[startIndex + 39], 16) === 0 ? '' : parseInt(lt[startIndex + 39], 16);
        return `${processBGMBand(lt[startIndex + 38])}${num}`;
    } else if (lt[startIndex + 35] === '01') {
        return `プログラム${lt[startIndex + 36] === '00' ? "未設定" : lt[startIndex + 36]}`;
    } else if (lt[startIndex + 35] === '02') {
        return lt[startIndex + 37];
    }
};


