import React, { useState } from 'react';
import Typed from 'react-typed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Embed from 'react-runkit';
import classnames from 'classnames';

import CodeBlock from '../components/CodeBlock';

export default function Index() {
  const deployments = [
    {
      name: 'ZEIT Now',
      code: 'process.env.LIGHT_ENV = \'now\';',
    },
    {
      name: 'RunKit',
      code: 'process.env.LIGHT_ENV = \'runkit\';',
    },
    {
      name: 'AWS',
      code: 'process.env.LIGHT_ENV = \'aws\';',
    },
    {
      name: 'Google Cloud',
      code: 'process.env.LIGHT_ENV = \'gcloud\';',
    },
    {
      name: 'Netlify',
      code: 'process.env.LIGHT_ENV = \'netlify\';',
    },
    {
      name: 'Server',
      code: '// no configuration needed',
    },
    {
      name: 'Heroku',
      code: '// no configuration needed',
    },
  ];

  const [selectedDeploy, selectDeploy] = useState(deployments[0]);
  return (
    <>
      <section className="hero is-black">
        <div className="hero-body">
          <div className="container has-text-centered">
            <span className="icon has-text-warning is-large">
              <FontAwesomeIcon icon="bolt" size="4x" />
            </span>
            <h1 className="title is-uppercase is-size-4">
              light.js
            </h1>
            <h2 className="title is-uppercase is-size-5">
              a
              <br />
              <span className="is-size-1">
                <Typed
                  strings={[
                    'fast',
                    'serverless',
                    'testable',
                    'functional',
                    'developer friendly',
                    'flexible',
                    'lightweight',
                  ]}
                  typeSpeed={50}
                  backSpeed={30}
                  backDelay={1500}
                />
              </span>
              <br />
              framework
            </h2>
          </div>
        </div>
        <div className="hero-foot has-text-centered">
          <a href="https://circleci.com/gh/ludicroushq/light" className="inline-block" target="_blank" rel="noopener noreferrer">
            <img alt="CircleCI" src="https://img.shields.io/circleci/project/github/ludicroushq/light.svg?label=ci%20status&style=for-the-badge&labelColor=0a0a0a" />
          </a>
          &nbsp;&nbsp;
          <a href="https://www.npmjs.com/package/light" className="inline-block" target="_blank" rel="noopener noreferrer">
            <img alt="NPM" src="https://img.shields.io/npm/v/light.svg?label=npm%20version&style=for-the-badge&labelColor=0a0a0a" />
          </a>
          &nbsp;&nbsp;
          <a href="https://www.npmjs.com/package/light" className="inline-block" target="_blank" rel="noopener noreferrer">
            <img alt="Downloads" src="https://img.shields.io/npm/dm/light.svg?label=downloads&style=for-the-badge&labelColor=0a0a0a" />
          </a>
          &nbsp;&nbsp;
          <a href="https://github.com/ludicroushq/light" className="inline-block" target="_blank" rel="noopener noreferrer">
            <img alt="Stars" src="https://img.shields.io/github/stars/ludicroushq/light.svg?style=for-the-badge&labelColor=0a0a0a" />
          </a>
          &nbsp;&nbsp;
          <a href="https://coveralls.io/github/ludicroushq/light" className="inline-block" target="_blank" rel="noopener noreferrer">
            <img alt="Coveralls" src="https://img.shields.io/coveralls/github/ludicroushq/light.svg?label=code%20coverage&style=for-the-badge&labelColor=0a0a0a" />
          </a>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half has-text-centered">
              <div className="subtitle is-uppercase">as simple as</div>
              <div className="title is-is-family-monospace" style={{ marginBottom: '0.85rem' }}>light dev</div>
              <pre className="box has-text-left">
                <code className="has-text-primary">$ light dev</code>{ '\n' }
                <code className="has-text-info">> start      🔥 igniting the server 🔥</code>{ '\n' }
                <code className="has-text-info">> listening  on port 3000</code>{ '\n' }
                <code className="has-text-link">> hmr        starting the hot reloader</code>{ '\n' }
                <code className="has-text-link">> hmr        watching for changes</code>{ '\n' }
                <code className="has-text-success">  GET        200 to /, request completed in 1 ms</code>{ '\n' }
              </pre>
            </div>
            <div className="column is-half">
              <CodeBlock language="javascript" value={`const { createRoute } = require('light');
const { route, addMiddleware, addPlugin } = createRoute('index');

addMiddleware(auth, cors);
addPlugin(errorHandling);
module.exports = route((req, res) => {
  return {
    hello: 'world',
  };
});`} />
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className="section">
        <div className="container has-text-centered">
          <div className="title">reload without actually reloading</div>
          <div className="subtitle is-uppercase">don't waste your time waiting for your server to restart</div>
          <div className="columns is-vcentered">
            <div className="column is-half">
              <pre className="box has-text-left has-background-black">
                <code className="has-text-primary">$ light dev</code>{ '\n' }
                <code className="has-text-info">> listening on port 3000</code>{ '\n' }
                <code className="has-text-info">> routes/index.js changed</code>{ '\n' }
                <code className="has-text-grey-light">hot-swapping file</code>{ '\n' }
                <code className="has-text-success">> done [1 ms]</code>{ '\n' }
              </pre>
            </div>
            <div className="is-divider-vertical" data-content="VS" />
            <div className="column is-half">
              <pre className="box has-text-left has-background-black">
                <code className="has-text-primary">$ node express.js</code>{ '\n' }
                <code className="has-text-info">> listening on port 3000</code>{ '\n' }
                <code className="has-text-info">> routes/index.js changed</code>{ '\n' }
                <code className="has-text-grey-light">restarting server</code>{ '\n' }
                <code className="has-text-grey-light">reimporting all routes</code>{ '\n' }
                <code className="has-text-grey-light">reconnecting to database</code>{ '\n' }
                <code className="has-text-grey-light">reconnecting to cache</code>{ '\n' }
                <code className="has-text-grey-light">recompiling templates</code>{ '\n' }
                <code className="has-text-info">> listening on port 3000</code>{ '\n' }
                <code className="has-text-success">> done [1-5 s]</code>{ '\n' }
              </pre>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-one-third has-text-centered">
              <div className="title">write once</div>
              <div className="subtitle is-uppercase">deploy anywhere</div>
            </div>
            <div className="column is-2">
              <aside className="menu">
                <p className="menu-label has-text-centered">
                  deployments
                </p>
                <ul className="menu-list has-text-centered">
                  { deployments.map((deployment) => (
                    <li key={deployment.name} onClick={() => selectDeploy(deployment)}>
                      <a className={classnames(deployment.name === selectedDeploy.name ? 'is-active' : null)}>
                        { deployment.name }
                      </a>
                    </li>
                  )) }
                </ul>
              </aside>
            </div>
            <div className="column is-6">
              <CodeBlock language="javascript" value={`const { createRoute } = require('light');
const { route, addMiddleware, addPlugin } = createRoute('index');

${selectedDeploy.code ? `${selectedDeploy.code}` : ''}

addMiddleware(auth, cors);
addPlugin(errorHandling);
module.exports = route((req, res) => {
  return {
    hello: 'world',
  };
});`} />
            </div>
          </div>
        </div>
      </section>
      <hr className="is-hidden-mobile" />
      <section className="section is-hidden-mobile">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-two-thirds">
              <Embed source={ `const { createRoute } = require('light');
const { route, addMiddleware, addPlugin } = createRoute('runkit');
process.env.LIGHT_ENV='runkit';

/*
// middleware is run before your handler
addMiddleware(
  (req, res) => console.log(req.url),
);
// plugins wrap your handlers (and middleware)
addPlugin(
  (fn) => async (req, res) => {
    const before = Date.now();
    await fn(req, res)
    const after = Date.now();
    console.log('the request took', after - before, 'ms');
  },
);
*/
module.exports = route((req, res) => {
  return {
    hello: 'world',
  };
});` } mode='endpoint' />
            </div>
            <div className="column is-one-third has-text-centered">
              <div className="title">try it yourself</div>
              <div className="subtitle is-uppercase">on RunKit</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
