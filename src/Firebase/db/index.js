import firebase from '../firebase'

// TODO:
// Fix envirement variables for now deploy

export default {
  addExperience: payload => {
    return firebase
      .firestore()
      .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
      .add(payload)
  },
  getExperiences: uid => {
    return firebase
      .firestore()
      .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
      .where('uid', '==', uid)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            ...doc.data(),
            docId: doc.id,
          }
        })
        return data
      })
  },
}
