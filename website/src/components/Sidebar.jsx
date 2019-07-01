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
      <div className="w-full">
        <div className="uppercase text-gray-700 tracking-wider pb-2 w-full">{ label }</div>
        { Object.keys(menu).map((key) => {
          const guide = menu[key];
          if (typeof guide !== 'string') {
            return (
              <React.Fragment key={key}>
                <div className="uppercase text-gray-700 tracking-wider py-2 w-full">{ key }</div>
                { Object.keys(guide).map((subkey) => (
                  <a key={subkey} href={`${prefix}/${guide[subkey]}`} className={classnames('inline-block w-full text-left rounded py-2 px-4 cursor-pointer', active === guide[subkey] ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200')}>{ subkey }</a>
                ))}
              </React.Fragment>
            );
          }
          return (
            <a key={key} href={`${prefix}/${guide}`} className={classnames('inline-block w-full text-left rounded py-2 px-4 cursor-pointer', active === guide ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200')}>{ key }</a>
          );
        })}
      </div>
    );
  }
}
