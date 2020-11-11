import React, { useState } from 'react'
import styled from '@emotion/styled'
import styles from '../../../Styles'
import { useTheme } from 'emotion-theming'
import EditIcon from '@components/Icons/edit'
import CrossIcon from '@components/Icons/cross'

import PropTypes from 'prop-types'
import { useCategories } from '@hooks/useCategories'

const EditCategories = () => {
  const theme = useTheme()
  const [showEdit, setShowEdit] = useState(false)

  const toggleEdit = () => {
    setShowEdit(!showEdit)
  }

  const mockCategories = ['Dream', 'Big Dream', 'Day Dream']
  const { availableCategories } = useCategories()

  const EditCategoriesContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    background: ${theme.fieldBackground};
    padding: ${styles.space.s};
    .divider {
      width: 90%;
      height: 1px;
      background: ${theme.primary};
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      h4 {
        margin-right: 10px;
      }
    }
    .icon-wrapper {
      font-size: 20px;
      &.open {
      }
      &.close {
        color: ${theme.error};
      }
    }
  `

  return (
    <EditCategoriesContainer>
      <div className="divider" />
      <div className="header">
        <h4> {showEdit ? 'Close edit categories' : 'Edit categories'} </h4>{' '}
        <div
          className={`icon-wrapper ${showEdit ? 'close' : 'open'}`}
          onClick={toggleEdit}
        >
          {showEdit ? <CrossIcon /> : <EditIcon />}
        </div>
        <div>
          <div>
            Dream Big{' '}
            <div>
              <EditIcon />
            </div>
          </div>
        </div>
      </div>
    </EditCategoriesContainer>
  )
}

export default EditCategories
