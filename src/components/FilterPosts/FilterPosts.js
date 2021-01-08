import React, { useEffect, useState, useRef } from 'react'
import { useTheme } from 'emotion-theming'

import throttle from 'lodash.throttle'
import styled from '@emotion/styled'
import styles from '@styling'

import { useExperiences } from '@hooks/useExperiences'

import Categories from '@components/Categories/Categories'
import DatePicker from 'react-datepicker'

const getStyles = theme => {
  const StyledDatePicker = styled(DatePicker)`
    box-sizing: border-box;
    display: block;
    width: 100%;
    border: 1px solid ${theme.primary};
    border-radius: 10px;
    background: none;
    padding: ${styles.space.s};
    color: inherit;
  `

  const Label = styled.span`
    display: block;
    width: max-content;
    border-bottom: 2px solid ${theme.primary};
    margin-bottom: ${styles.space.s};
  `

  const Wrapper = styled.div`
    margin-bottom: 20px;
  `

  const Group = styled.div`
    &:first-of-type {
      margin-right: 20px;
    }
  `

  const DateWrapper = styled.div`
    display: flex;
    margin-bottom: 20px;
    justify-content: center;
  `

  return {
    StyledDatePicker,
    Wrapper,
    DateWrapper,
    Group,
    Label,
  }
}

const FilterPosts = () => {
  const theme = useTheme()
  const { StyledDatePicker, Wrapper, DateWrapper, Group, Label } = getStyles(
    theme
  )

  const {
    firstLoadCompleted,
    filter: { categories, startDate, endDate },
    actions: {
      getExperiences,
      setCategoryFilter,
      setStartDateFilter,
      setEndDateFilter,
    },
  } = useExperiences()

  function handleStartDate(date) {
    setStartDateFilter(date)
  }
  function handleEndDate(date) {
    setEndDateFilter(date)
  }

  const mountedRef = useRef()

  useEffect(() => {
    if (firstLoadCompleted && mountedRef.current) {
      function handleGetExperiences() {
        getExperiences(true)
      }

      const throttledGetExperiences = throttle(handleGetExperiences, 100000, {
        trailing: false,
      })
      throttledGetExperiences()
    }
  }, [categories, startDate, endDate])

  useEffect(() => {
    mountedRef.current = true
  }, [])

  return (
    <Wrapper>
      <DateWrapper>
        <Group>
          <Label>From</Label>
          <StyledDatePicker
            selectsStart
            selected={startDate}
            endDate={endDate}
            onChange={handleStartDate}
            maxDate={new Date()}
          />
        </Group>

        <Group>
          <Label>To</Label>

          <StyledDatePicker
            selectsEnd
            selected={endDate}
            startDate={startDate}
            endDate={endDate}
            onChange={handleEndDate}
            minDate={startDate}
            maxDate={new Date()}
          />
        </Group>
      </DateWrapper>
      <Categories
        useToFilter={true}
        activeCategories={categories}
        setActiveCategories={setCategoryFilter}
      />
    </Wrapper>
  )
}

export default FilterPosts
