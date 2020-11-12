import React, { useState, useRef } from 'react'
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
  const EditList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
  `

  const mockCategories = [
    { id: 'a', name: 'Dream' },
    { id: 'b', name: 'Relaxed' },
    { id: 'c', name: 'Meditation' },
  ]

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
      <EditList>
        {mockCategories.length !== 0 &&
          mockCategories.map(({ name, id }) => (
            <EditCategoryItem key={id} id={id} categoryName={name} />
          ))}
        <EditCategoryItem />
      </EditList>
    </>
  )
}

export default EditCategories

const EditCategoryItem = ({ categoryName = '', id }) => {
  const theme = useTheme()

  const textInputRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    console.log(textInputRef.current.value)
  }

  const StyledItem = styled.li`
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
  const placeHolder = categoryName ? '' : 'Add category'

  return (
    <StyledItem>
      <input
        ref={textInputRef}
        defaultValue={categoryName}
        placeholder={placeHolder}
        type="text"
      />

      <div>
        <button onClick={handleSubmit}>save</button>
        <button onClick={handleSubmit}>delete</button>
      </div>
    </StyledItem>
  )
}
