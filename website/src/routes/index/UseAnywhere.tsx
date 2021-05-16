import { CheckIcon, ClockIcon } from '@heroicons/react/solid';
import React, { ReactNode } from 'react';

function Item({
  name,
  description,
  comingSoon = false,
}: {
  name: string;
  description: ReactNode;
  comingSoon?: boolean;
}) {
  return (
    <div className="flex">
      {comingSoon ? (
        <ClockIcon className="flex-shrink-0 h-6 w-6 text-yellow-500" />
      ) : (
        <CheckIcon className="flex-shrink-0 h-6 w-6 text-green-500" />
      )}
      <div className="ml-3">
        <dt className="text-lg leading-6 font-medium text-gray-900">{name}</dt>
        <dd className="mt-2 text-base text-gray-500">{description}</dd>
      </div>
    </div>
  );
}

export default function UseAnywhere(props) {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div>
          <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">
            Without changing your code,
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">Use Anywhere</p>
          <p className="mt-4 text-lg text-gray-500">
            Light can run as a normal server, or transform itself to work in a variety of different
            serverless environments and frameworks without any code changes.
          </p>
        </div>
        <div className="mt-12 lg:mt-0 lg:col-span-2">
          <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-3 sm:grid-flow-row sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
            <Item
              name="Bare Metal Server"
              description="With the run of `light start`, you can get light running on a bare metal server."
            />
            <Item
              name="Docker"
              description="Light can easily fit inside of a Docker container to give you a small portable version of your app."
            />
            <Item
              name="Heroku"
              description="Light works with Heroku out of the box and can be easily deployed with the run of a command."
            />
            <Item
              name="Next.js"
              description="Light works well even without a server at all and can be used inside of Next.js api routes."
            />
            <Item
              name="Vercel"
              description="Light can deploy and run inside of Vercel's serverless platform in a matter of seconds."
            />
            <Item
              name="Netlify"
              description="Light can be deployed alongside your frontend on Netlify's function platform."
            />
            <Item name="AWS Lambda" description="Coming soon" comingSoon />
            <Item name="Google Cloud Functions" description="Coming soon" comingSoon />
            <Item name="Azure Functions" description="Coming soon" comingSoon />
            <Item name="Cloudflare Workers" description="Coming soon" comingSoon />
          </dl>
        </div>
      </div>
    </div>
  );
}
