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
    return (
      <div>
        <aside className="menu">
          <p className="menu-label">
            Guides
          </p>
          { Object.keys(menu).map((key) => {
            const guide = menu[key];
            if (typeof guide !== 'string') {
              return (
                <React.Fragment key={key}>
                  <p className="menu-label">
                    { key }
                  </p>
                  { Object.keys(guide).map((subkey) => (
                    <ul className="menu-list" key={subkey}>
                      <li><a href={`/guides/${guide[subkey]}`} className={classnames({ 'is-active': active === guide[subkey] })}>{ this.titleize(subkey) }</a></li>
                    </ul>
                  ))}
                </React.Fragment>
              );
            }
            return (
              <ul className="menu-list" key={key}>
                <li><a href={`/guides/${guide}`} className={classnames({ 'is-active': active === guide })}>{ this.titleize(key) }</a></li>
              </ul>
            );
          })}
        </aside>
      </div>
    );
  }
}
