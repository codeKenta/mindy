import React, { useContext, useReducer } from 'react'
import { useSession } from '../Firebase/Auth/Auth'
import db from '../Firebase/db'
const ExperiencesContext = React.createContext(null)

export const ExperiencesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(experiencesReducer, {
    experiences: [],
    status: null,
    statusMessage: null,
  })

  const user = useSession()

  React.useEffect(() => {
    const getExperiences = async () => {
      dispatch({ type: actionTypes.fetchStart, status: statusNames.fetching })
      try {
        const experiences = await db.getExperiences(user.uid)

        console.log('INIT LOAD EXPERIENCES in useExperiences', experiences)
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

const actionTypes = {
  fetchStart: 'fetchStart',
  errorOccured: 'errorOccured',
  addExperience: 'addExperience',
  getExperiences: 'getExperiences',
  getExperience: 'getExperience',
}

const statusNames = {
  error: 'error',
  fetching: 'fetching',
  getExperiencesSuccess: 'load-experiences-success',
  addExperienceSuccess: 'add-experiences-success',
  getExperienceSuccess: 'get-experience-success',
}

export const useExperiences = () => {
  const [state, dispatch] = useContext(ExperiencesContext)
  const user = useSession()

  const fetchStart = () => {
    dispatch({ type: actionTypes.fetchStart, status: statusNames.fetching })
  }
  const fetchEnd = statusName => {
    dispatch({ type: actionTypes.fetchEnd, payload: { status: statusName } })
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
    fetchStart()
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

  return {
    experiences: state.experiences,
    status: state.status,
    statusMessage: state.statusMessage,
    statusNames,
    actions: {
      addExperience,
      getExperience,
    },
  }
}

const experiencesReducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.fetchStart: {
      return {
        ...state,
        status: statusNames.fetch,
      }
    }

    case actionTypes.fetchEnd: {
      return {
        ...state,
        status: payload.status,
      }
    }

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

    default: {
      console.error(`Received invalid todo action type: ${type}`)
    }
  }
}
