import React from 'react';
import GDemo from '@glorious/demo';
import Prism from 'prismjs';

import Hero from '../components/Hero';

export default class Index extends React.Component {
  componentDidMount() {
    const demo = new GDemo('#light-demo');

    const code = `
    const { route } = require('light');

    module.exports = route({
      path: '/',
      async handler() {
        return {
          hello: 'world',
        };
      },
    });
    `

    const highlightedCode = Prism.highlight(
      code,
      Prism.languages.javascript,
      'javascript',
    );

    demo.openApp('editor', {minHeight: '300px', windowTitle: 'routes/index.js'})
      .write(highlightedCode, {onCompleteDelay: 1500})
      .openApp('terminal', {minHeight: '300px', promptString: '$'})
      .command('light dev', {onCompleteDelay: 500})
      .respond('Hello World!')
      .command('')
      .end();
  }

  render() {
    return (
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
          <div className="hero-foot has-text-centered">
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
        <section className="section">
          <div className="container">
            <div className="columns is-vcentered" style={{ height: '300px' }}>
              <div className="column">
                <h1 className="title">Lorem Ipsum</h1>
                <h2 className="subtitle">Dolor sit amet</h2>
              </div>
              <div className="column" style={{ alignSelf: 'flex-start', paddingTop: '0px', paddingBottom: '0px' }}>
                <div id="light-demo"></div>
              </div>
            </div>
          </div>
        </section>
        <style jsx global>
          {`
            #light-demo pre.editor-line-text {
              background-color: inherit;
              color: inherit;
              font-size: inherit;
              padding: inherit;
              padding-left: 0px;
            }
          `}
        </style>
      </div>
    );
  }
}
