import { NavLink } from 'react-router-dom';

const Navlink = ({ url, icon, text, func }) => {
    return (
        <NavLink to={url} exact='true' className={({ isActive }) => isActive ? 'navlink navlink--active row' : 'navlink row'} onClick={func}>
            {icon}
            <span className='mr span'/>
            {text}
        </NavLink>
    )
}

export default Navlink;