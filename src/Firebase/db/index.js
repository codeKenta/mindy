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
  getExperiences: async uid => {
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

  getExperience: async docId => {
    return db
      .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
      .doc(docId)
      .get()
      .then(doc => {
        if (doc.exists) {
          return {
            ...doc.data(),
            docId: doc.id,
          }
        } else {
          // doc.data() will be undefined in this case
          throw 'Data could not be found for the story'
        }
      })
      .catch(error => {
        throw 'Data could not be found for the story'
      })
  },
  updateExperience: async (docId, data) => {
    try {
      const updateResult = await db
        .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
        .doc(docId)
        .update({
          ...data,
        })

      return updateResult
    } catch (error) {
      throw error
    }
  },
}
