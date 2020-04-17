import React from 'react'
import Moment from 'react-moment'
import { useExperiences } from '../../hooks/useExperiences'
import { useTheme } from 'emotion-theming'
import Heading from '../Elements/Heading'
import styled from '@emotion/styled'
import styles from '../../Styles'

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
    console.log('date', exp.date)
    return (
      <Experience key={exp.date.toString()}>
        <Heading level={2}>{exp.title}</Heading>
        <Date>
          <Moment format="dddd, MMMM Do YYYY">{exp.date}</Moment>
        </Date>
        <Categories>{buildCategoriesString(exp.categories)}</Categories>
        <Story>{exp.story}</Story>
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
