import React from 'react'
import { experiences } from '../Auth/stitch'

const actionTypes = {
  pendingStart: 'pendingStart',
  errorOccured: 'errorOccured',
  addExperience: 'addExperience',
  loadExperiences: 'loadExperiences',
}

const statusNames = {
  error: 'error',
  pending: 'pending',
  success: 'success',
}

export function useExperiences(userId) {
  const [state, dispatch] = React.useReducer(experiencesReducer, {
    experiences: [],
  })

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

  const loadExperiences = async () => {
    pendingStart()
    try {
      const loadedExperiences = await experiences
        .find({}, { limit: 1000 })
        .toArray()

      dispatch({
        type: actionTypes.loadExperiences,
        payload: { loadedExperiences },
      })
    } catch (error) {
      errorOccured('Failed to load the storys')
      console.log('error add exp', error)
    }
  }

  const addExperience = async experience => {
    pendingStart()
    const newExperience = { ...experience, owner_id: userId }
    try {
      const result = await experiences.insertOne(newExperience)
      dispatch({
        type: actionTypes.addExperience,
        payload: { ...experience, _id: result.insertedId },
      })
    } catch (error) {
      errorOccured('The story could not be saved')
      console.log('error add exp', error)
      throw Error(error)
    }
  }

  React.useEffect(() => {
    loadExperiences()
  }, [])
  return {
    experiences: state.experience,
    status: null,
    statusMessage: null,
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
        status: statusNames.success,
      }
    }

    case actionTypes.addExperience: {
      const updatedExperiences = [...state.experiences].push({
        ...payload,
      })

      return {
        ...state,
        status: statusNames.success,
        statusMessage: 'Your story has been saved',
        experiences: updatedExperiences,
      }
    }

    default: {
      console.error(`Received invalid todo action type: ${type}`)
    }
  }
}
