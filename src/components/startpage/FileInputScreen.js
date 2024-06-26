import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFileContext } from '../../fileOperation/FileContext';
import { useDropzone } from 'react-dropzone';
import { checkProperties } from './fileValidation';

const FileInputScreen = () => {
  const navigate = useNavigate();
  const { setFile } = useFileContext();
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
            setFile(selectedFile);
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
  const renderErrorMessages = errors.map((error, index) => (
    <p key={index} style={{ color: 'red' }}>{error}</p>
  ));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="box"></div>
        <h1 style={{ marginTop: '30px', flex: 1 }}>PRX-IP5000 configファイル解析アプリ</h1></div>
      <h5 style={{ textAlign: 'right', marginRight: '64px' }}>version 1.0</h5>
      <div style={{ marginLeft: '64px', marginRight: '64px' }}>
        <b>{renderErrorMessages}</b>
        <div
          {...getRootProps({
            style: {
              border: '2px dashed #cccccc',
              borderRadius: '4px',
              padding: '20px',
              marginBottom: '20px',
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
