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
    try {
      const loadedExperiences = await experiences
        .find({}, { limit: 1000 })
        .asArray()

      dispatch({
        type: actionTypes.loadExperiences,
        payload: { loadedExperiences },
      })
    } catch (error) {
      console.log('error add exp', error)
    }
  }

  const addExperience = async experience => {
    console.log('ACTION, income', experience)
    const newExperience = { ...experience, owner_id: userId }
    console.log('ACTION NEW EXP', newExperience)

    const result = await experiences.insertOne(newExperience)

    dispatch({
      type: actionTypes.addExperience,
      payload: { ...experience, _id: result.insertedId },
    })
  }

  React.useEffect(() => {
    console.log('INIT USE EFFECT REDUCER')
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
      console.log('loaded experiences', payload.loadedExperiences)
      return {
        ...state,
        experiences: payload.loadedExperiences || [],
      }
    }

    case actionTypes.addExperience: {
      const updatedExperiences = [...state.experiences].push({
        ...payload,
      })

      console.log('ADD EXP REDUCER, Check the current exp state', state)

      return {
        ...state,
        loading: false,
        experience: updatedExperiences,
      }
    }

    default: {
      console.error(`Received invalid todo action type: ${type}`)
    }
  }
}
