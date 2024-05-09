import React, { useEffect,useRef,useState } from 'react';
import { useFileContext } from '../context/FileContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import useFileContent from '../utils/useFileContent';
import { ScProcessor1, ScProcessor2 } from './ScComponent'
import { ScTable1, ScTable2 } from '../utils/sc/scTable';
import { MenuTable } from '../utils/menu/menuTable';
import { MenuProcessor3 } from './MenuComponent';
import { hexToBinary } from '../utils/calculate';
import { LtMainTable } from '../utils/lt/ltMainTable';
import { oneTouch } from '../utils/checkButton';

const MainComponent = () => {
  const { file } = useFileContext();
  const { fileContent } = useFileContent(file);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (!file) {
      navigate('/#/reset');
    }
  }, [file, navigate]);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop-80);
  const staffCall = useRef(null);
  const oneTouchButton = useRef(null);
  const localTimer = useRef(null);

  const datasets1 = ScProcessor1({ sc: fileContent?.if_config?.sc || [] });
  const datasets2 = ScProcessor2({ sc: fileContent?.if_config?.sc || [] });

  const datasets3 = MenuProcessor3({ menu: fileContent?.if_config?.menu || [] });

  const info = fileContent;
  console.log(info);
  const lt = fileContent?.if_config?.lt;
  const menu = fileContent?.if_config?.menu[10];
  const datasets4 = [];
  if(lt&&menu){
    const ltOn = oneTouch(menu, '');
    for( let i = 1; i <= 7; i++ ){
      const title = lt[((i-1)*4702)+1]? lt[((i-1)*4702)+1] : 'ローカルタイマー'+i+'(ユーザ未定義)';
      const numbers = ltOn[0].value.split(',').map(Number);
      datasets4.push([numbers.includes(i) ? 'ON' : 'OFF',i,hexToBinary(lt[(i-1)*4702]),title]);
    }
  }

  return (
    <div>
      {file && (
        <div>
          <Header/>
          <div id="sidebar">
            {/* サイドバー */}
            <ul><b>
              <li onClick={() => scrollToRef(staffCall)}>スタッフコール</li>
              <li onClick={() => scrollToRef(oneTouchButton)}>ワンタッチボタン</li>
              <li onClick={() => scrollToRef(localTimer)}>ローカルタイマー</li>
            </b></ul>
          </div>
          <div id="main-content">
            <h2>Main Page</h2>
            <p>ファイル名: {file.name}</p>
            {fileContent? (
              <>
                <div>
                  <button id='info' onClick={toggleVisibility}>
                    {isVisible ? '機器情報一覧非表示' : '機器情報一覧表示'}
                  </button>
                  {isVisible && 
                  <div style={{ display: 'flex' }}>
                    <div style={{flex: 1}}>
                      <table class='infoTable'>
                        <tbody>
                          <tr><td style={{textAlign: 'left'}} colSpan={2}><b>■ バージョン</b></td></tr>
                            <tr>
                              <th>BGMボード</th>
                              <td>{info.version.bgmVer}</td>
                            </tr>
                            <tr>
                              <th>フロントボード</th>
                              <td>{info.version.frontVer}</td>
                            </tr>
                            <tr><td></td></tr>   
                          <tr><td style={{textAlign: 'left'}} colSpan={2}><b>■ ネットワーク</b></td></tr>
                            <tr>
                              <th>IPアドレス</th>
                              <td>{info.network.ipAddress}</td>
                            </tr>
                            <tr>
                              <th>サブネットマスク</th>
                              <td>{info.network.subNetMask}</td>
                            </tr>
                            <tr>
                              <th>デフォルトゲートウェイ</th>
                              <td>{info.network.defaultGw}</td>
                            </tr>
                            <tr>
                              <th>BGM IPアドレス</th>
                              <td>{info.network.bgmIpAddress}</td>
                            </tr>
                            <tr>
                              <th>BGM サブネットマスク</th>
                              <td>{info.network.bgmSubNetMask}</td>
                            </tr>
                            <tr>
                              <th>BGM デフォルトゲートウェイ</th>
                              <td>{info.network.bgmDefaultGw}</td>
                            </tr>
                            <tr>
                              <th>プライマリーDNS</th>
                              <td>{info.network.priDns}</td>
                            </tr>
                            <tr>
                              <th>セカンダリーDNS</th>
                              <td>{info.network.scnDns}</td>
                            </tr>
                            <tr>
                              <th>ターシャリーDNS</th>
                              <td>{info.network.terDns}</td>
                            </tr>
                            <tr>
                              <th>アジャストモード</th>
                              <td>{info.network.adjustMode? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>プライマリーNTPサーバーURL</th>
                              <td>{info.network.priNtpServerUrl}</td>
                            </tr>
                            <tr>
                              <th>セカンダリーNTPサーバーURL</th>
                              <td>{info.network.scnNtpServerUrl}</td>
                            </tr>
                            <tr>
                              <th>DHCP設定</th>
                              <td>{info.network.dhcp? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>DNS設定</th>
                              <td>{info.network.dhcp? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>プロキシサーバー</th>
                              <td>{info.network.proxyServer}</td>
                            </tr>
                            <tr>
                              <th>MTU</th>
                              <td>{info.network.mtu}秒</td>
                            </tr>
                            <tr>
                              <th>バンド長</th>
                              <td>{info.network.bandwidth}</td>
                            </tr>
                            <tr><td></td></tr>
                          <tr><td style={{textAlign: 'left'}} colSpan={2}><b>■ サーバー情報</b></td></tr>
                            <tr>
                              <th>コネクトモード</th>
                              <td>{info.serverInfo.connectMode? 'ON' : 'OFF'}</td>
                            </tr>
                            <tr>
                              <th>ダウンロードURL</th>
                              <td>{info.serverInfo.downloadUrl}</td>
                            </tr>
                            <tr>
                              <th>アップロードURL</th>
                              <td>{info.serverInfo.uploadUrl}</td>
                            </tr>
                            <tr>
                              <th>WEB URL</th>
                              <td>{info.serverInfo.webUrl}</td>
                            </tr>
                            <tr><td></td></tr>
                          <tr><td style={{textAlign: 'left'}} colSpan={2}><b>■ 格納情報</b></td></tr>
                            <tr>
                              <th>subCh</th>
                              <td>{info.restore.subch}</td>
                            </tr>
                            <tr>
                              <th>ラジオチャンネル情報</th>
                            </tr>
                            
                        </tbody>
                      </table>
                    </div>
                    <div style={{ flex: 1 }}>
                      <table class='infoTable'>
                        <tbody>
                          <tr><td style={{textAlign: 'left'}} colSpan={2}><b>■ パラメーター値</b></td></tr>
                            <tr>
                              <th>Base Level</th>
                              <td>{info.param.baseLevel}</td>
                            </tr>
                            <tr>
                              <th>channel</th>
                              <td>{info.param.channel? 'ON(1)' : 'OFF(0)'}</td>
                            </tr>
                            <tr>
                              <th>subChannel</th>
                              <td>{info.param.subChannel? 'ON(1)' : 'OFF(0)'}</td>
                            </tr>
                            <tr>
                              <th>サウンドOFFインターバル</th>
                              <td>{info.param.soundOffInterval}</td>
                            </tr>
                            <tr>
                              <th>Auto AUX</th>
                              <td>{info.param.autoAux? 'ON(1)' : 'OFF(0)'}</td>
                            </tr>
                            <tr>
                              <th>AUX Recovery Time</th>
                              <td>{info.param.auxRecoveryTime}</td>
                            </tr>
                            <tr>
                              <th>カスタマーTEL</th>
                              <td>{info.param.customerTel}</td>
                            </tr>
                            <tr>
                              <th>企業名</th>
                              <td>{info.param.settingPlaceName}</td>
                            </tr>
                            <tr>
                              <th>ファイルリストディレクトリ</th>
                              <td>{info.param.fileListDirectory}</td>
                            </tr>
                            <tr>
                              <th>Upload Interval</th>
                              <td>{info.param.uploadInterval}</td>
                            </tr>
                            <tr>
                              <th>Request Interval</th>
                              <td>{info.param.requestInterval}</td>
                            </tr>
                            <tr>
                              <th>Garbage Time</th>
                              <td>{info.param.garbageTime}</td>
                            </tr>
                            <tr>
                              <th>Version UP Time</th>
                              <td>{info.param.versionUpTime}</td>
                            </tr>
                            <tr>
                              <th>AUX BGM MIX LEVEL(L)</th>
                              <td>{info.param.auxBgmMixLevelL}</td>
                            </tr>
                            <tr>
                              <th>AUX BGM MIX LEVEL(R)</th>
                              <td>{info.param.auxBgmMixLevelR}</td>
                            </tr>
                            <tr>
                              <th>CM BGM MIX LEVEL(L)</th>
                              <td>{info.param.cmBgmMixLevelL}</td>
                            </tr>
                            <tr>
                              <th>CM BGM MIX LEVEL(R)</th>
                              <td>{info.param.cmBgmMixLevelR}</td>
                            </tr>
                            <tr>
                              <th>インカム BGM MIX LEVEL(L)</th>
                              <td>{info.param.icmBgmMixLevelL}</td>
                            </tr>
                            <tr>
                              <th>インカム BGM MIX LEVEL(R)</th>
                              <td>{info.param.icmBgmMixLevelR}</td>
                            </tr>
                            <tr>
                              <th>TONE LOW</th>
                              <td>{info.param.toneL}</td>
                            </tr>
                            <tr>
                              <th>TONE MID</th>
                              <td>{info.param.toneM}</td>
                            </tr>
                            <tr>
                              <th>TONE HIGH</th>
                              <td>{info.param.toneH}</td>
                            </tr>
                            <tr>
                              <th>輝度</th>
                              <td>{info.param.luminance}</td>
                            </tr>
                            <tr>
                              <th>radiko APIサーバーURL(HTTP)</th>
                              <td>{info.param.radikoApiSvrUrlHttp}</td>
                            </tr>
                            <tr>
                              <th>radiko APIサーバーURL(HTTPS)</th>
                              <td>{info.param.radikoApiSvrUrlHttps}</td>
                            </tr>
                            <tr>
                              <th>radiko Volume</th>
                              <td>{info.param.radikoVol}</td>
                            </tr>
                            <tr>
                              <th>radiko Volume(2)</th>
                              <td>{info.param.radikoVol2}</td>
                            </tr>
                            <tr>
                              <th>radiko バッファTime</th>
                              <td>{info.param.radikoBufTime}</td>
                            </tr>
                            <tr>
                              <th>radiko</th>
                              <td>{info.param.radikoEnable? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>radiko エリアID</th>
                              <td>{info.param.radikoAreaId}</td>
                            </tr>
                            <tr>
                              <th>radikoロケーション</th>
                              <td>{info.param.radikoLocation}</td>
                            </tr>
                            <tr>
                              <th>BGM LEVEL(L)</th>
                              <td>{info.param.bgmLevelL}</td>
                            </tr>
                            <tr>
                              <th>BGM LEVEL(R)</th>
                              <td>{info.param.bgmLevelR}</td>
                            </tr>
                            <tr>
                              <th>BGM ミュート(L)</th>
                              <td>{info.param.bgmMuteL? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>BGM ミュート(R)</th>
                              <td>{info.param.bgmMuteR? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>BGM ステレオ</th>
                              <td>{info.param.bgmStereo? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>CM LEVEL(L)</th>
                              <td>{info.param.cmLevelL}</td>
                            </tr>
                            <tr>
                              <th>CM LEVEL(R)</th>
                              <td>{info.param.cmLevelR}</td>
                            </tr>
                            <tr>
                              <th>CM ミュート(L)</th>
                              <td>{info.param.cmMuteL? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>CM ミュート(R)</th>
                              <td>{info.param.cmMuteR? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>インカム LEVEL(L)</th>
                              <td>{info.param.icmLevelL}</td>
                            </tr>
                            <tr>
                              <th>インカム LEVEL(R)</th>
                              <td>{info.param.icmLevelR}</td>
                            </tr>
                            <tr>
                              <th>インカム ミュート(L)</th>
                              <td>{info.param.icmMuteL? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>インカム ミュート(R)</th>
                              <td>{info.param.icmMuteR? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>ENV LEVEL(L)</th>
                              <td>{info.param.envLevelL}</td>
                            </tr>
                            <tr>
                              <th>ENV LEVEL(R)</th>
                              <td>{info.param.envLevelR}</td>
                            </tr>
                            <tr>
                              <th>ENV ミュート(L)</th>
                              <td>{info.param.envMuteL? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>ENV ミュート(R)</th>
                              <td>{info.param.envMuteR? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>ENV ステレオ</th>
                              <td>{info.param.envStereo? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>AUX LEVEL(L)</th>
                              <td>{info.param.auxLevelL}</td>
                            </tr>
                            <tr>
                              <th>AUX LEVEL(R)</th>
                              <td>{info.param.auxLevelR}</td>
                            </tr>
                            <tr>
                              <th>CM ステレオ</th>
                              <td>{info.param.auxStero? '有効' : '無効'}</td>
                            </tr>
                            <tr>
                              <th>STBアカウント</th>
                              <td>{info.param.stbAccount}</td>
                            </tr>
                            <tr>
                              <th>サービスコード</th>
                              <td>{info.param.serviceCode}</td>
                            </tr>
                            <tr>
                              <th>バックアップBGM</th>
                              <td>{info.param.bakupBgmEnable? '有効' : '無効'}</td>
                            </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>}
                </div>
                <h2 ref={staffCall}>スタッフコール(両方未接続の設定以外を表示)</h2>
                <h3>無線① WCシリーズ(101~400)</h3>
                {datasets1.map((data, index) => (
                  <div key={index}>
                    {(data[1] !== "<未登録>" || data[2] !== "<未登録>") && (
                      <ScTable1 id={data[0]} button={data[0]+100} call={data[1]} back={data[2]} />
                    )}
                  </div>
                ))}
                <br /><br /><br />
                <h3>無線② UTW/WCシリーズ(1~16)</h3>
                  {datasets2.map((data, index) => (
                    <div key={index}>
                      {((data[1] !== "<未登録>" && data[1] !== "") || (data[2] !== "<未登録>" && data[2] !== "")) && (
                        <ScTable1 id={data[0]} button={data[0]} call={data[1]} back={data[2]} />
                      )}
                    </div>
                  ))}
                  <br /><br /><br />
                  <h3>有線(1~16)</h3>
                  {datasets2.map((data, index) => (
                    <div key={index}>
                      {((data[1] !== "<未登録>" && data[1] !== "") || (data[2] !== "<未登録>" && data[2] !== "")) && (
                        <ScTable2 id={data[0]} call={data[1]} />
                      )}
                    </div>
                  ))}
                  <br /><br /><br />
                  <h2 ref={oneTouchButton}>登録済みワンタッチボタン</h2>
                  {datasets3.map((data, index) => (
                    <div key={index}>
                      {(data[1] !== "<未登録>" || data[2] !== "") && (
                        <MenuTable id={data[0]} title={data[1]} call={data[2]} />
                      )}
                    </div>
                  ))}
                  <br /><br /><br />
                  <h2 ref={localTimer}>ローカルタイマーON状態のみ</h2>
                  {datasets4.map((data, index) => (
                    <div key={index}>
                      {(data[0] !== 'OFF') && ( 
                        <LtMainTable power={data[0]} id={data[1]} week={data[2]} title={data[3]} />
                      )}
                    </div>
                  ))}
                  <br /><br /><br />
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          </div>
        )}
        {!file && <h2>Main Page</h2>}
    </div>
  );
};

export default MainComponent;
