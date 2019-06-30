import React from 'react';
import classnames from 'classnames';

export default class extends React.Component {
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
    const { menu, active, label, prefix } = this.props;
    return (
      <div>
        <aside className="menu">
          <p className="menu-label">
            <span className="uppercase text-gray-700 tracking-wider pb-2">{ label }</span>
          </p>
          { Object.keys(menu).map((key) => {
            const guide = menu[key];
            if (typeof guide !== 'string') {
              return (
                <React.Fragment key={key}>
                  <span className="uppercase text-gray-700 tracking-wider pb-2">{ key }</span>
                  { Object.keys(guide).map((subkey) => (
                    <a key={subkey} href={`${prefix}/${guide[subkey]}`} className={classnames('w-full text-left rounded py-2 px-4 cursor-pointer', active === guide[subkey] ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200')}>{ subkey }</a>
                  ))}
                </React.Fragment>
              );
            }
            return (
              <a key={key} href={`${prefix}/${guide}`} className={classnames('w-full text-left rounded py-2 px-4 cursor-pointer', active === guide ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200')}>{ key }</a>
            );
          })}
        </aside>
      </div>
    );
  }
}
