import React from 'react';

import Hero from '../components/Hero';

export default () => (
  <div>
    <Hero
      title="light"
      subtitle={[
        ' weight',
        ' on your resources',
        'ning fast',
      ].map(l => `a framework that is <b>light</b>${l}`)}
      smartBackspace={true}
      size="medium"
    >
      <div class="hero-foot has-text-centered">
        <div className="container">
          <div>
            <a href="https://circleci.com/gh/ludicrousxyz/light" target="_blank" rel="noopener noreferrer">
              <img alt="CircleCI" src="https://img.shields.io/circleci/project/github/ludicrousxyz/light.svg?label=ci%20status&style=for-the-badge" />
            </a>
            &nbsp;&nbsp;
            <a href="https://www.npmjs.com/package/light" target="_blank" rel="noopener noreferrer">
              <img alt="NPM" src="https://img.shields.io/npm/v/light.svg?label=npm%20version&style=for-the-badge" />
            </a>
            &nbsp;&nbsp;
            <a href="https://coveralls.io/github/ludicrousxyz/light" target="_blank" rel="noopener noreferrer">
              <img alt="Coveralls" src="https://img.shields.io/coveralls/github/ludicrousxyz/light.svg?label=code%20coverage&style=for-the-badge" />
            </a>
          </div>
        </div>
      </div>
    </Hero>
  </div>
);
