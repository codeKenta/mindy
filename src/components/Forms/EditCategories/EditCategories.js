import React, { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import styles from '@styling'
import { useTheme } from 'emotion-theming'
import EditIcon from '@components/Icons/edit'
import CrossIcon from '@components/Icons/cross'
import EditCategoryItem from './EditCategoryItem'
import { useCategories } from '@hooks/useCategories'
import { IconWrapper } from './getEditCategoriesStyles'

const EditCategories = () => {
  const theme = useTheme()
  const [showEdit, setShowEdit] = useState(false)

  const toggleEdit = () => {
    setShowEdit(!showEdit)
  }

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
      padding-top: ${styles.space.m};
      padding-bottom: ${styles.space.s};
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
  const EditList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
  `

  return (
    <>
      <EditCategoriesContainer>
        <div className="divider" />
        <div className="header">
          <h4> {showEdit ? 'Close edit categories' : 'Edit categories'} </h4>{' '}
          <div
            className={`icon-wrapper ${showEdit ? 'close' : 'open'}`}
            onClick={toggleEdit}
          >
            {showEdit ? (
              <IconWrapper color={theme.error}>
                <CrossIcon />
              </IconWrapper>
            ) : (
              <IconWrapper color={theme.success}>
                <EditIcon />
              </IconWrapper>
            )}
          </div>
        </div>
      </EditCategoriesContainer>

      {showEdit && (
        <EditList>
          {Array.isArray(availableCategories) &&
            availableCategories.length !== 0 &&
            availableCategories.map(({ uid, value }) => (
              <>
                {uid && value ? (
                  <EditCategoryItem key={uid} id={uid} categoryName={value} />
                ) : null}
              </>
            ))}
          <EditCategoryItem />
        </EditList>
      )}
    </>
  )
}

export default EditCategories
