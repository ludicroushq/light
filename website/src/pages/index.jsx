import React from 'react';
import Prism from 'prismjs';
import classnames from 'classnames';
import Embed from 'react-runkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextLoop from "react-text-loop";

import CodeBlock from '../components/CodeBlock';

export default class Index extends React.Component {
  state = {
    selectedDeploy: {},
    featureTab: 'deploy',
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
  }

  changeDeployment(obj) {
    this.setState({
      selectedDeploy: obj,
    });
  }

  render() {
    const { deployments, selectedDeploy, featureTab, selectedHeroText, heroText } = this.state;
    return (
      <div>
        <div className="w-full max-w-screen-xl relative mx-auto container mx-auto pb-6 text-center">
          <h1 className="font-bold uppercase text-yellow-400 pt-16"><FontAwesomeIcon icon="bolt" size="6x" /></h1>
          <h1 className="text-xl font-bold uppercase pb-8 pt-2">light.js</h1>
          <h2 className="text-xl font-semibold uppercase">a</h2>
          <h2 className="text-4xl font-semibold uppercase">
            <TextLoop springConfig={{ stiffness: 200, damping: 25 }}>
              <div style={{ width: '350px' }}>serverless</div>
              <div style={{ width: '350px' }}>lightweight</div>
              <div style={{ width: '350px' }}>testable</div>
              <div style={{ width: '350px' }}>functional</div>
              <div style={{ width: '350px' }}>fast</div>
              <div style={{ width: '350px' }}>developer friendly</div>
              <div style={{ width: '350px' }}>flexible</div>
            </TextLoop>
          </h2>
          <h2 className="text-xl font-semibold uppercase">framework</h2>
          <div className="pt-12">
            <a href="https://circleci.com/gh/ludicrousxyz/light" className="inline-block" target="_blank" rel="noopener noreferrer">
              <img alt="CircleCI" src="https://img.shields.io/circleci/project/github/ludicrousxyz/light.svg?label=ci%20status&style=for-the-badge" />
            </a>
            &nbsp;&nbsp;
            <a href="https://www.npmjs.com/package/light" className="inline-block" target="_blank" rel="noopener noreferrer">
              <img alt="NPM" src="https://img.shields.io/npm/v/light.svg?label=npm%20version&style=for-the-badge" />
            </a>
            &nbsp;&nbsp;
            <a href="https://www.npmjs.com/package/light" className="inline-block" target="_blank" rel="noopener noreferrer">
              <img alt="Downloads" src="https://img.shields.io/npm/dm/light.svg?label=downloads&style=for-the-badge" />
            </a>
            &nbsp;&nbsp;
            <a href="https://github.com/ludicrousxyz/light" className="inline-block" target="_blank" rel="noopener noreferrer">
              <img alt="Stars" src="https://img.shields.io/github/stars/ludicrousxyz/light.svg?style=for-the-badge" />
            </a>
            &nbsp;&nbsp;
            <a href="https://coveralls.io/github/ludicrousxyz/light" className="inline-block" target="_blank" rel="noopener noreferrer">
              <img alt="Coveralls" src="https://img.shields.io/coveralls/github/ludicrousxyz/light.svg?label=code%20coverage&style=for-the-badge" />
            </a>
          </div>
        </div>
        <div className="bg-gray-100 py-12">
          <div className="flex container mx-auto flex-row flex-wrap">
            <div className="flex flex-col w-full md:w-1/2 text-center p-4 pb-0">
              <span className="flex-1" />
              <h2 className="text-lg pb-1">as simple as</h2>
              <h1 className="text-3xl font-mono pb-4 md:pb-0">light dev</h1>
              <span className="flex-1" />
              <div className="bg-white shadow-xl text-left p-4 rounded">
                <pre className="items-end">
                  <code className="text-indigo-500">$ light dev</code>{ '\n' }
                  <code className="text-pink-500">> listening on port 3000</code>{ '\n' }
                  <code className="text-green-500">> GET        /</code>{ '\n' }
                  <code className="text-green-500">> { '<' }          200 17b</code>{ '\n' }
                </pre>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-white shadow-xl text-center px-2 m-4 md:m-0 rounded">
            <CodeBlock language="javascript" value={`const light = require('light');

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
        <div className="py-12 container mx-auto">
          <h1 className="text-3xl text-center">reload without actually reloading</h1>
          <h2 className="text-lg text-center pb-4">dont waste your time waiting for your server to restart</h2>
          <div className="flex flex-row flex-wrap">
            <div className="flex flex-row flex-1 text-center p-4 md:pb-0">
              <div className="self-center w-full bg-gray-900 shadow-3xl text-left p-4 rounded">
                <pre className="items-end">
                  <code className="text-indigo-400">$ light dev</code>{ '\n' }
                  <code className="text-pink-400">> listening on port 3000</code>{ '\n' }
                  <code className="text-pink-400">> routes/index.js changed</code>{ '\n' }
                  <code className="text-gray-400">hot-swapping file</code>{ '\n' }
                  <code className="text-green-400">> done [1 ms]</code>{ '\n' }
                </pre>
              </div>
            </div>
            <div className="flex flex-col self-center text-center text-md uppercase text-gray-500 tracking-wider p-2 w-full md:w-auto">
              vs
            </div>
            <div className="flex flex-row flex-1 text-center p-4 pb-0">
              <div className="self-center w-full bg-gray-900 shadow-3xl text-left p-4 rounded">
                <pre className="items-end">
                  <code className="text-indigo-400">$ node express.js</code>{ '\n' }
                  <code className="text-pink-400">> listening on port 3000</code>{ '\n' }
                  <code className="text-pink-400">> routes/index.js changed</code>{ '\n' }
                  <code className="text-gray-400">restarting server</code>{ '\n' }
                  <code className="text-gray-400">reimporting all routes</code>{ '\n' }
                  <code className="text-gray-400">reconnecting to database</code>{ '\n' }
                  <code className="text-gray-400">reconnecting to cache</code>{ '\n' }
                  <code className="text-gray-400">recompiling templates</code>{ '\n' }
                  <code className="text-pink-400">> listening on port 3000</code>{ '\n' }
                  <code className="text-green-400">> done [1-5 s]</code>{ '\n' }
                </pre>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 py-12 -mb-12 md:m-0">
          <div className="flex container mx-auto flex-row flex-wrap">
            <div className="flex flex-col w-full md:w-1/3 text-center p-4 md:pb-0">
              <span className="flex-1" />
              <h1 className="text-3xl">write once</h1>
              <h2 className="text-lg">deploy anywhere</h2>
              <span className="flex-1" />
            </div>
            <div className="flex flex-col w-full md:w-1/6 px-4">
              <span className="flex-1" />
              <h1 className="uppercase text-gray-700 tracking-wider pb-2">Deployments</h1>
              { deployments.map((deployment) => (
                <a key={deployment.name} onClick={() => this.changeDeployment(deployment)} className={classnames('w-full text-left rounded py-2 px-4 cursor-pointer', deployment.name === selectedDeploy.name ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200')}>{ deployment.name }</a>
              )) }
              <span className="flex-1" />
            </div>
            <div className="w-full md:w-1/2 bg-white shadow-xl text-center px-2 m-4 md:m-0 rounded">
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
        <div className="pt-12 md:block md:m-0 hidden">
          <div className="container mx-auto flex-col-reverse md:flex-row flex-wrap md:flex">
            <div className="w-full md:w-2/3 text-center px-2 m-4 md:m-0">
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
            <div className="flex flex-col w-full md:w-1/3 text-center p-4 pb-0">
              <span className="flex-1" />
              <h1 className="text-3xl">try it yourself</h1>
              <h2 className="text-lg">on RunKit</h2>
              <span className="flex-1" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
