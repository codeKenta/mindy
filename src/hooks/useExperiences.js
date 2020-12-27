import React, { useContext, useReducer } from 'react'
import { useSession } from '../Firebase/Auth/Auth'
import useStorage from '../Firebase/storage'

import db from '../Firebase/db'

const SHOW_CHUNK_SIZE = 5
const ExperiencesContext = React.createContext(null)

const actionTypes = {
  fetchStart: 'FETCH_START',
  errorOccured: 'ERROR_OCCURED',
  addExperience: 'ADD_EXPERIENCE',
  updateExperience: 'UPDATE_EXPERIENCE',
  getExperiences: 'GET_EXPERIENCES',
  getExperience: 'GET_EXPERIENCE',
  deleteExperience: 'DELETE_EXPERIENCE',
  showMoreLoadedExperiences: 'SHOW_MORE_LOADED_EXPERIENCES',
  clearExpereinces: 'CLEAR_EXPERIENCES',
}

const statusNames = {
  error: 'error',
  fetching: 'fetching',
  getExperiencesSuccess: 'load-experiences-success',
  clearedExperiences: 'cleared-experiences',
  addExperienceSuccess: 'add-experiences-success',
  getExperienceSuccess: 'get-experience-success',
  updateExperienceSuccess: 'update-experience-success',
  deleteExperienceSuccess: 'delete-exprience-success',
}

const noneFilter = {
  categories: [],
  fromDate: null,
  toDate: null,
}

export const ExperiencesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(experiencesReducer, {
    loadedExperiences: [],
    shownExperiences: [],
    firstLoadCompleted: false,
    nextQuery: null,
    isOutOfQueries: false,
    status: null,
    statusMessage: null,
    filter: {
      ...noneFilter,
    },
  })

  const user = useSession()

  React.useEffect(() => {
    // TODO: Move actions out of scope so it can be reused
    const getExperiences = async () => {
      dispatch({
        type: actionTypes.fetchStart,
        statusMessage: 'Loading stories',
      })
      try {
        const {
          experiences,
          nextQuery,
          isOutOfQueries,
        } = await db.getExperiences(user.uid)

        let loadedExperiences = [...experiences]
        let shownExperiences = loadedExperiences.splice(0, SHOW_CHUNK_SIZE)

        dispatch({
          type: actionTypes.getExperiences,
          payload: {
            loadedExperiences,
            shownExperiences,
            nextQuery,
            isOutOfQueries,
          },
        })
      } catch (error) {
        dispatch({
          type: actionTypes.errorOccured,
          payload: {
            message: 'Failed to load the stories',
          },
        })
      }
    }

    if (user) {
      getExperiences()
    }
  }, [user])

  return (
    <ExperiencesContext.Provider value={[state, dispatch]}>
      {children}
    </ExperiencesContext.Provider>
  )
}

export const useExperiences = () => {
  const [state, dispatch] = useContext(ExperiencesContext)
  const user = useSession()

  const [
    {
      // isLoading: uploadIsLoading,
      isError: uploadError,
      // progress: uploadProgress,
    },
    uploadFiles,
  ] = useStorage()

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

  const getExperience = async docId => {
    fetchStart()

    try {
      const experience = await db.getExperience(docId)
      fetchEnd(statusNames.getExperienceSuccess)

      return experience
    } catch (error) {
      errorOccured('The experience could not be fetched')
    }
  }

  const getExperiences = async (
    categories = [],
    fromDate = null,
    toDate = null,
    clearBefore = false
  ) => {
    if (clearBefore || state.loadedExperiences.length === 0) {
      if (!clearBefore && state.isOutOfQueries) {
        return
      }
      dispatch({
        type: actionTypes.fetchStart,
        statusMessage: 'Loading stories',
      })

      const filter = {
        categories: clearBefore ? categories : state.filter.categories,
        fromDate: clearBefore ? fromDate : state.filter.fromDate,
        toDate: clearBefore ? toDate : state.filter.fromDate,
      }

      try {
        const {
          experiences,
          nextQuery,
          isOutOfQueries,
        } = await db.getExperiences(
          user.uid,
          filter.categories,
          filter.fromDate,
          filter.fromDate,
          clearBefore ? null : state.nextQuery
        )

        let loadedExperiences = [...experiences]
        let shownExperiences = loadedExperiences.splice(0, SHOW_CHUNK_SIZE)

        dispatch({
          type: actionTypes.getExperiences,
          payload: {
            loadedExperiences,
            shownExperiences,
            nextQuery,
            isOutOfQueries,
            clearBefore,
            filter,
          },
        })
      } catch (error) {
        dispatch({
          type: actionTypes.errorOccured,
          payload: {
            message: 'Failed to load the stories',
          },
        })
      }
    } else {
      dispatch({
        type: actionTypes.showMoreLoadedExperiences,
      })
    }
  }

  const addExperience = async experience => {
    fetchStart('Saving your story')
    let experienceData = { ...experience, uid: user.uid }

    try {
      if (experienceData.images.length > 0) {
        fetchStart('Uploading files')
        const storedImagesUrls = await uploadFiles(experienceData.images)
        if (!uploadError && storedImagesUrls.length > 0) {
          experienceData = { ...experienceData, images: storedImagesUrls }
        }
      }

      const savedExperience = await db.addExperience(experienceData)

      dispatch({
        type: actionTypes.addExperience,
        payload: { ...savedExperience },
      })

      return savedExperience
    } catch (error) {
      errorOccured('The story could not be saved')
    }
  }

  const updateExperience = async (docId, data) => {
    fetchStart('Saving your story')

    let experienceData = { ...data }

    try {
      if (experienceData.images.length > 0) {
        fetchStart('Uploading files')
        const storedImagesUrls = await uploadFiles(experienceData.images)
        if (!uploadError && storedImagesUrls.length > 0) {
          experienceData = { ...experienceData, images: storedImagesUrls }
        }
      }

      const updatedExperience = await db.updateExperience(docId, experienceData)

      dispatch({
        type: actionTypes.updateExperience,
        payload: { ...data, docId },
      })
      return updatedExperience
    } catch (error) {
      errorOccured('The experience could not be updated')
    }
  }

  const deleteExperience = async docId => {
    fetchStart('Deleting your story')

    try {
      const deletedExperience = await db.deleteExperience(docId)
      dispatch({
        type: actionTypes.deleteExperience,
        payload: { docId },
      })
      return deletedExperience
    } catch (error) {
      errorOccured('The experience could not be updated')
    }
  }

  return {
    experiences: state.experiences,
    shownExperiences: state.shownExperiences,
    status: state.status,
    statusMessage: state.statusMessage,
    statusNames,
    isLoading: state.status === statusNames.fetching,
    firstLoadCompleted: state.firstLoadCompleted,
    actions: {
      addExperience,
      getExperience,
      getExperiences,
      updateExperience,
      deleteExperience,
    },
  }
}

const experiencesReducer = (
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

    case actionTypes.clearExpereinces: {
      return {
        ...state,
        loadedExperiences: [],
        shownExperiences: [],
        nextQuery: null,
        isOutOfQueries: true,
        status: statusNames.clearedExperiences,
        statusMessage: null,
        firstLoadCompleted: false,
      }
    }

    case actionTypes.getExperiences: {
      const {
        clearBefore,
        loadedExperiences,
        shownExperiences,
        isOutOfQueries,
        nextQuery,
        filter,
      } = payload

      if (clearBefore) {
        return {
          ...state,
          loadedExperiences: loadedExperiences,
          shownExperiences: shownExperiences,
          nextQuery: nextQuery || null,
          isOutOfQueries: isOutOfQueries,
          status: statusNames.getExperiencesSuccess,
          statusMessage: null,
          firstLoadCompleted: true,
          filter: {
            ...filter,
          },
        }
      }

      let shownInState = [...state.shownExperiences]
      let loadedInState = [...state.loadedExperiences]

      const newLoaded = [...loadedExperiences] || []
      const experiencesToShow = [...shownExperiences] || []

      return {
        ...state,
        loadedExperiences: loadedInState.concat(newLoaded),
        shownExperiences: shownInState.concat(experiencesToShow),
        nextQuery: nextQuery || null,
        isOutOfQueries: isOutOfQueries,
        status: statusNames.getExperiencesSuccess,
        statusMessage: null,
        firstLoadCompleted: true,
        filter: {
          ...filter,
        },
      }
    }

    case actionTypes.showMoreLoadedExperiences: {
      const loaded = [...state.loadedExperiences]
      let shown = [...state.shownExperiences]

      shown = shown.concat(loaded.splice(0, SHOW_CHUNK_SIZE))

      return {
        ...state,
        shownExperiences: shown,
        loadedExperiences: loaded,
        status: statusNames.updateExperienceSuccess,
        statusMessage: 'Your story has been updated',
      }
    }

    case actionTypes.addExperience: {
      let shownExperiences = [...state.shownExperiences]

      shownExperiences.unshift({
        ...payload,
      })

      return {
        ...state,
        status: statusNames.addExperienceSuccess,
        statusMessage: 'Your story has been saved',
        shownExperiences,
      }
    }

    case actionTypes.updateExperience: {
      let shownExperiences = [...state.shownExperiences]

      const foundIndex = shownExperiences.findIndex(
        x => x.docId === payload.docId
      )
      shownExperiences[foundIndex] = { ...payload }

      return {
        ...state,
        status: statusNames.updateExperienceSuccess,
        statusMessage: 'Your story has been updated',
        shownExperiences,
      }
    }

    case actionTypes.deleteExperience: {
      let shownExperiences = [...state.shownExperiences]

      const updatedExperiences = shownExperiences.filter(
        exp => exp.docId !== payload.docId
      )

      return {
        ...state,
        status: statusNames.deleteExperienceSuccess,
        statusMessage: 'Your story has been deleted',
        shownExperiences: updatedExperiences,
      }
    }

    default: {
      console.error(`Received invalid action type: ${type}`)
    }
  }
}
