import React, { useEffect, useState } from 'react'
import throttle from 'lodash.throttle'
import styled from '@emotion/styled'

import { useExperiences } from '@hooks/useExperiences'

import Categories from '@components/Categories/Categories'

const Wrapper = styled.div`
  margin-bottom: 20px;
`
const FilterPosts = () => {
  //   const theme = useTheme()

  const [categories, setCategories] = useState([])

  const {
    firstLoadCompleted,
    actions: { getExperiences },
  } = useExperiences()

  useEffect(() => {
    if (firstLoadCompleted) {
      function handleGetExperiences() {
        getExperiences(categories, null, null, true)
      }

      const throttledGetExperiences = throttle(handleGetExperiences, 100000, {
        trailing: false,
      })
      throttledGetExperiences()
    }
  }, [categories])

  return (
    <Wrapper>
      <Categories
        useToFilter={true}
        activeCategories={categories}
        setActiveCategories={setCategories}
      />
    </Wrapper>
  )
}

export default FilterPosts
