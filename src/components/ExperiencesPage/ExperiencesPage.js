import React from 'react'
import Moment from 'react-moment'
import { useExperiences } from '../../hooks/useExperiences'
import { useTheme } from 'emotion-theming'
import Heading from '../Elements/Heading'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown'
import styles from '../../Styles'
import { Link } from '@reach/router'
import EditIcon from '@material-ui/icons/Edit'

const ExperiencesPage = () => {
  const { experiences } = useExperiences()

  const theme = useTheme()

  const Section = styled.section``
  const Experience = styled.article`
    background: black;
    padding: ${styles.space.m};
    margin-bottom: ${styles.space.m};
    margin-left: -${styles.space.m};
    margin-right: -${styles.space.m};
    @media (min-width: ${styles.breakpoints.s}) {
      padding: ${styles.space.l};
      margin-left: 0;
      margin-right: 0;
    }
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

        case 'obe':
          categoryNames.push('Out-of-Body')
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
      <Experience key={exp.title + exp.date.toString()}>
        <TopGroup>
          <Heading level={2}>{exp.title}</Heading>
          <Link to={`/edit-story/${exp.docId}`}>
            <EditIcon color="primary" />
          </Link>
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
