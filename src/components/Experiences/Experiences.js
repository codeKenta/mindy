import React from 'react'
import { useStitchAuth } from '../../Auth/StitchAuth'
import { useExperiences } from '../../store'

const Experiences = () => {
  const { currentUser } = useStitchAuth()
  const { actions } = useExperiences(currentUser.id)

  return <section>experiences</section>
}

export default Experiences
