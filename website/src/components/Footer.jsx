import React from 'react';

export default class extends React.Component {
  state = {
    year: (new Date()).getFullYear(),
  };

  render() {
    const { year } = this.state;
    return (
      <div>
        <footer className="footer bg-gray-100 mt-12">
          <div className="text-center">
            <p>
              <a href="https://www.ludicrous.xyz" className="text-black">&copy; { year } ludicrous.</a>
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
