import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFileContext } from '../../context/FileContext';
import { useDropzone } from 'react-dropzone';

const FileInputScreen = () => {
  const navigate = useNavigate();
  const { setFileContext } = useFileContext();
  const [errors, setErrors] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.json',
    maxFiles: 1,
    onDrop: handleFileChange,
  });  

  function handleFileChange(files) {
    const selectedFile = files[0];
    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith('.json')) {
        setErrors(['JSON ファイルを選択してください。']);
        return;
      }
  
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const fileContent = JSON.parse(e.target.result);
          const { isValid, errors } = checkProperties(fileContent);
          if (isValid) {
            setFileContext(selectedFile);
            navigate('/main');
          } else {
            setErrors(errors);
          }
        } catch (error) {
          if (error instanceof SyntaxError) {
            setErrors(['予期しないJSONファイルです。']);
          } else {
            setErrors(['予期しないエラーが発生しました。']);
          }
        }
      };
      reader.readAsText(selectedFile);
    }
  }
  
  
  function checkProperties(fileContent) {
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
    
  const renderErrorMessages = errors.map((error, index) => (
    <p key={index} style={{ color: 'red' }}>{error}</p>
  ));

  return (
    <div>
      <div  style={{ display: 'flex', alignItems: 'center' }}>
      <div className="box"></div>
        <h1 style={{ marginTop: '30px', flex: 1 }}>PRX-IP5000 configファイル解析アプリ</h1></div>
        <h5 style={{ textAlign: 'right', marginRight: '64px' }}>version 1.0</h5>
      <div style={{marginLeft: '64px', marginRight: '64px'}}>  
      <b>{renderErrorMessages}</b>
      <div
        {...getRootProps({
          style: {
            border: '2px dashed #cccccc',
            borderRadius: '4px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            ...(isDragActive && { border: '2px dashed #2196F3' }), // ドラッグ中のスタイル
          },
        })}
      >
        <input {...getInputProps()} />
        <p><b>PRX-IP5000のconfigファイル(.json)<br />をここにドラッグ&ドロップするか<br />クリックしてファイルを一つ選択してください。</b></p>
      </div>
      </div>
    </div>
  );
};

export default FileInputScreen;
