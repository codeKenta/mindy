import React, { useEffect, useState, useRef } from 'react'
import { useTheme } from 'emotion-theming'

import throttle from 'lodash.throttle'
import styled from '@emotion/styled'
import styles from '@styling'

import { useExperiences } from '@hooks/useExperiences'

import Categories from '@components/Categories/Categories'
// import DateInput from '@components/Forms/DateInput/DateInput'
import DatePicker from 'react-datepicker'

const Wrapper = styled.div`
  margin-bottom: 20px;
`

const FilterPosts = () => {
  const theme = useTheme()

  const StyledDatePicker = styled(DatePicker)`
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
    filter: { categories, startDate, endDate },
    filter,
    actions: { getExperiences, setCategoryFilter },
  } = useExperiences()

  // const [categories, setCategories] = useState(filter?.categories ?? [])
  // const [startDate, setStartDate] = useState(filter.fromDate)
  // const [endDate, setEndDate] = useState(filter.toDate)

  // function handleStartDate(date) {
  //   console.log('HANDLE START', date, new Date(date))
  //   setStartDate(new Date(date))
  // }
  // function handleEndDate(date) {
  //   console.log('HANDLE END', date, new Date(date))

  //   setEndDate(new Date(date))
  // }

  // console.log('both dates', { startDate, endDate })

  console.log({
    categories: filter.categories,
    start: filter.startDate,
    end: filter.endDate,
  })
  const mountedRef = useRef()

  useEffect(() => {
    if (firstLoadCompleted && mountedRef.current) {
      console.log('FILTERING EFFECT')
      function handleGetExperiences() {
        getExperiences(true)
      }

      const throttledGetExperiences = throttle(handleGetExperiences, 100000, {
        trailing: false,
      })
      throttledGetExperiences()
    }
  }, [categories])

  useEffect(() => {
    mountedRef.current = true
  }, [])

  return (
    <Wrapper>
      <Categories
        useToFilter={true}
        activeCategories={categories}
        setActiveCategories={setCategoryFilter}
      />

      {/* <StyledDatePicker
        selectsStart
        selected={startDate}
        endDate={endDate}
        onChange={handleStartDate}
        maxDate={new Date()}
      />

      <StyledDatePicker
        selectsEnd
        selected={endDate}
        startDate={startDate}
        endDate={endDate}
        onChange={handleEndDate}
        minDate={startDate}
        maxDate={new Date()}
      /> */}
    </Wrapper>
  )
}

export default FilterPosts
