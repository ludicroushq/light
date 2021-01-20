import Link from '@docusaurus/Link';
import React from 'react';

export function Hero() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            light.js
          </h2>
          <p className="mt-1 text-6xl font-extrabold text-gray-900 sm:text-7xl sm:tracking-tight lg:text-8xl">
            The Node Framework for the Next Generation.
          </p>
          <p className="max-w-4xl mt-8 mx-auto text-xl text-gray-500">
            Light is a zero-configuration node server with sane defaults and optimal performance. It
            ships with all of modern tools by default: hooks-style endpoints, typescript support,
            and file-system based routing.
            <h2 className="text-base text-indigo-600 tracking-wide uppercase mt-2">
              No Boilerplate, No Opinions, No Bulls**t.
            </h2>
          </p>
          <div className="mt-6">
            <Link
              to="docs/introduction/getting-started"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
