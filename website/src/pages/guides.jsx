import React from 'react';
import join from 'url-join';
import fetch from 'isomorphic-unfetch';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CodeBlock from '../components/CodeBlock';
import Hero from '../components/Hero';
import Sidebar from '../components/Sidebar';

export default class Posts extends React.Component {
  static async getInitialProps({ query }) {
    let { title } = query;

    const fetchPost = await fetch(join(process.env.BASE_URL, `guides/${title}.md`));
    const post = await fetchPost.text();
    const split = post.split('---');
    split.shift();
    const metadata = split.shift().trim();
    const content = split.join('---').trim();

    const response = {};
    response.content = content;

    metadata.split('\n').forEach((line) => {
      const [attr, val] = line.split(':');
      response[attr.trim()] = val.trim();
    });

    const fetchSidebar = await fetch(join(process.env.BASE_URL, `guides/guides.json`));
    const menu = await fetchSidebar.json();

    const flatMenu = Object.assign(
      {},
      ...function _flatten(o) {
        return [].concat(...Object.keys(o)
          .map(k =>
            typeof o[k] === 'object' ?
              _flatten(o[k]) :
              ({[k]: o[k]})
          )
        );
      }(menu)
    )

    const previous = Object.keys(flatMenu).reverse().reduce((acc, key) => {
      const val = flatMenu[key];
      if (val === title) {
        return true;
      }
      if (acc === true) {
        return key;
      }
      return acc;
    }, false);

    const next = Object.keys(flatMenu).reduce((acc, key) => {
      const val = flatMenu[key];
      if (val === title) {
        return true;
      }
      if (acc === true) {
        return key;
      }
      return acc;
    }, false);

    const cont = {};

    if (previous !== false && previous !== true) {
      cont.previous = {
        name: previous,
        path: flatMenu[previous],
      };
    }

    if (next !== false && next !== true) {
      cont.next = {
        name: next,
        path: flatMenu[next],
      };
    }

    return {
      query,
      menu,
      cont,
      path: title,
      ...response,
    };
  }

  render() {
    const { title, subtitle, content, menu, path, cont } = this.props;
    return (
      <div>
        <Hero
          title={title}
          subtitle={subtitle}
          typed={false}
        />
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-quarter">
                <Sidebar menu={menu} active={path} prefix="/guides" label="Guides" />
              </div>
              <div className="column">
                <div className="content is-medium">
                  <Markdown
                    source={content}
                    linkTarget="_blank"
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
                <div className="columns">
                  <div className="column">
                    { cont.previous ? (
                      <a href={`/guides/${cont.previous.path}`} class="button is-fullwidth is-outlined is-info">
                        <span class="icon">
                          <FontAwesomeIcon icon="caret-left" />
                        </span>
                        <span>{ cont.previous.name }</span>
                      </a>
                    ) : null }
                  </div>
                  <div className="column is-6" />
                  <div className="column">
                    { cont.next ? (
                      <a href={`/guides/${cont.next.path}`} class="button is-fullwidth is-outlined is-info">
                        <span>{ cont.next.name }</span>
                        <span class="icon">
                          <FontAwesomeIcon icon="caret-right" />
                        </span>
                      </a>
                    ) : null }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
