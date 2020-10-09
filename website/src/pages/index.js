import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useThemeContext from '@theme/hooks/useThemeContext';
import Typed from 'react-typed';
import Highlight, { defaultProps } from 'prism-react-renderer';
import dracula from 'prism-react-renderer/themes/dracula';
import { indigo, pink, green } from '@material-ui/core/colors';
import Embed from 'react-runkit';
import {
  ThemeProvider,
  CssBaseline,
  createMuiTheme,
  Box,
  Button,
  Paper,
  MenuList,
  MenuItem,
  Container,
  Hidden,
  Grid,
} from '@material-ui/core';

const getCode = (name) => {
  let env = '';
  if (name == 'server' || name == 'heroku') {
    env = '// no configuration needed';
  } else {
    env = `process.env.LIGHT_ENV = '${name}';`;
  }
  return `${env}

const { createRoute } = require('light');
const { route, GET } = createRoute();

GET(() => {
  return {
    hello: 'world',
  };
});

module.exports = route;`;
};

function Page() {
  const { isDarkTheme } = useThemeContext();
  const [selected, select] = useState('now');

  const theme = createMuiTheme({
    palette: {
      type: isDarkTheme ? 'dark' : 'light',
    },
    props: {
      // Name of the component ⚛️
      MuiButtonBase: {
        // The properties to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    typography: {
      fontFamily: ['"Inter var"', 'Inter', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    },
  });

  const sampleCode = `const { createRoute } = require('light');
const { route, GET } = createRoute();

GET(() => {
  return {
    hello: 'world',
  };
});

module.exports = route;`;

  const sampleTerminal = `[ start ] 🔥 igniting the server 🔥
[ listening ] on port 3000
[ hmr ] starting the hot reloader
[ hmr ] watching for changes`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box textAlign="center" bgcolor="#0a0a0a" style={{ textTransform: 'uppercase' }}>
        <Box color="white" py={12}>
          <Box fontSize="2rem" fontWeight={200} pb={4}>
            light.js
          </Box>
          <Box fontSize="1.25rem" fontWeight="bold">
            a
          </Box>
          <Box fontSize="3rem" fontWeight={1000}>
            <Typed
              strings={[
                'fast',
                'serverless',
                'testable',
                'functional',
                'developer friendly',
                'flexible',
                'lightweight',
                'next-gen',
              ].map((s) => `&nbsp;${s}`)}
              typeSpeed={50}
              backSpeed={30}
              backDelay={1500}
            />
          </Box>
          <Box fontSize="1.25rem" fontWeight="bold">
            framework
          </Box>
        </Box>
        <Box>
          <a
            href="https://github.com/ludicroushq/light/actions?query=workflow%3Amain"
            className="inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="Github Actions"
              src="https://img.shields.io/github/workflow/status/ludicroushq/light/main?label=ci%20status&style=for-the-badge&labelColor=0a0a0a"
            />
          </a>
          &nbsp;&nbsp;
          <a
            href="https://www.npmjs.com/package/light"
            className="inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="NPM"
              src="https://img.shields.io/npm/v/light.svg?label=npm%20version&style=for-the-badge&labelColor=0a0a0a"
            />
          </a>
          &nbsp;&nbsp;
          <a
            href="https://www.npmjs.com/package/light"
            className="inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="Downloads"
              src="https://img.shields.io/npm/dm/light.svg?label=downloads&style=for-the-badge&labelColor=0a0a0a"
            />
          </a>
          &nbsp;&nbsp;
          <a
            href="https://github.com/ludicroushq/light"
            className="inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="Stars"
              src="https://img.shields.io/github/stars/ludicroushq/light.svg?style=for-the-badge&labelColor=0a0a0a"
            />
          </a>
          &nbsp;&nbsp;
          <a
            href="https://codecov.io/gh/ludicroushq/light"
            className="inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="CodeCov"
              src="https://img.shields.io/codecov/c/github/ludicroushq/light?label=code%20coverage&style=for-the-badge&labelColor=0a0a0a"
            />
          </a>
        </Box>
      </Box>
      <Container>
        <Box pt={4} />
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          <Grid item sm={12} md={6} direction="column">
            <Box textAlign="center" fontSize="1.25rem" style={{ textTransform: 'uppercase' }}>
              as simple as
            </Box>
            <Box textAlign="center" fontSize="1.75rem" fontWeight={1000}>
              light dev
            </Box>
            <Box py={2} />
            <Highlight {...defaultProps} theme={dracula} code={sampleTerminal} language="txt">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </Grid>
          <Grid item sm={12} md={6}>
            <Highlight {...defaultProps} theme={dracula} code={sampleCode} language="js">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </Grid>
        </Grid>
        <Box pt={2} />
        <hr />
        <Box pb={2} />
        <Box fontSize="2rem" fontWeight={1000} textAlign="center">
          reload without actually reloading
        </Box>
        <Box textAlign="center" fontSize="1.25rem" style={{ textTransform: 'uppercase' }}>
          don't waste time waiting for your server to restart
        </Box>
        <Box pb={2} />
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          <Grid item sm={12} md={5} direction="column">
            <pre style={{ marginBottom: '0px' }}>
              <code style={{ color: indigo[500] }}>$ light dev</code>
              <br />
              <code style={{ color: indigo[500] }}>[ start ] 🔥 igniting the server 🔥</code>
              <br />
              <code style={{ color: pink[500] }}>[ hmr ] swapping routes/index.js</code>
              <br />
              <code style={{ color: green[500] }}>[ done ] 1ms </code>
              <br />
            </pre>
          </Grid>
          <Grid item sm={12} md={1} direction="column">
            <Box textAlign="center">vs</Box>
          </Grid>
          <Grid item sm={12} md={5} direction="column">
            <pre style={{ marginBottom: '0px' }}>
              <code style={{ color: indigo[500] }}>$ node express.js</code>
              <br />
              <code style={{ color: indigo[500] }}>> server started</code>
              <br />
              <code style={{ color: pink[500] }}>> routes/index.js changed</code>
              <br />
              <code>restarting server</code>
              <br />
              <code>reimporting all routes</code>
              <br />
              <code>reconnecting to database</code>
              <br />
              <code>reconnecting to cache</code>
              <br />
              <code>recompiling templates</code>
              <br />
              <code>etc...</code>
              <br />
              <code style={{ color: green[500] }}>> done... 1-5 seconds </code>
              <br />
            </pre>
          </Grid>
        </Grid>
        <Box pt={2} />
        <hr />
        <Box pb={2} />
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          <Grid item sm={12} md={4} direction="column">
            <Box fontSize="2rem" fontWeight={1000} textAlign="center">
              write once
            </Box>
            <Box textAlign="center" fontSize="1.25rem" style={{ textTransform: 'uppercase' }}>
              deploy anywhere
            </Box>
          </Grid>
          <Grid item sm={12} md={2} direction="column">
            <Paper>
              <MenuList>
                <MenuItem selected={selected === 'now'} onClick={() => select('now')}>
                  Vercel NOW
                </MenuItem>
                <MenuItem selected={selected === 'aws'} onClick={() => select('aws')}>
                  AWS
                </MenuItem>
                <MenuItem selected={selected === 'runkit'} onClick={() => select('runkit')}>
                  RunKit
                </MenuItem>
                <MenuItem selected={selected === 'gcloud'} onClick={() => select('gcloud')}>
                  Google Cloud
                </MenuItem>
                <MenuItem selected={selected === 'netlify'} onClick={() => select('netlify')}>
                  Netlify
                </MenuItem>
                <MenuItem selected={selected === 'server'} onClick={() => select('server')}>
                  Server
                </MenuItem>
                <MenuItem selected={selected === 'heroku'} onClick={() => select('heroku')}>
                  Heroku
                </MenuItem>
              </MenuList>
            </Paper>
          </Grid>
          <Grid item sm={12} md={6} direction="column">
            <Highlight {...defaultProps} theme={dracula} code={getCode(selected)} language="js">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...style, marginBottom: '0px' }}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </Grid>
        </Grid>
        <Box pt={2} />
        <hr />
        <Hidden smDown>
          <Box pb={2} />
          <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
            <Grid item sm={12} md={8} direction="column">
              <Embed
                mode="endpoint"
                source={`process.env.LIGHT_ENV = 'runkit';
const { createRoute } = require('light');\n
const { route, GET } = createRoute();\n
GET(() => {
  return {
    hello: 'world!',
  };
});
module.exports = route;`}
              />
            </Grid>
            <Grid item sm={12} md={4} direction="column">
              <Box fontSize="2rem" fontWeight={1000} textAlign="center">
                try it out yourself
              </Box>
              <Box textAlign="center" fontSize="1.25rem" style={{ textTransform: 'uppercase' }}>
                on RunKit
              </Box>
            </Grid>
          </Grid>
          <Box pt={2} />
          <hr />
        </Hidden>
        <Box pb={2} />
        <Box fontSize="2rem" fontWeight={1000} textAlign="center">
          get started
        </Box>
        <Box textAlign="center" pt={2}>
          <Button
            href="/docs/introduction/getting-started.mdx"
            variant="contained"
            color="primary"
            size="large"
          >
            check out the docs
          </Button>
        </Box>
        <Box pt={4} />
      </Container>
    </ThemeProvider>
  );
}

function Home() {
  return (
    <Layout title="home" description="a next-gen framework">
      <Page />
    </Layout>
  );
}

export default Home;
