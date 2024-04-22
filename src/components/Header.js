import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <ul style={{ display: 'flex', alignItems: 'center' }}>
                <li><Link to="/main">main</Link></li>
                <li><Link to="/sc">sc(スタッフコール)</Link></li>
                <li><Link to="/menu">menu</Link></li>
                <li><Link to="/isms">isms</Link></li>
                <li><Link to="/lt">lt(ローカルタイマー)</Link></li>
                <li><Link to="/othr">othr</Link></li>
                <li className="reset-link"><Link to="/reset">リセット</Link></li>
            </ul>
        </nav>
    );
}

export default Header;