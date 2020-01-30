import React from 'react'
import { experiences } from '../Auth/stitch'

const actionTypes = {
  loadingStart: 'loadingStart',
  addExperience: 'addExperience',
  loadExperiences: 'loadExperiences',
}

export function useExperiences(userId) {
  const [state, dispatch] = React.useReducer(experiencesReducer, {
    experiences: [],
  })

  const loadExperiences = async () => {
    const loadedExperiences = await experiences
      .find({}, { limit: 1000 })
      .asArray()
    dispatch({
      type: actionTypes.loadExperiences,
      payload: { loadedExperiences },
    })
  }

  const addExperience = async experience => {
    console.log('ADD EXPERIENCE ACTION START', experience)

    const newExperience = { experience, owner_id: userId }
    // dispatch({ type: actionTypes.loadingStart })
    const result = await experiences.insertOne(newExperience)

    dispatch({
      type: actionTypes.addExperience,
      payload: { ...newExperience, _id: result.insertedId },
    })
  }

  React.useEffect(() => {
    loadExperiences()
  }, [])
  return {
    experience: state.experience,
    loading: false,
    actions: {
      addExperience,
    },
  }
}

const experiencesReducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.loadingStart: {
      return {
        ...state,
        loading: true,
      }
    }

    case actionTypes.loadExperiences: {
      console.log('REDCER:LOADING EXPERIENCE:')

      return {
        ...state,
        experiences: payload.loadedExperiences || [],
      }
    }

    case actionTypes.addExperience: {
      console.log('REDCER: ADD EXPERIENCE:+')

      const newExperience = {
        ...payload,
      }
      return {
        ...state,
        loading: false,
        experience: [...state.experience, newExperience],
      }
    }

    default: {
      console.error(`Received invalid todo action type: ${type}`)
    }
  }
}
