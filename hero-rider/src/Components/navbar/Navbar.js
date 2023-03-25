import React, { useContext, useState } from 'react';
import navbarStyle from './navbar.module.css';
import { NavLink } from 'react-router-dom'
import { UserData } from '../../context/User.Context';
import SmallToolTip from '../Tooltip/Small.ToolTip';
import { GoThreeBars } from 'react-icons/go';


function Navbar() {

  const { handleLogout, userActiveData } = useContext(UserData);

  const [toolTipBool, setToolTipBool] = useState(false);

  const [navExpand,setNavExpand] = useState(false);

  const navbarExpand = () => setNavExpand(!navExpand);

  return (

    <>
      <header className={navbarStyle['header-container']}>
        <nav className={navbarStyle['nav-container']}>

          {/* navbar brand text */}
          <div>
            <h4 className={`text-purple-600`}><span className={`text-[#04AA6D]`}>Hero</span> Rider</h4>
          </div>

          <div className={`flex md:hidden justify-center gap-3 items-center`}>

            <div style={{ backgroundImage: `url(${userActiveData?.userAvatar})` }} onClick={() => setToolTipBool(!toolTipBool)}
              className={`${navbarStyle['user-avatar']} w-fit block md:hidden`}>

              <SmallToolTip

                visible={toolTipBool}

                callback={handleLogout}>
                Logout
              </SmallToolTip>

            </div>
            <GoThreeBars onClick={navbarExpand} color={navExpand ? '#7C3AED' : '#1F2937'} size={30}></GoThreeBars>
          </div>

          <div className={`${navbarStyle['nav-link-container']} ${navExpand && navbarStyle['res-nav-expand']}`}>
            <NavLink className={navbarStyle['nav-item']}>Home</NavLink>
            <NavLink className={navbarStyle['nav-item']}>Leasson</NavLink>
            <NavLink className={navbarStyle['nav-item']}>About</NavLink>
            <NavLink className={navbarStyle['nav-item']}>Features</NavLink>

            <div style={{ backgroundImage: `url(${userActiveData?.userAvatar})` }} onClick={() => setToolTipBool(!toolTipBool)}
              className={`${navbarStyle['user-avatar']} hidden md:block`}>

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