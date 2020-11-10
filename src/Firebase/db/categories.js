import { db } from '../firebase'

export const addCategory = async payload => {
    try {
      const docRef = await db
        .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
        .doc()

      await docRef.set(payload)

      return { ...payload, docId: docRef.id }
    } catch (error) {
      throw error
    }
  }

  export const getCategories = async (uid, nextQuery) => {
    const LIMIT = 20
    if (nextQuery) {
      return nextQuery.get().then(function(documentSnapshots) {
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1]

        const data = documentSnapshots.docs.map(doc => {
          return {
            ...doc.data(),
            docId: doc.id,
          }
        })

        let next
        if (data.length !== 0) {
          next = db
            .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
            .where('uid', '==', uid)
            .orderBy('date', 'desc')
            .startAfter(lastVisible)
            .limit(LIMIT)
        }

        return {
          experiences: data,
          nextQuery: next || null,
          isOutOfQueries: data.length === 0,
        }
      })
    } else {
      const first = db
        .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
        .where('uid', '==', uid)
        .orderBy('date', 'desc')
        .limit(LIMIT)

      return first.get().then(function(documentSnapshots) {
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1]

        const data = documentSnapshots.docs.map(doc => {
          return {
            ...doc.data(),
            docId: doc.id,
          }
        })

        const next = db
          .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
          .where('uid', '==', uid)
          .orderBy('date', 'desc')
          .startAfter(lastVisible)
          .limit(LIMIT)

        return { experiences: data, nextQuery: next }
      })
    }
  }

  export const updateCategories = async (docId, data) => {
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
  }
  export const deleteCategory = async docId => {
    try {
      const deletedDoc = db
        .collection(process.env.GATSBY_EXPERIENCE_COLLECTION_NAME)
        .doc(docId)
        .delete()

      return deletedDoc
    } catch (error) {
      throw error
    }
  }