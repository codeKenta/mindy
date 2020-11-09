import React from 'react'
import Moment from 'react-moment'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { useExperiences } from '../../hooks/useExperiences'
import Heading from '../Elements/Heading'
import PlaceholderFeed from '../PlaceholderFeed/PlaceholderFeed'

import ReactMarkdown from 'react-markdown'
import EditIcon from '@material-ui/icons/Edit'
import Inview from '../Inview/Inview'
import experiencePageStyles from './experiencePageStyles'

const ExperiencesPage = () => {
  const {
    shownExperiences,
    firstLoadCompleted,
    isLoading,
    actions: { getExperiences },
  } = useExperiences()

  const {
    Section,
    Experience,
    DateText,
    Categories,
    TopGroup,
    Story,
  } = experiencePageStyles

  const { allDatoCmsCategory } = useStaticQuery(
    graphql`
      query {
        allDatoCmsCategory {
          categories: nodes {
            short: categoryShort
            name: categoryName
          }
        }
      }
    `
  )

  const buildCategoriesSwitch = () => {
    let obj = {}

    allDatoCmsCategory.categories.forEach(({ short, name }) => {
      obj[short] = name
    })
    return obj
  }

  const cagegoriesSwitch = buildCategoriesSwitch()

  const buildCategoriesString = categories => {
    let categoryNames = []

    categories.forEach(category => {
      categoryNames.push(cagegoriesSwitch[category])
    })

    return categoryNames.join(', ')
  }

  const renderExperiences = shownExperiences.map(exp => {
    const storyPureText = typeof exp.story === 'string' ? exp.story : null

    const storyTextAsMarkdown =
      !storyPureText && exp.story && exp.story.markdown
        ? JSON.parse(exp.story.markdown)
        : null

    return (
      <Experience key={exp.title + exp.date.toString()}>
        <TopGroup>
          <Heading level={2}>{exp.title}</Heading>
          <Link to={`/edit-story/${exp.docId}`}>
            <EditIcon color="primary" />
          </Link>
        </TopGroup>
        <DateText>
          <Moment format="dddd, MMMM Do YYYY">{exp.date}</Moment>
        </DateText>
        <Categories>{buildCategoriesString(exp.categories)}</Categories>
        <Story>{storyPureText}</Story>
        {!storyPureText && <ReactMarkdown source={storyTextAsMarkdown} />}
      </Experience>
    )
  })
  return (
    <Section>
      <Heading level={1}>Your experiences</Heading>
      {renderExperiences}
      {isLoading && <PlaceholderFeed />}
      {firstLoadCompleted && <Inview triggerFunction={getExperiences} />}
    </Section>
  )
}

export default ExperiencesPage
