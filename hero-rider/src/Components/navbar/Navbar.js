import React, { useContext, useState } from 'react';
import navbarStyle from './navbar.module.css';
import { NavLink, useNavigate } from 'react-router-dom'
import { UserData } from '../../context/User.Context';
import SmallToolTip from '../Tooltip/Small.ToolTip';

function Navbar() {

  const navigate = useNavigate();

  const { handleLogout, userActiveData } = useContext(UserData);

  const [toolTipBool, setToolTipBool] = useState(false);

  return (

    <>
      <header className={navbarStyle['header-container']}>
        <nav className={navbarStyle['nav-container']}>

          {/* navbar brand text */}
          <div>
            <h4>Hero Rider</h4>
          </div>

          <div className={`flex items-center gap-x-3`}>
            <div>
              <NavLink className={navbarStyle['nav-item']}>Leasson</NavLink>
              <NavLink className={navbarStyle['nav-item']}>About</NavLink>
              <NavLink className={navbarStyle['nav-item']}>About</NavLink>
              <NavLink className={navbarStyle['nav-item']}>About</NavLink>
            </div>

            <div style={{backgroundImage: `url(${userActiveData?.userAvatar})`}} onClick={() => setToolTipBool(!toolTipBool)}
              className={navbarStyle['user-avatar']}>

              <SmallToolTip

              visible={toolTipBool}

              callback={handleLogout}>
                Logout
              </SmallToolTip>

            </div>
          </div>
        </nav>
      </header>
    </>

  );
};

export default Navbar;