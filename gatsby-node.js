const path = require(`path`)

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: `/`,
    component: path.resolve(`./src/templates/index.js`),
  })

  const postFormComponentPath = path.resolve(`./src/templates/postFormPage.js`)

  createPage({
    path: `/new-story`,
    component: postFormComponentPath,
    // context: { locale: page.locale },
  })

  createPage({
    path: `/edit-story/`,
    matchPath: '/edit-story/:docId',
    component: postFormComponentPath,
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /(react-draft-wysiwyg|draftjs-to-markdown)/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
