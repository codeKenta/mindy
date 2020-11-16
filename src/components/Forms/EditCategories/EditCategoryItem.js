import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ActionButtons from './ActionButtons'

import styled from '@emotion/styled'
import styles from '@styling'

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: ${styles.space.m};
  background: #101e40;

  input {
    display: block;
    background: transparent;
    color: white;
    border: none;
    font-weight: bold;
  }
`
const EditCategoryItem = ({ categoryName, id }) => {
  const [inputValue, setInputValue] = useState(categoryName)

  function handleChange(e) {
    setInputValue(e.target.value)
  }

  function undoChanges() {
    setInputValue(categoryName)
  }

  const placeHolder = categoryName ? '' : 'Add category'

  return (
    <Item>
      <input
        value={inputValue}
        onChange={handleChange}
        placeholder={placeHolder}
        type="text"
      />

      <ActionButtons
        newCategoryName={inputValue}
        currentCategoryName={categoryName}
        categoryId={id}
        undoChanges={undoChanges}
      />
    </Item>
  )
}

EditCategoryItem.defaultProps = {
  id: '',
  categoryName: '',
}

EditCategoryItem.propTypes = {
  categoryName: PropTypes.string,
  id: PropTypes.string,
}

export default EditCategoryItem
