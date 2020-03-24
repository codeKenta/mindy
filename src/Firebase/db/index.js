import firebase from '../firebase'

// TODO:
// Fix envirement variables for now deploy

// export const addExperience = payload => {
//   if (typeof window !== 'undefined') {
//     console.log('INCOME', { uid, title, story, date, isPublic, categories })
//     return firebase
//       .firestore()
//       .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
//       .add(payload)
//   }
// }

export default {
  addExperience: payload => {
    if (typeof window !== 'undefined') {
      // console.log('INCOME', { uid, title, story, date, isPublic, categories })
      return firebase
        .firestore()
        .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
        .add(payload)
    }
  },
}
