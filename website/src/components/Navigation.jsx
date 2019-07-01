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
      <nav className="p-3">
        <div className="flex items-center justify-between flex-wrap container mx-auto">
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <a className="font-semibold text-2xl tracking-tight">light <span className="text-sm">(WIP)</span></a>
            </Link>
          </div>
          <div className="block md:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-black border-black hover:bg-black hover:text-white" onClick={this.toggleMenu}>
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          <div className={classnames('w-full block flex-grow md:flex md:items-center md:w-auto', { 'hidden': !active })}>
            <div className="md:flex-grow">
            </div>
            <div>
              <a href="/" className={classnames('block mt-4 md:inline-block md:mt-0 uppercase mr-4', (route === '/') ? 'text-indigo-400 font-medium' : 'text-gray-700 hover:text-black')} role="navigation" onClick={this.closeMenu}>
                Home
              </a>
              <a href="/guides/getting-started" className={classnames('block mt-4 md:inline-block md:mt-0 uppercase mr-4', route.includes('/guides') ? 'text-indigo-400 font-medium' : 'text-gray-700 hover:text-black')} role="navigation" onClick={this.closeMenu}>
                Guides
              </a>
              <a href="/docs/server" className={classnames('block mt-4 md:inline-block md:mt-0 uppercase mr-4', route.includes('/docs') ? 'text-indigo-400 font-medium' : 'text-gray-700 hover:text-black')} role="navigation" onClick={this.closeMenu}>
                Docs
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navigation);
