import React, { useEffect, useState } from 'react'
import { useTheme } from 'emotion-theming'

import throttle from 'lodash.throttle'
import styled from '@emotion/styled'
import styles from '@styling'

import { useExperiences } from '@hooks/useExperiences'

import Categories from '@components/Categories/Categories'
import DateInput from '@components/Forms/DateInput/DateInput'

const Wrapper = styled.div`
  margin-bottom: 20px;
`

const FilterPosts = () => {
  const theme = useTheme()

  const DatePicker = styled(DateInput)`
    box-sizing: border-box;
    display: block;
    width: 100%;
    border: 1px solid ${theme.primary};
    border-radius: 10px;
    background: ${theme.fieldBackground};
    padding: ${styles.space.s};
    color: inherit;
  `

  const {
    firstLoadCompleted,
    actions: { getExperiences },
  } = useExperiences()

  const [categories, setCategories] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  function handleStartDate(date) {
    setStartDate(date)
  }
  function handleEndDate(date) {
    setEndDate(date)
  }

  useEffect(() => {
    if (firstLoadCompleted) {
      console.log('FILTERING EFFECT')
      function handleGetExperiences() {
        getExperiences(categories, startDate, endDate, true)
      }

      const throttledGetExperiences = throttle(handleGetExperiences, 100000, {
        trailing: false,
      })
      throttledGetExperiences()
    }
  }, [categories, startDate, endDate])

  return (
    <Wrapper>
      <Categories
        useToFilter={true}
        activeCategories={categories}
        setActiveCategories={setCategories}
      />

      <DatePicker
        selectsStart
        startDate={startDate}
        endDate={endDate}
        onChange={handleStartDate}
        initialDate={startDate}
      />
      <DatePicker
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        onChange={handleEndDate}
        initialDate={endDate}
        minDate={startDate}
      />
    </Wrapper>
  )
}

export default FilterPosts
