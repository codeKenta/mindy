require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Mindy`,
    description: `Your personal journaling tool`,
    author: `Kenneth Österholm`,
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        '@src': path.join(__dirname, 'src'),
        '@styling': path.join(__dirname, 'src/styling'),
        '@components': path.join(__dirname, 'src/components'),
        '@hooks': path.join(__dirname, 'src/hooks'),
        '@context': path.join(__dirname, 'src/context'),
        '@pages': path.join(__dirname, 'src/pages'),
        '@templates': path.join(__dirname, 'src/templates'),
        '@assets': path.join(__dirname, 'src/assets'),
        '@layout': path.join(__dirname, 'src/layout'),
        '@utils': path.join(__dirname, 'src/utils'),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_CMS_TOKEN,
        previewMode: false,
        disableLiveReload: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Nunito\:300,300i,400,400i,700,700i`, // you can also specify font weights and styles
          `Kufam`,
        ],
        // fonts: [

        //   `Nunito: 400, 400i, 700`, // you can also specify font weights and styles
        // ],
        display: 'swap',
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
