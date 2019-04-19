import React from 'react';

export default class extends React.Component {
  state = {
    year: (new Date()).getFullYear(),
  };

  render() {
    const { year } = this.state;
    return (
      <div>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <a href="https://www.ludicrous.xyz" class="has-text-black">&copy; { year } ludicrous.</a>
            </p>
          </div>
        </footer>
        <style jsx>{`
          .footer {
            padding: 3rem 1.5rem;
          }
        `}
        </style>
      </div>
    );
  }
}
