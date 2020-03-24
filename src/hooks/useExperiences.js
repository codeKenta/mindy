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
    const loadExperiences = async () => {
      dispatch({ type: actionTypes.pendingStart, status: statusNames.pending })
      // try {
      /* TODO: FETCH DOCUMENT WITH FIREBASE */

      const loadedExperiences = []
      dispatch({
        type: actionTypes.loadExperiences,
        payload: { loadedExperiences },
      })
      // } catch (error) {
      //   dispatch({
      //     type: actionTypes.errorOccured,
      //     payload: {
      //       message: 'Failed to load the storys',
      //     },
      //   })
      //   console.log('error add exp', error)
      // }
    }
    if (user) {
      loadExperiences()
    }
  }, [user])

  return (
    <ExperiencesContext.Provider value={[state, dispatch]}>
      {children}
    </ExperiencesContext.Provider>
  )
}

const actionTypes = {
  pendingStart: 'pendingStart',
  errorOccured: 'errorOccured',
  addExperience: 'addExperience',
  loadExperiences: 'loadExperiences',
}

const statusNames = {
  error: 'error',
  pending: 'pending',
  loadExperiencesSuccess: 'load-experiences-success',
  addExperienceSuccess: 'add-experiences-success',
}

export const useExperiences = () => {
  const [state, dispatch] = useContext(ExperiencesContext)
  const user = useSession()

  const pendingStart = () => {
    dispatch({ type: actionTypes.pendingStart, status: statusNames.pending })
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
    pendingStart()
    const newExperience = { ...experience, uid: user.uid }
    try {
      const result = await db.addExperience(newExperience)
      dispatch({
        type: actionTypes.addExperience,
        payload: { ...experience },
        // payload: { ...experience, _id: result.insertedId },
      })
    } catch (error) {
      errorOccured('The story could not be saved')
      console.log('error add exp', error)
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
    },
  }
}

const experiencesReducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.pendingStart: {
      return {
        ...state,
        status: statusNames.pending,
      }
    }

    case actionTypes.errorOccured: {
      return {
        ...state,
        status: statusNames.error,
        statusMessage: payload.message,
      }
    }

    case actionTypes.loadExperiences: {
      return {
        ...state,
        experiences: payload.loadedExperiences || [],
        status: statusNames.loadExperiencesSuccess,
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
