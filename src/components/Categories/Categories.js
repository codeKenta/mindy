import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import styles from '@styling'
import { useTheme } from 'emotion-theming'
import { useCategories } from '@hooks/useCategories'
import Chip from '@components/Chip/Chip'
import MuiChip from '@material-ui/core/Chip'

const getStyles = theme => {
  const CategoriesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: ${theme.fieldBackground};
    padding: ${styles.space.s};
  `
  const ChipWrapper = styled.div`
    margin: 5px;
  `
  return { CategoriesContainer, ChipWrapper }
}

const Categories = ({ activeCategories, setActiveCategories, useToFilter }) => {
  const theme = useTheme()
  const { availableCategories } = useCategories()
  const { CategoriesContainer, ChipWrapper } = getStyles(theme)

  function clearCategories() {
    setActiveCategories([])
  }

  return (
    <CategoriesContainer>
      {useToFilter && Array.isArray(availableCategories) && (
        <ChipWrapper>
          <MuiChip
            variant={activeCategories.length === 0 ? 'default' : 'outlined'}
            size="medium"
            label={'All'}
            onClick={clearCategories}
            color="primary"
          />
        </ChipWrapper>
      )}
      {Array.isArray(availableCategories) &&
        availableCategories.map(({ value, docId }) => (
          <ChipWrapper key={docId}>
            <Chip
              setState={setActiveCategories}
              name={value}
              id={docId}
              isActive={activeCategories.includes(docId)}
            />
          </ChipWrapper>
        ))}
    </CategoriesContainer>
  )
}

export default Categories

Categories.defaultProps = {
  useToFilter: false,
}

Categories.propTypes = {
  activeCategories: PropTypes.array.isRequired,
  setActiveCategories: PropTypes.func.isRequired,
  useToFilter: PropTypes.bool,
}
