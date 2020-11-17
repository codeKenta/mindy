import React from 'react'
import PropTypes from 'prop-types'

import { useTheme } from 'emotion-theming'
import { useCategories } from '@hooks/useCategories'
import CrossIcon from '@components/Icons/cross'
import CheckIcon from '@components/Icons/check2'
import TrashIcon from '@components/Icons/trash'
import { ActionButtonsWrapper, IconWrapper } from './getEditCategoriesStyles'

const ActionButtons = ({
  newCategoryName,
  currentCategoryName,
  categoryId,
  undoChanges,
}) => {
  const {
    actions: { addCategory, updateCategory },
  } = useCategories()

  const theme = useTheme()

  const HAS_CHANGED =
    Boolean(newCategoryName) && newCategoryName !== currentCategoryName

  const SHOW_REMOVE =
    Boolean(currentCategoryName) &&
    Boolean(newCategoryName) &&
    newCategoryName === currentCategoryName

  async function edit(e) {
    e.preventDefault()
    if (newCategoryName && typeof newCategoryName === 'string' && HAS_CHANGED) {
      await updateCategory(categoryId, newCategoryName)
    }
  }

  async function add(e) {
    e.preventDefault()
    if (newCategoryName) {
      await addCategory(newCategoryName)
    }
  }

  function remove(e) {
    e.preventDefault()
  }

  return (
    <ActionButtonsWrapper>
      {HAS_CHANGED && (
        <>
          <IconWrapper color={theme.success} onClick={categoryId ? edit : add}>
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

export default ActionButtons

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
