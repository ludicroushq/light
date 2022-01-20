import React from 'react';
import Embed from 'react-runkit';

const source = `// let light know that we are using it in Runkit before importing it
process.env.LIGHT_ENV = 'runkit';
const cors = require('cors');
const { createRoute, withConnect } = require('light');

// we need to export our route for the world to listen!
module.exports = createRoute(() => {
  /*
    light uses a unique kind of middleware, but it also provides
    a wrapper for connect (express) and koa style middleware
  */
  useMiddleware(withConnect(cors()));

  // define handlers for the methods you need
  return {
    async GET() {
      return {
        hello: 'world',
      };
    }
  }
});`;

export default function Runkit(props) {
  return (
    <div className="bg-white hidden lg:block">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Give it a shot</h2>
            <p className="mt-4 text-lg text-gray-500">
              Since light is flexible enough to run in many different environments, you can play
              with it right here in the browser with Runkit!
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <Embed source={source} mode="endpoint" nodeVersion="14" />
          </div>
        </div>
      </div>
    </div>
  );
}
