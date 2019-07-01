import React from 'react';
import join from 'url-join';
import fetch from 'isomorphic-unfetch';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CodeBlock from '../components/CodeBlock';
import Sidebar from '../components/Sidebar';

export default class Posts extends React.Component {
  static async getInitialProps({ query }) {
    let { title } = query;

    const fetchPost = await fetch(join(process.env.BASE_URL, `docs/${title}.md`));
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

    const fetchSidebar = await fetch(join(process.env.BASE_URL, `docs/docs.json`));
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
        <div className="w-full max-w-screen-xl relative py-12 bg-gray-100 text-center">
          <h1 className="text-4xl font-semibold uppercase text-center">{ title }</h1>
          <h2 className="text-xl font-semibold uppercase">{ subtitle }</h2>
        </div>
        <div className="pt-12 container mx-auto">
          <div className="flex flex-row flex-wrap">
            <div className="flex flex-row w-full px-4 md:px-0 md:w-1/4">
              <Sidebar menu={menu} active={path} prefix="/docs" label="Docs" />
            </div>
            <div className="flex flex-col content px-4 w-full md:w-3/4">
              <Markdown
                source={content}
                linkTarget="_blank"
                renderers={{
                  code: CodeBlock,
                }}
              />
              <div className="flex">
                <div className="w-5/12 md:w-1/4">
                  { cont.previous ? (
                    <a href={`/docs/${cont.previous.path}`} className="inline-block text-center rounded p-2 bg-pink-500 w-full">
                      <span className="pr-4 text-white">
                        <FontAwesomeIcon icon="caret-left" />
                      </span>
                      <span className="text-white">{ cont.previous.name }</span>
                    </a>
                  ) : null }
                </div>
                <div className="flex-1"></div>
                <div className="w-5/12 md:w-1/4">
                  { cont.next ? (
                    <a href={`/docs/${cont.next.path}`} className="inline-block text-center rounded p-2 bg-pink-500 w-full">
                      <span className="text-white">{ cont.next.name }</span>
                      <span className="pl-4 text-white">
                        <FontAwesomeIcon icon="caret-right" />
                      </span>
                    </a>
                  ) : null }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
