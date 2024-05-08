import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div id="header">
            <nav>
                <ul style={{ display: 'flex', alignItems: 'center' }}>
                    <li><Link to="/main">main<br />ホーム</Link></li>
                    <li><Link to="/sc">sc<br />スタッフコール</Link></li>
                    <li><Link to="/menu">menu<br />ワンタッチボタン</Link></li>
                    <li><Link to="/isms">isms<br />設定</Link></li>
                    <li><Link to="/lt">lt<br />ローカルタイマー</Link></li>
                    <li><Link to="/othr">othr<br />その他設定</Link></li>
                    <li className="reset-link"><Link to="/reset">リセット</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
