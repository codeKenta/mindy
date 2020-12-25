import React from 'react'
import Moment from 'react-moment'
import { Link } from 'gatsby'

import { useExperiences } from '@hooks/useExperiences'
import { useCategories } from '@hooks/useCategories'
import EditIcon from '@material-ui/icons/Edit'
import Heading from '@components/Elements/Heading'
import PlaceholderFeed from '@components/PlaceholderFeed/PlaceholderFeed'
import FilterPosts from '@components/FilterPosts/FilterPosts'
import ReactMarkdown from 'react-markdown'
import Inview from '@components/Inview/Inview'
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
    NoStories,
  } = experiencePageStyles

  const { availableCategories } = useCategories()

  const buildCategoriesSwitch = () => {
    let obj = {}

    availableCategories.forEach(({ docId, value }) => {
      obj[docId] = value
    })
    return obj
  }

  const cagegoriesSwitch = buildCategoriesSwitch()

  const buildCategoriesString = categories => {
    let categoryNames = []

    if (categories) {
      categories.forEach(id => {
        if (cagegoriesSwitch[id]) categoryNames.push(cagegoriesSwitch[id])
      })
    }

    return categoryNames.join(', ')
  }

  const renderExperiences = shownExperiences.map(exp => {
    const storyTextAsMarkdown =
      exp.story && exp.story.markdown ? JSON.parse(exp.story.markdown) : null

    return (
      <Experience key={exp.docId}>
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
        <ReactMarkdown source={storyTextAsMarkdown} />
      </Experience>
    )
  })

  return (
    <Section>
      <Heading level={1}>Your experiences</Heading>
      <FilterPosts />
      {renderExperiences}
      {!isLoading && renderExperiences.length === 0 && (
        <NoStories>
          No stories found. Add a new story or try a different filter.
        </NoStories>
      )}
      {isLoading && <PlaceholderFeed />}
      {firstLoadCompleted && <Inview triggerFunction={getExperiences} />}
    </Section>
  )
}

export default ExperiencesPage
