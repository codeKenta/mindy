import React, { useContext, useReducer } from 'react'
import { useSession } from '../Firebase/Auth/Auth'
import useStorage from '../Firebase/storage'

import db from '../Firebase/db'

const CategoriesContext = React.createContext(null)

const actionTypes = {
  fetchStart: 'FETCH_START',
  errorOccured: 'ERROR_OCCURED',
  addCategory: 'ADD_CATEGORY',
  updateCategory: 'UPDATE_CATEGORY',
  getCategories: 'GET_EXPERIENCES',
  deleteExperience: 'DELETE_EXPERIENCE',
}

const statusNames = {
  error: 'error',
  fetching: 'fetching',
  getCategoriesSuccess: 'load-category-success',
  addCategorySuccess: 'add-category-success',
  updateCategorySuccess: 'update-category-success',
  deleteCategorySuccess: 'delete-category-success',
}

export const CategoriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoriesReducer, {
    categories: [],
    status: null,
    statusMessage: null,
  })

  const user = useSession()

  React.useEffect(() => {
    // TODO: Move actions out of scope so it can be reused
    const getCategories = async () => {
      dispatch({
        type: actionTypes.fetchStart,
        statusMessage: 'Loading Categories',
      })
      try {
        const { categories } = await db.getCategories(user.uid)

        dispatch({
          type: actionTypes.getCategories,
          payload: {
            categories: categories,
          },
        })
      } catch (error) {
        dispatch({
          type: actionTypes.errorOccured,
          payload: {
            message: 'Failed to load the categories',
          },
        })
      }
    }

    if (user) {
      getExperiences()
    }
  }, [user])

  return (
    <CategoriesContext.Provider value={[state, dispatch]}>
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategories = () => {
  const [state, dispatch] = useContext(CategoriesContext)
  const user = useSession()

  const fetchStart = (statusMessage = '') => {
    dispatch({ type: actionTypes.fetchStart, statusMessage })
  }
  const fetchEnd = (status, statusMessage = '') => {
    dispatch({ type: actionTypes.fetchEnd, status, statusMessage })
  }

  const errorOccured = errorMsg => {
    dispatch({
      type: actionTypes.errorOccured,
      payload: {
        message: errorMsg,
      },
    })
  }

  const getCategories = async () => {
    dispatch({
      type: actionTypes.fetchStart,
      statusMessage: 'Loading Categories',
    })

    try {
      const { categories } = await db.getExperiences(user.uid)

      dispatch({
        type: actionTypes.getCategories,
        payload: {
          categories,
        },
      })
    } catch (error) {
      dispatch({
        type: actionTypes.errorOccured,
        payload: {
          message: 'Failed to load the Categories',
        },
      })
    }
  }

  const addCategory = async category => {
    fetchStart('Saving your category')
    let categoryData = { ...category, uid: user.uid }

    try {
      const savedCategory = await db.addCategory(categoryData)

      dispatch({
        type: actionTypes.addCategory,
        payload: { ...savedExperience },
      })

      return savedExperience
    } catch (error) {
      errorOccured('The category could not be saved')
    }
  }

  const updateCategory = async (docId, category) => {
    fetchStart('Saving your story')

    let categoryData = { ...category }

    try {
      const updatedCategory = await db.updateCategory(docId, categoryData)

      dispatch({
        type: actionTypes.updateCategory,
        payload: { ...categoryData, docId },
      })
      return updatedCategory
    } catch (error) {
      errorOccured('The category could not be updated')
    }
  }

  const deleteCategory = async docId => {
    fetchStart('Deleting your category')

    try {
      const deletedCategory = await db.deleteCategory(docId)
      dispatch({
        type: actionTypes.deleteCategory,
        payload: { docId },
      })
      return deletedCategory
    } catch (error) {
      errorOccured('The category could not be updated')
    }
  }

  return {
    categories: state.categories,
    shownExperiences: state.shownExperiences,
    status: state.status,
    statusMessage: state.statusMessage,
    statusNames,
    isLoading: state.status === statusNames.fetching,
    firstLoadCompleted: state.firstLoadCompleted,
    actions: {
      addCategory,
      getCategories,
      updateCategory,
      deleteCategory,
    },
  }
}

const categoryReducer = (
  state,
  { type, status, statusMessage = '', payload }
) => {
  switch (type) {
    case actionTypes.fetchStart: {
      return {
        ...state,
        status: statusNames.fetching,
        statusMessage: statusMessage,
      }
    }

    case actionTypes.fetchEnd: {
      return {
        ...state,
        status: status,
        statusMessage: statusMessage,
      }
    }

    case actionTypes.errorOccured: {
      return {
        ...state,
        status: statusNames.error,
        statusMessage: payload.message,
      }
    }

    case actionTypes.getCategories: {
      return {
        ...state,
        categories: [...payload.categories],
        status: statusNames.getExperiencesSuccess,
        statusMessage: null,
      }
    }

    case actionTypes.addCategory: {
      let categories = [...state.categories]

      // TODO: "CHECK THIS PAYLOAD"
      stateCategories.push({
        ...payload,
      })

      return {
        ...state,
        status: statusNames.addCategorySuccess,
        statusMessage: 'Your category has been saved',
        categories,
      }
    }

    case actionTypes.updateCategory: {
      let categories = [...state.categories]

      const foundIndex = categories.findIndex(x => x.docId === payload.docId)
      categories[foundIndex] = { ...payload }

      return {
        ...state,
        status: statusNames.updateCategorySuccess,
        statusMessage: 'Your category has been updated',
        shownExperiences,
      }
    }

    case actionTypes.deleteCategory: {
      let categories = [...state.categories]

      const updatedCategories = categories.filter(
        category => category.docId !== payload.docId
      )

      return {
        ...state,
        status: statusNames.deleteExperienceSuccess,
        statusMessage: 'Your category has been deleted',
        categories: updatedCategories,
      }
    }

    default: {
      console.error(`Received invalid action type: ${type}`)
    }
  }
}

/*



*/
