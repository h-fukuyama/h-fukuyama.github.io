import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div id="header">
            <nav>
                <ul style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                    <li><Link to="/main">ホーム</Link></li>
                    {/* <li><Link to="/sc">不要！<br />スタッフコール</Link></li>
                    <li><Link to="/menu">不要！<br />ワンタッチボタン</Link></li> */}
                    <li><Link to="/isms">チャンネルマスク</Link></li>
                    <li><Link to="/lt">ローカルタイマー</Link></li>
                    <li><Link to="/othr">設定値</Link></li>
                    <li className="reset-link"><Link to="/reset">リセット</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
