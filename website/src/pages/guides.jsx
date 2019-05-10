import React from 'react';
import { resolve } from 'url';
import fetch from 'isomorphic-unfetch';

import Hero from '../components/Hero';
import Sidebar from '../components/Sidebar';

export default class Posts extends React.Component {
  static async getInitialProps({ query }) {
    let { title } = query;
    if (!title) {
      title = 'getting-started';
    }

    const fetchPost = await fetch(resolve(process.env.baseURL, `guides/${title}.md`));
    const post = await fetchPost.text();
    const split = post.split('---');
    split.shift();
    const metadata = split.shift().trim();
    const content = split.join('---').trim();

    const res = {};
    res.content = content;

    metadata.split('\n').forEach((line) => {
      const [attr, val] = line.split(':');
      res[attr.trim()] = val.trim();
    });

    const fetchSidebar = await fetch(resolve(process.env.baseURL, `guides/guides.json`));
    const menu = await fetchSidebar.json();

    return {
      query,
      menu,
      ...res,
    };
  }

  render() {
    const { title, subtitle, content, menu } = this.props;
    return (
      <div>
        <Hero
          title={title}
          subtitle={subtitle}
        />
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-quarter">
                <Sidebar menu={menu} />
              </div>
              <div className="column">{ content }</div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
