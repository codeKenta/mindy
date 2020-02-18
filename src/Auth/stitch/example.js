import React from 'react'
import { experiences } from '../stitch'

const actionTypes = {
  loadingStart: 'loadingStart',
  addExperience: 'addExperience',
}

export function useExperiences(userId) {
  const [state, dispatch] = React.useReducer(experiencesReducer, {
    experiences: [],
  })

  const addExperience = async experience => {
    const newExperience = { experience, owner_id: userId }

    dispatch({ type: actionTypes.loadingStart })
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

    case actionTypes.addExperience: {
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
