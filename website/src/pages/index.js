import React from 'react';
import Layout from '@theme/Layout';
import { Hero } from '../routes/index/Hero';
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
      </div>
    </Layout>
  );
}

export default Home;
