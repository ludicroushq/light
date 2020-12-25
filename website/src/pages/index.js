import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Hero } from '../routes/index/Hero';
import { Features } from '../routes/index/Features';
import { Stats } from '../routes/index/Stats';
import { Benchmarks } from '../routes/index/Benchmarks';

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title="Home" description="Description will go into a meta tag in <head />">
      <div id="tailwind">
        <Hero />
        <Features />
        <Benchmarks />
        <Stats />
        {/* <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title font-black">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header> */}
      </div>
    </Layout>
  );
}

export default Home;
