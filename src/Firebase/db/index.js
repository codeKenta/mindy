import { db } from '../firebase'

export default {
  addExperience: async payload => {
    try {
      const docRef = await db
        .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
        .doc()

      await docRef.set(payload)

      return { ...payload, docId: docRef.id }
    } catch (error) {
      throw error
    }
  },
  getExperiences: uid => {
    return db
      .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
      .where('uid', '==', uid)
      .orderBy('date', 'desc')
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

  getExperience: (uid, docId) => {
    console.log({ uid, docId })
    return (
      db
        .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
        // .where({
        //   uid: uid,
        //   docId: docId,
        // })
        .where('uid', '==', uid)
        .where('docId', '==', docId)
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
    )
  },
}
