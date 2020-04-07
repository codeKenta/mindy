import firebase from '../firebase'

// TODO:
// Fix envirement variables for now deploy

export default {
  addExperience: async payload => {
    try {
      const docRef = await firebase
        .firestore()
        .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
        .doc()

      await docRef.set(payload)

      return { ...payload, docId: docRef.id }
    } catch (error) {
      throw error
    }
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
