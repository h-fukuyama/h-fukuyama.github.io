import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFileContext } from '../../fileOperation/FileContext';
import { useDropzone } from 'react-dropzone';
import { checkProperties } from './fileValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const FileInputScreen = () => {
  const navigate = useNavigate();
  const { setFile } = useFileContext();
  const [errors, setErrors] = useState([]);

  const handleFileChange = useCallback((files) => {
    setErrors([]); // エラーメッセージをリセット
    const newErrors = []; // 新しいエラーメッセージを格納する配列

    const fileCount = files.length;
    if (fileCount > 1) {
      newErrors.push('複数のファイルが選択されています。1つのファイルのみを選択してください。');
      setErrors(newErrors); // エラーを設定
      return; // 処理を終了
    }

    const selectedFile = files[0];
    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith('.json')) {
        newErrors.push('JSONファイルを選択してください。');
        setErrors(newErrors); // エラーを設定
        return; // 処理を終了
      } else {
        const reader = new FileReader();
        reader.onload = function (e) {
          try {
            const fileContent = JSON.parse(e.target.result);
            const { isValid, errors } = checkProperties(fileContent, fileCount);
            if (isValid) {
              setFile(selectedFile);
              navigate('/main');
            } else {
              newErrors.push(...errors);
            }
          } catch (error) {
            if (error instanceof SyntaxError) {
              newErrors.push('予期しないJSONファイルです。');
            } else {
              newErrors.push('予期しないエラーが発生しました。');
            }
          } finally {
            if (newErrors.length > 0) {
              setErrors(newErrors); // エラーを設定
            }
          }
        };
        reader.readAsText(selectedFile);
      }
    }
  }, [setFile, navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.json',
    onDrop: handleFileChange,
  });

  const renderErrorMessages = errors.map((error, index) => (
    <p key={index} style={{ color: 'red' }}>{error}</p>
  ));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="box"></div>
        <h1 style={{ marginTop: '30px', flex: 1 }}>PRX-IP5000 configファイル解析アプリ</h1>
      </div>
      <h5 style={{ textAlign: 'right', marginRight: '64px' }}>version 1.03</h5>
      <div style={{ marginLeft: '64px', marginRight: '64px' }}>
        {renderErrorMessages}
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
          <p>
            <b>
              PRX-IP5000のconfigファイル(.json)<br />
              をここにドラッグ&ドロップするか<br />
              クリックしてファイルを一つ選択してください。
            </b>
          </p>
          <div style={{ marginTop: '20px' }}>
            <a
              href="https://st-ui-uradio.usen.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="modern-link"
              onClick={(e) => e.stopPropagation()}
            >
              ステージング環境にログインする。
              <FontAwesomeIcon icon={faExternalLinkAlt} style={{ marginLeft: '5px' }} />
            </a>
            <br />
            <a
              href="https://ui-uradio.usen.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="modern-link"
              onClick={(e) => e.stopPropagation()}
              style={{ marginTop: '10px' }}
            >
              本番環境にログインする。
              <FontAwesomeIcon icon={faExternalLinkAlt} style={{ marginLeft: '5px' }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default FileInputScreen;