import React, { ComponentType, FC, ReactComponentElement, ReactNode } from 'react';
import { CodeIcon } from '@heroicons/react/solid';
import { LinkIcon, TerminalIcon } from '@heroicons/react/outline';

function Item({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: typeof Code | typeof LinkOutline | typeof TerminalOutline;
}) {
  return (
    <div>
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
        <Icon className="h-6 w-6" />
      </div>
      <div className="mt-5">
        <dt className="text-lg leading-6 font-medium text-gray-900">{title}</dt>
        <dd className="mt-2 text-base text-gray-500">{description}</dd>
      </div>
    </div>
  );
}

export default function Features(props) {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">A better way to send money.</h2>
        <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          <Item
            title="Native Typescript Support"
            description="Light is fully built with TypeScript so you can be more confident when deploying your codebase to production."
            Icon={CodeIcon}
          />
          <Item
            title="Support for Express and Koa Middleware"
            description="We know that there are a lot of great existing middleware which is why we provide wrappers to use Express and Koa middleware."
            Icon={LinkIcon}
          />
          <Item
            title="Great Development Experience"
            description="Light comes with Typescript, Hot Module Reloading, and File Based Routing to make your development experience fast and organized."
            Icon={TerminalIcon}
          />
        </dl>
      </div>
    </div>
  );
}
