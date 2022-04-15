module.exports = {
  title: 'light.js by ludicrous',
  tagline: 'a next-gen node framework',
  url: 'https://www.lightjs.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'ludicroushq', // Usually your GitHub org/user name.
  projectName: 'light', // Usually your repo name.
  plugins: ['docusaurus-tailwindcss-loader'],
  scripts: ['https://embed.runkit.com'],
  themeConfig: {
    algolia: {
      apiKey: process.env.ALGOLIA_API_KEY,
      appId: process.env.ALGOLIA_APP_ID,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    navbar: {
      title: 'light.js',
      logo: {
        alt: 'light',
        src: 'img/light.svg',
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
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/introduction/getting-started',
            },
            {
              label: 'Core Concepts',
              to: 'docs/core/routes',
            },
            {
              label: 'Deploy',
              to: 'docs/deploy/vercel',
            },
            {
              label: 'Third Party',
              to: 'docs/third-party/apollo',
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
              label: 'Discussions',
              href: 'https://github.com/ludicroushq/light/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/ludicroushq/light/issues',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/A6m2QmjrWY',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Light.js Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
        {
          title: 'About Ludicrous',
          items: [
            {
              label: 'Home',
              to: 'https://www.ludicroushq.com',
            },
            {
              label: 'Blog',
              to: 'https://blog.ludicroushq.com',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/ludicroushq',
            },
          ],
        },
      ],
      copyright: `Copyright &copy; ${new Date().getFullYear()} ludicrous LLC.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
