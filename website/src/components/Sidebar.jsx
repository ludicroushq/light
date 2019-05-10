import React from 'react';

export default class extends React.Component {
  render() {
    const { menu } = this.props;
    return (
      <div>
        <aside class="menu">
          { menu.map((item) => (
            <ul class="menu-list" key={item}>
              <li><a href={`/guides/${item}`}>{ item }</a></li>
            </ul>
          )) }
        </aside>
      </div>
    );
  }
}
