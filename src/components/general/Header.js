import { Link } from 'react-router-dom';

const headerStyle = {
    position: "sticky",
    top: "0",
    width: "100%",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "15px",
    color: "white",
    zIndex: "100"
}

const resetLinkStyle = {
    marginLeft: "auto"
}

const Header = () => {
    return (
        <div style={headerStyle}>
            <nav>
                <ul style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                    <li><Link to="/main">ホーム</Link></li>
                    <li><Link to="/isms">チャンネルマスク</Link></li>
                    <li><Link to="/lt">ローカルタイマー</Link></li>
                    <li><Link to="/othr">設定値</Link></li>
                    <li style={resetLinkStyle}><Link to="/reset">リセット</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
