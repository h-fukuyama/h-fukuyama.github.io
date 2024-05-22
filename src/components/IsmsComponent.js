// IsmsComponent.js
import React, {useState, useEffect} from 'react';
import { processIsmsBGMBand } from '../utils/bgmBand';
import { hexToBinary, checkBit } from '../utils/calculate';
import { channelMask } from '../utils/checkButton';
import useFileNavigation from './useFileNavigation';
import Header from './Header';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

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

  console.log('categories:', categories); // 追加: デバッグのためのログ

  return categories;
};


const StickyHeaderTable = (width, zIndex, left) => {
  return {
    position: "sticky",
    left: left,
    background: "white",
    width: width,
    zIndex: zIndex,
  };
}

const renderMatrix = (data, title) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: '70%', margin: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell className="MuiTableCell-stickyHeader" colSpan={100} align="center">{title}</StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell className="MuiTableCell-stickyHeader MuiTableCell-firstColumn">Property</StyledTableCell>
            {Array.from({ length: 99 }, (_, i) => (
              <StyledTableCell key={i} align="center" className="MuiTableCell-stickyHeader">{i + 1}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              <StyledTableCell className="MuiTableCell-firstColumn">{item.property}</StyledTableCell>
              {Array.from({ length: 99 }, (_, colIndex) => (
                <TableCell
                  key={colIndex}
                  style={{ backgroundColor: item.value.split(', ').includes(`${colIndex + 1}`) ? 'lightgreen' : 'white' }}
                >
                  {item.value.split(', ').includes(`${colIndex + 1}`) ? '〇' : ''}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


const StyledTableCell = styled(TableCell)(({ theme, isOn }) => ({
  backgroundColor: isOn ? theme.palette.success.light : 'inherit',
  color: isOn ? theme.palette.success.contrastText : 'inherit',
  textAlign: 'center',
}));

export const IsmsComponent = () => {
  const { fileContent } = useFileNavigation();
  const [ results_all, setResultsAll] = useState([]);
  const [ categories, setCategories ] = useState({});
  useEffect(() => {
    const results_all = [];
    for (let i = 0x41; i <= 0x8E; i++) {
      const bgmBand = processIsmsBGMBand(i);
      results_all.push(channelMask(fileContent?.if_config?.isms[i - 0x40], bgmBand));
    }
  
    const flattenedResultsAll = results_all.flat(); // `results_all` がネストされている場合にフラット化
  
    console.log('flattenedResultsAll:', flattenedResultsAll); // 追加: デバッグのためのログ
  
    setResultsAll(flattenedResultsAll);
    setCategories(processResults(flattenedResultsAll));
  }, [fileContent]);

   console.log(results_all);
    return (
      <div>
        <Header />
        <div>
          <div style={{margin: '50px'}}>{categories['A-Z'] && renderMatrix(categories['A-Z'], 'A-Z チャンネルマスク')}</div>
          <div style={{margin: '50px'}}>{categories['UA-UZ'] && renderMatrix(categories['UA-UZ'], 'UA-UZ チャンネルマスク')}</div>
          <div style={{margin: '50px'}}>{categories['ZA-ZZ'] && renderMatrix(categories['ZA-ZZ'], 'ZA-ZZ チャンネルマスク')}</div>
        </div>
      </div>
    );
};


export default IsmsComponent;

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