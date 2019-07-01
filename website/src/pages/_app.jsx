import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faCaretLeft, faCaretRight, faChevronRight, faArrowRight, faBolt } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;
import '../../node_modules/@fortawesome/fontawesome-svg-core/styles.css';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

import '../assets/css/index.css';

library.add(
  faBolt,
  faCaretLeft,
  faCaretRight,
);

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>light</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" hid="description" content="a lightining fast web server" />
          <script src="https://embed.runkit.com"></script>
        </Head>
        <div className="app">
          <Navigation />
          <div className="bg-indigo-300 p-3 text-sm">
            <div className="text-center">
              NOTICE: Since <strong>light</strong> is a work in progress, breaking changes will be made every MINOR patch until 2.0
            </div>
          </div>
          <main className="main">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </Container>
    );
  }
}
