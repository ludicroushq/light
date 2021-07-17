#!/usr/bin/env zx

await $`npm update && npm audit fix`;
await $`lerna exec --parallel -- npm update && lerna exec --parallel -- npm audit fix`;

cd('./benchmark');
await $`npm update && npm audit fix`;
cd('../');

cd('./examples');
await $`lerna exec --parallel -- npm update && lerna exec --parallel -- npm audit fix`;
cd('../');

cd('./website');
await $`npm update && npm audit fix`;
cd('../');
