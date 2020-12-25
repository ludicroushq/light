import React from 'react';

const results = [
  { name: 'Light.js', totalTimeInMilliseconds: 4024, requestsPerSecond: 2485 },
  { name: 'Fastify', totalTimeInMilliseconds: 4403, requestsPerSecond: 2271 },
  { name: 'Koa', totalTimeInMilliseconds: 4392, requestsPerSecond: 2277 },
  { name: 'Express', totalTimeInMilliseconds: 6862, requestsPerSecond: 1457 },
];

const maxTimeInMilliseconds = Math.max(...results.map((result) => result.totalTimeInMilliseconds));

export function Benchmarks(props) {
  return (
    <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              Blazing fast performance
            </h3>
            <p className="mt-3 text-lg text-gray-500">Get</p>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <div className="grid grid-cols-2 gap-2">
              {results.map((result) => (
                <>
                  <div className="text-right">{result.name}</div>
                  <div
                    className="bg-blue-100"
                    style={{
                      width: `${(result.totalTimeInMilliseconds / maxTimeInMilliseconds) * 100}%`,
                    }}
                  />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
