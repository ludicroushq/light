import React from 'react';
import GDemo from '@glorious/demo';
import Prism from 'prismjs';
import classnames from 'classnames';
import Embed from 'react-runkit';

import Hero from '../components/Hero';
import CodeBlock from '../components/CodeBlock';

export default class Index extends React.Component {
  state = {
    selectedDeploy: {},
    deployments: [
      {
        name: 'ZEIT Now',
        code: 'process.env.LIGHT_ENVIRONMENT = \'now\';',
      },
      {
        name: 'RunKit',
        code: 'process.env.LIGHT_ENVIRONMENT = \'runkit\';',
      },
      {
        name: 'AWS',
        code: 'process.env.LIGHT_ENVIRONMENT = \'aws\';',
      },
      {
        name: 'Google Cloud',
        code: 'process.env.LIGHT_ENVIRONMENT = \'gcloud\';',
      },
      {
        name: 'Netlify',
        code: 'process.env.LIGHT_ENVIRONMENT = \'netlify\';',
      },
      {
        name: 'Server',
        code: '// no configuration needed',
      },
      {
        name: 'Heroku',
        code: '// no configuration needed',
      },
    ]
  }

  componentDidMount() {
    this.setState(prevState => ({
      selectedDeploy: prevState.deployments[0],
    }));

    const demo = new GDemo('#light-demo');

    const code = `
    const light = require('light');

    module.exports = light({
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

    demo.openApp('editor', { minHeight: '300px', windowTitle: 'routes/index.js' })
      .write(highlightedCode, { onCompleteDelay: 1500 })
      .openApp('terminal', { minHeight: '300px', promptString: '$' })
      .command('light dev &', { onCompleteDelay: 250 })
      .respond('› start      🔥 igniting the server 🔥', { onCompleteDelay: 1000 })
      .respond('› listening  on port 3000', { onCompleteDelay: 250 })
      .respond('› hmr        starting the hot reloader', { onCompleteDelay: 750 })
      .respond('› hmr        watching for changes', { onCompleteDelay: 750 })
      .command('curl http://localhost:3000', { onCompleteDelay: 500 })
      .respond('{"hello":"world"}', { onCompleteDelay: 500 })
      .command('# thats it!', { onCompleteDelay: 500 })
      .end();
  }

  changeDeployment(obj) {
    this.setState({
      selectedDeploy: obj,
    });
  }

  render() {
    const { deployments, selectedDeploy } = this.state;
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
                <a href="https://www.npmjs.com/package/light" target="_blank" rel="noopener noreferrer">
                  <img alt="Downloads" src="https://img.shields.io/npm/dm/light.svg?label=downloads&style=for-the-badge" />
                </a>
                &nbsp;&nbsp;
                <a href="https://github.com/ludicrousxyz/light" target="_blank" rel="noopener noreferrer">
                  <img alt="Stars" src="https://img.shields.io/github/stars/ludicrousxyz/light.svg?style=for-the-badge" />
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
            <div className="columns">
              <div className="column is-half is-offset-one-quarter">
                <div className="has-text-centered">
                  <h1 className="title">as simple as</h1>
                  <h2 className="subtitle"><code>light dev</code></h2>
                </div>
                <br />
                <div id="light-demo" style={{ height: '300px' }}></div>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="section">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-one-third has-text-centered">
                <h1 className="title">write once</h1>
                <h2 className="subtitle">deploy anywhere</h2>
              </div>
              <div className="column">
                <div className="columns is-vcentered">
                  <div className="column is-one-quarter">
                    <aside className="menu">
                      <p className="menu-label">
                        Deployments
                      </p>
                      <ul className="menu-list">
                        { deployments.map((deployment) => (
                          <li key={deployment.name}><a onClick={() => this.changeDeployment(deployment)} className={classnames({ 'is-active': deployment.name === selectedDeploy.name })}>{ deployment.name }</a></li>
                        )) }
                      </ul>
                    </aside>
                  </div>
                  <div className="column">
                    <CodeBlock language="javascript" value={`const light = require('light');

${selectedDeploy.code ? `${selectedDeploy.code}` : ''}

module.exports = light({
  path: '/',
  async handler(req, res) {
    return {
      hello: 'world',
    };
  },
});`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="section">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-one-third has-text-centered">
                <h1 className="title">try it yourself</h1>
                <h2 className="subtitle">on RunKit</h2>
              </div>
              <div className="column runkit">
                <Embed source={ `const light = require('light');

process.env.LIGHT_ENVIRONMENT = 'runkit';

module.exports = light({
  path: '/',
  async handler(req, res) {
    return {
      hello: 'world',
    };
  },
});` } mode='endpoint' />
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
