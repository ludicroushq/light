import React, { useState } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { withRouter } from 'next/router';

function Navigation({ router }) {
  const { pathname: route } = router;

  const [menu, setMenu] = useState(false);
  const toggleMenu = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);

  return (
    <nav className="navbar is-black is-transparent is-uppercase">
      <div className="container">
        <div className="navbar-brand">
          <a href="/" className="navbar-item has-text-weight-bold" role="navigation" onClick={closeMenu}>
            <span className="is-size-5"><span style={{ letterSpacing: '2px' }}>light</span> <small style={{ fontSize: '0.75em' }}>beta</small></span>
          </a>

          <div className={classnames('navbar-burger burger', { 'is-active': menu })} role="navigation" onClick={toggleMenu}>
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className={classnames('navbar-menu header', { 'is-active': menu })}>
          <div className="navbar-end" onClick={closeMenu}>
            <Link href="/">
              <a className={classnames('navbar-item', (route === '/') ? 'is-active' : null)} role="navigation">
                home
              </a>
            </Link>
            <a href="https://docs.light.js.org/guides/getting-started" className="navbar-item" role="navigation">
              guides
            </a>
            <a href="https://docs.light.js.org/api/server" className="navbar-item" role="navigation">
              api
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navigation);
