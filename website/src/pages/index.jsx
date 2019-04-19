import React from 'react';

import Hero from '../components/Hero';

export default () => (
  <div>
    <Hero
      title="light"
      subtitle={[
        ' weight',
        ' on your resources',
        'ning fast',
      ].map(l => `a framework that is <b>light</b>${l}`)}
      smartBackspace={true}
      size="medium"
    />
  </div>
);
