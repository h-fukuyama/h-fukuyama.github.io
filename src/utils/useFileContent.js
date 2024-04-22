// useFileContent.js
import { useState, useEffect } from 'react';

const useFileContent = (file) => {
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    const readFileContent = async () => { //非同期処理を含む
      try {
        const content = await readFile(file); //ファイルを読み込み
        setFileContent(content); //読み込まれたファイルをsetする
      } catch (error) { //エラー処理
        console.error('Error reading file:', error);
      }
    };

    if (file) {
      readFileContent(); //fileが存在すれば上記のファイル読み込みを開始する
    }
  }, [file]); //useEffectが動くフックとなるもの（fileが変化したか否か）

  const readFile = (file) => {
    return new Promise((resolve, reject) => { //新しいPromise(非同期処理のコンストラクタで、成功時にはresolve,失敗時にはreject関数を渡す)を定義
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = JSON.parse(event.target.result); //fileをJSONとしてparseする
          resolve(content); 
        } catch (parseError) {
          reject(parseError);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file); //fileを読み込みを開始
    });
  };

  return { fileContent };
};

export default useFileContent;
