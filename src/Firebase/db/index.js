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
}

// let query = firestore.collection('col').where('foo', '>', 42);

// query.orderBy('foo', 'desc').get().then(querySnapshot => {
//   querySnapshot.forEach(documentSnapshot => {
//     console.log(`Found document at ${documentSnapshot.ref.path}`);
//   });
