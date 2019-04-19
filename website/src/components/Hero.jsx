import React from 'react';
import Typed from 'react-typed';
import classnames from 'classnames';

const getSize = (size) => {
  if (!size) {
    return '';
  }
  return `is-${size}`;
};

export default data => (
  <div>
    <section className={classnames('hero', 'is-black', getSize(data.size))}>
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="header title">
            { data.title }
          </h1>
          <h2 className="header subtitle is-6 has-text-weight-light">
            &nbsp;
            <Typed
              strings={Array.isArray(data.subtitle) ? data.subtitle : [data.subtitle]}
              cursorChar=""
              smartBackspace={data.smartBackspace}
              typeSpeed={40}
              backSpeed={40}
              backDelay={1000}
            />
            &nbsp;
          </h2>
        </div>
      </div>
    </section>
  </div>
);
