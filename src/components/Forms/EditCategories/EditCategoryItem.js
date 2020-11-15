import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styled from '@emotion/styled'
import styles from '@styles'
import { useTheme } from 'emotion-theming'
import CrossIcon from '@components/Icons/cross'
import CheckIcon from '@components/Icons/check2'
import TrashIcon from '@components/Icons/trash'
import { ActionButtonsWrapper, IconWrapper } from './getEditCategoriesStyles'

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
    console.log('HELLO UNDO ')
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

const ActionButtons = ({
  newCategoryName,
  currentCategoryName,
  categoryId,
  undoChanges,
}) => {
  const theme = useTheme()

  function save(e) {
    e.preventDefault()
    console.log('SAVE', currentCategoryName)
  }

  function remove(e) {
    e.preventDefault()
    console.log('REMOVE', currentCategoryName)
  }

  const HAS_CHANGED =
    Boolean(newCategoryName) && newCategoryName !== currentCategoryName

  const SHOW_REMOVE =
    Boolean(currentCategoryName) &&
    Boolean(newCategoryName) &&
    newCategoryName === currentCategoryName

  return (
    <ActionButtonsWrapper>
      {HAS_CHANGED && (
        <>
          <IconWrapper color={theme.success} onClick={save}>
            <CheckIcon />
          </IconWrapper>
          <IconWrapper color={theme.error} onClick={undoChanges}>
            <CrossIcon />
          </IconWrapper>
        </>
      )}
      {SHOW_REMOVE && (
        <IconWrapper color={theme.error} onClick={remove}>
          <TrashIcon />
        </IconWrapper>
      )}
    </ActionButtonsWrapper>
  )
}

export default EditCategoryItem

ActionButtons.defaultProps = {
  id: '',
  currentCategoryName: '',
  newCategoryName: '',
}

ActionButtons.propTypes = {
  newCategoryName: PropTypes.string,
  currentCategoryName: PropTypes.string,
  id: PropTypes.string,
  undoChanges: PropTypes.func.isRequired,
}
