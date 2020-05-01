import React, { useContext, useReducer } from 'react'
import { useSession } from '../Firebase/Auth/Auth'
import useStorage from '../Firebase/storage'

import db from '../Firebase/db'
import { navigate } from 'gatsby'
const ExperiencesContext = React.createContext(null)

// const statusMessages = {}

const actionTypes = {
  fetchStart: 'FETCH_START',
  errorOccured: 'ERROR_OCCURED',
  addExperience: 'ADD_EXPERIENCE',
  updateExperience: 'UPDATE_EXPERIENCE',
  getExperiences: 'GET_EXPERIENCES',
  getExperience: 'GET_EXPERIENCE',
  deleteExperience: 'DELETE_EXPERIENCE',
}

const statusNames = {
  error: 'error',
  fetching: 'fetching',
  getExperiencesSuccess: 'load-experiences-success',
  addExperienceSuccess: 'add-experiences-success',
  getExperienceSuccess: 'get-experience-success',
  updateExperienceSuccess: 'update-experience-success',
  deleteExperienceSuccess: 'delete-exprience-success',
}

export const ExperiencesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(experiencesReducer, {
    experiences: [],
    status: null,
    statusMessage: null,
  })

  const user = useSession()

  React.useEffect(() => {
    const getExperiences = async () => {
      dispatch({
        type: actionTypes.fetchStart,
        statusMessage: 'Loading stories',
      })
      try {
        const experiences = await db.getExperiences(user.uid)

        dispatch({
          type: actionTypes.getExperiences,
          payload: { experiences },
        })
      } catch (error) {
        dispatch({
          type: actionTypes.errorOccured,
          payload: {
            message: 'Failed to load the stories',
          },
        })
        console.log('error add exp', error)
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
      // navigate('/')
      console.log('error get experience', error)
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
      console.log('error add exp', error)
      throw Error(error)
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

  // TODO:! Save new and edited stories to state correct so we dont need to fetch new data to se updates

  const deleteExperience = async docId => {
    fetchStart('Deleting your story')

    try {
      const deletedExperience = await db.deleteExperience(docId)
      dispatch({
        type: actionTypes.deleteExperience,
        payload: { ...deletedExperience },
      })
      return deletedExperience
    } catch (error) {
      errorOccured('The experience could not be updated')
    }
  }

  return {
    experiences: state.experiences,
    status: state.status,
    statusMessage: state.statusMessage,
    statusNames,
    isLoading: state.status === statusNames.fetching,
    actions: {
      addExperience,
      getExperience,
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

    /*
    Maybe have error in separate obj
    */
    case actionTypes.errorOccured: {
      return {
        ...state,
        status: statusNames.error,
        statusMessage: payload.message,
      }
    }

    case actionTypes.getExperiences: {
      return {
        ...state,
        experiences: payload.experiences || [],
        status: statusNames.getExperiencesSuccess,
        statusMessage: null,
      }
    }

    case actionTypes.addExperience: {
      let experiences = [...state.experiences]
      experiences.push({
        ...payload,
      })

      return {
        ...state,
        status: statusNames.addExperienceSuccess,
        statusMessage: 'Your story has been saved',
        experiences,
      }
    }

    case actionTypes.updateExperience: {
      // let experiences = [...state.experiences]
      // experiences.push({
      //   ...payload,
      // })

      // UPDATE RESULT IN ARRAY

      return {
        ...state,
        status: statusNames.updateExperienceSuccess,
        statusMessage: 'Your story has been updated',
        // experiences,
      }
    }

    case actionTypes.deleteExperience: {
      // TODO
      // REMOVE EXP FROM STATE EXP ARRAY

      return {
        ...state,
        status: statusNames.deleteExperienceSuccess,
        statusMessage: 'Your story has been deleted',
      }
    }

    default: {
      console.error(`Received invalid todo action type: ${type}`)
    }
  }
}
