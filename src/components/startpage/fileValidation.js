export function checkProperties(fileContent) {
    const newErrors = [];
    if (fileContent) {
      if(fileContent.if_config?.othr === undefined) {
        newErrors.push('othrプロパティが存在しません。');
      } else if (fileContent.if_config?.othr?.length !== 33) {
        const length = fileContent.if_config?.othr?.length
        newErrors.push('othrプロパティの要素数が不正です。(正常な要素数: 33, アップロードファイルのothr要素数: ' +length+')');
      } 
      if(fileContent.if_config?.isms === undefined) {
        newErrors.push('ismsプロパティが存在しません。');
      } else if (fileContent.if_config?.isms?.length !== 91) {
        const length = fileContent.if_config?.isms?.length
        newErrors.push('ismsプロパティの要素数が不正です。(正常な要素数: 91, アップロードファイルのisms要素数: ' +length+')');
      } 
      if(fileContent.if_config?.menu === undefined) {
        newErrors.push('menuプロパティが存在しません。');
      } else if (fileContent.if_config?.menu?.length !== 1000) {
        const length = fileContent.if_config?.menu?.length
        newErrors.push('menuプロパティの要素数が不正です。(正常な要素数: 1000, アップロードされたmenu要素数: ' +length+')');
      }
      if(fileContent.if_config?.sc === undefined) {
        newErrors.push('scプロパティが存在しません。');
      } else if (fileContent.if_config?.sc?.length !== 45696) {
        const length = fileContent.if_config?.sc?.length
        newErrors.push('scプロパティの要素数が不正です。(正常な要素数: 45696, アップロードされたsc要素数: ' +length+')');
      }
      if(fileContent.if_config?.lt === undefined) {
        newErrors.push('ltプロパティが存在しません。');
      } else if (fileContent.if_config?.lt?.length !== 32914) {
        const length = fileContent.if_config?.lt?.length
        newErrors.push('ltプロパティの要素数が不正です。(正常な要素数: 32914, アップロードされたlt要素数: ' +length+')');
      }
      if (newErrors.length === 0) {
        return { isValid: true, errors: [] };
      }
      return { isValid: false, errors: newErrors };
    }
    return { isValid: false, errors: ['予期しないJSONファイルです。'] };
  }