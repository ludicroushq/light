import React, { useState } from 'react';

function Footer({ text, href, targetBlank }) {
  const [year] = useState((new Date()).getFullYear());

  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <a href="https://www.ludicrous.io" className="has-text-grey-dark" target="_blank">
            &copy;
            {' '}
            { year }
            {' '}
            ludicrous
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
