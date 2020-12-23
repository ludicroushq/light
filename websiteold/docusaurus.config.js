module.exports = {
  title: 'light',
  tagline: 'a next gen node framework',
  url: 'https://light.js.org',
  baseUrl: '/',
  favicon: 'img/favicon.png',
  organizationName: 'ludicroushq', // Usually your GitHub org/user name.
  projectName: 'light', // Usually your repo name.
  scripts: ['https://embed.runkit.com'],
  themeConfig: {
    sidebarCollapsible: false,
    // ...(process.env.NODE_ENV === 'production'
    //   ? {
    //       algolia: {
    //         apiKey: process.env.ALGOLIA_API_KEY,
    //         indexName: process.env.ALGOLIA_INDEX_NAME,
    //       },
    //     }
    //   : {}),
    navbar: {
      title: 'light',
      logo: {
        alt: 'light',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/introduction/getting-started',
          activeBaseRegex: 'docs/(?!api).*',
          label: 'Docs',
          position: 'right',
        },
        {
          to: 'docs/api/exported/create-route',
          activeBasePath: 'docs/api',
          label: 'API',
          position: 'right',
        },
        { to: 'blog', label: 'Blog', position: 'right' },
        {
          href: 'https://github.com/ludicroushq/light',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: 'docs/introduction/getting-started',
            },
            {
              label: 'API',
              to: 'docs/api/exported/create-route',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Help',
              href:
                'https://github.com/ludicroushq/light/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc',
            },
            // {
            //   label: "Stack Overflow",
            //   href: "https://stackoverflow.com/questions/tagged/docusaurus",
            // },
            // {
            //   label: "Discord",
            //   href: "https://discordapp.com/invite/docusaurus",
            // },
            // {
            //   label: "Twitter",
            //   href: "https://twitter.com/nahtnam",
            // },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ludicroushq/light',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ludicrous LLC.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          // homePageId: "introduction/getting-started",
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/ludicroushq/light/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/ludicroushq/light/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
