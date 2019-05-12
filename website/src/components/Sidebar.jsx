import React from 'react';
import classnames from 'classnames';

export default class extends React.Component {
  titleize = (str) => {
    const splitFolder = str.split('/');
    const uppercase = word => word.charAt(0).toUpperCase() + word.slice(1);
    return splitFolder[splitFolder.length - 1].split('-').map(w => uppercase(w)).join(' ');
  }

  buildTree = (menu) => {
    return menu.reduce((acc, val) => {
      const split = val.split('/');
      if (split.length > 1) {
        if (!acc.get(split[0])) {
          acc.set(split[0], []);
        }
        acc.get(split[0]).push(split[1]);
      }
      return acc;
    }, new Map());
  }

  render() {
    const { menu, active } = this.props;
    const tree = this.buildTree(menu);
    const keys = Array.from(tree.keys());
    const guides = menu.filter(m => !m.includes('/'));
    return (
      <div>
        <aside className="menu">
          <p className="menu-label">
            Guides
          </p>
          { guides.map((item) => (
            <ul className="menu-list" key={item}>
              <li><a href={`/guides/${item}`} className={classnames({ 'is-active': active === item })}>{ this.titleize(item) }</a></li>
            </ul>
          )) }
          { keys.map((key) => (
            <React.Fragment>
              <p className="menu-label">
                { key }
              </p>
              { tree.get(key).map((item) => (
                <ul className="menu-list" key={item}>
                  <li><a href={`/guides/${key}/${item}`} className={classnames({ 'is-active': active === `${key}/${item}` })}>{ this.titleize(item) }</a></li>
                </ul>
              )) }
            </React.Fragment>
          )) }
        </aside>
      </div>
    );
  }
}
