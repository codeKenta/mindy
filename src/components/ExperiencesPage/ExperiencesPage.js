import React from 'react'
import Moment from 'react-moment'
import { useExperiences } from '../../hooks/useExperiences'
import { useTheme } from 'emotion-theming'
import Heading from '../Elements/Heading'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown'
import styles from '../../Styles'
import { Link } from '@reach/router'

const ExperiencesPage = () => {
  const { experiences } = useExperiences()

  const theme = useTheme()

  const Section = styled.section``
  const Experience = styled.article`
    background: ${theme.sectionBackground};
    background: black;
    padding: ${styles.space.l};
    margin-bottom: ${styles.space.m};
  `
  const Date = styled.span`
    font-weight: ${styles.font.fontWeights.bold};
    display: block;
  `
  const Categories = styled.span`
    display: block;
    font-style: italic;
  `

  const TopGroup = styled.div`
    display: flex;
    justify-content: space-between;
  `

  const Story = styled.p``
  const buildCategoriesString = categories => {
    let categoryNames = []

    categories.forEach(category => {
      switch (category) {
        case 'd':
          categoryNames.push('Dream')
          break
        case 'ld':
          categoryNames.push('Lucid Dream')
          break
        case 'ap':
          categoryNames.push('Astral Projection')
          break
        case 'vd':
          categoryNames.push('Vivid Dream')
          break
        case 'sp':
          categoryNames.push('Sleep paralysis')
          break
        case 'm':
          categoryNames.push('Meditation')
          break
        case 'other':
          categoryNames.push('Other')
          break
        default:
          break
      }
    })

    return categoryNames.join(', ')
  }

  const renderExperiences = experiences.map(exp => {
    const storyPureText = typeof exp.story === 'string' ? exp.story : null

    const storyTextAsMarkdown =
      !storyPureText && exp.story && exp.story.markdown
        ? JSON.parse(exp.story.markdown)
        : null

    return (
      <Experience key={exp.date.toString()}>
        <TopGroup>
          <Heading level={2}>{exp.title}</Heading>
          <Link to={`/edit-story/${exp.docId}`}>Edit</Link>
        </TopGroup>
        <Date>
          <Moment format="dddd, MMMM Do YYYY">{exp.date}</Moment>
        </Date>
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
    </Section>
  )
}

export default ExperiencesPage
