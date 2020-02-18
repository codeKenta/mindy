import React from 'react'
import { useStitchAuth } from '../../Auth/StitchAuth'
import { useExperiences } from '../../hooks/useExperiences'

const Experiences = () => {
  const { currentUser } = useStitchAuth()
  const { experiences } = useExperiences(currentUser.id)

  return <section>experiences</section>
}

export default Experiences
