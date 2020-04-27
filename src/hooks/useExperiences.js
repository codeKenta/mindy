import React, { useContext, useReducer } from 'react'
import { useSession } from '../Firebase/Auth/Auth'
import db from '../Firebase/db'
const ExperiencesContext = React.createContext(null)

const statusMessages = {}

const actionTypes = {
  fetchStart: 'FETCH_START',
  errorOccured: 'ERROR_OCCURED',
  addExperience: 'ADD_EXPERIENCE',
  updateExperience: 'UPDATE_EXPERIENCE',
  getExperiences: 'GET_EXPERIENCES',
  getExperience: 'GET_EXPERIENCE',
}

const statusNames = {
  error: 'error',
  fetching: 'fetching',
  getExperiencesSuccess: 'load-experiences-success',
  addExperienceSuccess: 'add-experiences-success',
  getExperienceSuccess: 'get-experience-success',
  updateExperienceSuccess: 'update-experience-success',
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

  const addExperience = async experience => {
    fetchStart('Saving your story')
    const newExperience = { ...experience, uid: user.uid }
    try {
      const savedExperience = await db.addExperience(newExperience)

      localStorage.removeItem(user.uid)

      dispatch({
        type: actionTypes.addExperience,
        payload: { ...savedExperience },
      })
    } catch (error) {
      errorOccured('The story could not be saved')
      console.log('error add exp', error)
      throw Error(error)
    }
  }

  const getExperience = async docId => {
    fetchStart()
    try {
      const experience = await db.getExperience(docId)
      fetchEnd(statusNames.getExperienceSuccess)

      return experience
    } catch (error) {
      errorOccured('The experience could not be fetched')
      console.log('error get experience', error)
      throw Error(error)
    }
  }

  const updateExperience = async (docId, data) => {
    fetchStart('Saving your story')
    try {
      const updatedExperience = await db.updateExperience(docId, data)

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

  return {
    experiences: state.experiences,
    status: state.status,
    statusMessage: state.statusMessage,
    statusNames,
    actions: {
      addExperience,
      getExperience,
      updateExperience,
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
        status: statusNames.fetch,
        statusMessage: statusMessage,
      }
    }

    // dispatch({ type: actionTypes.fetchEnd, statusMessage: message })

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

    default: {
      console.error(`Received invalid todo action type: ${type}`)
    }
  }
}
