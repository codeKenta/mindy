import React, { useState } from 'react'
// import styled from '@emotion/styled'
// import styles from '@styling'
// import { useTheme } from 'emotion-theming'

import Categories from '@components/Categories/Categories'

// const getStyles = theme => {
//   const CategoriesContainer = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     background: ${theme.fieldBackground};
//     padding: ${styles.space.s};
//   `
//   const ChipWrapper = styled.div`
//     margin: 5px;
//   `
//   return { CategoriesContainer, ChipWrapper }
// }

const FilterPosts = () => {
  //   const theme = useTheme()
  const [categories, setCategories] = useState([])

  return (
    <div>
      <Categories
        useToFilter={true}
        activeCategories={categories}
        setActiveCategories={setCategories}
      />
    </div>
  )
}

export default FilterPosts
