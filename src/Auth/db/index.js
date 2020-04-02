import { db } from '../Auth'

// TODO:
// Get userId from some kind of hook so i dont need to pass it as argument
// Fix envirement variables for now deploy

export const addExperience = ({
  userId,
  title,
  story,
  date,
  isPublic,
  categories,
}) => {
  return db.collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME).add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: 'testUserID',
    users: [
      {
        userId,
        title,
        date,
        story,
        isPublic,
        categories,
      },
    ],
  })
}
