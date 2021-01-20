import React from 'react';
import Layout from '@theme/Layout';
import Hero from '../routes/index/Hero';
import UseAnywhere from '../routes/index/UseAnywhere';
import Features from '../routes/index/Features';
import CTA from '../routes/index/CTA';
import FAQ from '../routes/index/FAQ';
import Stats from '../routes/index/Stats';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import clsx from 'clsx';
// import Link from '@docusaurus/Link';
// import useBaseUrl from '@docusaurus/useBaseUrl';

function Home() {
  // const context = useDocusaurusContext();
  // const { siteConfig = {} } = context;
  return (
    <Layout title="Home" description="Description will go into a meta tag in <head />">
      <div id="tailwind">
        <Hero />
        <Features />
        <UseAnywhere />
        <Stats />
        <FAQ />
        <CTA />
      </div>
    </Layout>
  );
}

export default Home;
