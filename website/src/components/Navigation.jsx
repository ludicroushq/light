import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

class Navigation extends React.Component {
  state = {
    active: false,
  }

  static propTypes = {
    router: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      active: !prevState.active,
    }));
  }

  closeMenu = () => {
    this.setState({
      active: false,
    });
  }

  render() {
    const { active } = this.state;
    const { router: { pathname: route } } = this.props;

    return (
      <nav id="main-navbar" className="navbar is-black is-transparent">
        <div className="container">
          <div className="navbar-brand">
            <Link href="/">
              <a className="navbar-item has-text-weight-bold">
                <span className="is-size-5" onClick={this.closeMenu}>light <small style={{ fontSize: '0.5em' }}>(WIP)</small></span>
              </a>
            </Link>

            <div className={classnames('navbar-burger', 'burger', { 'is-active': active })} role="navigation" onClick={this.toggleMenu}>
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className={classnames('navbar-menu', 'header', { 'is-active': active })}>
            <div className="navbar-end">
              <Link href="/">
                <a className={classnames('navbar-item', { 'is-active': route === '/' })} role="navigation" onClick={this.closeMenu}>
                  Home
                </a>
              </Link>
              <Link href="/guides">
                <a className={classnames('navbar-item', { 'is-active': route === '/login' })} role="navigation" onClick={this.closeMenu}>
                  Guides
                </a>
              </Link>
              <Link href="/docs">
                <a className={classnames('navbar-item', { 'is-active': route === '/login' })} role="navigation" onClick={this.closeMenu}>
                  Docs
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navigation);
