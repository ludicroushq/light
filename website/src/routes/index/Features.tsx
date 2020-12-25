import React from 'react';

function Item({ title, description }) {
  return (
    <div className="flex justify-center">
      <div className="ml-3">
        <dt className="text-lg leading-6 font-medium text-gray-900">{title}</dt>
        <dd className="mt-2 text-base text-gray-500">{description}</dd>
      </div>
    </div>
  );
}

export function Features(props) {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Why Light.js</h2>
          <p className="mt-4 text-lg text-gray-500">Get up</p>
        </div>
        <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
          <Item title="asdf" description="asdf" />
          <Item title="asdf" description="asdf" />
          <Item title="asdf" description="asdf" />
          <Item title="asdf" description="asdf" />
          <Item title="asdf" description="asdf" />
          <Item title="asdf" description="asdf" />
          <Item title="asdf" description="asdf" />
          <Item title="asdf" description="asdf" />
        </dl>
      </div>
    </div>
  );
}
