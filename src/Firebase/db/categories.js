import { db } from '../firebase'

export const addCategory = async payload => {
  try {
    const docRef = await db
      .collection(process.env.GATSBY_CATEGORIES_COLLECTION_NAME)
      .doc()

    await docRef.set(payload)

    return { ...payload, docId: docRef.id }
  } catch (error) {
    throw error
  }
}

export const getCategories = async uid => {
  const query = db
    .collection(process.env.GATSBY_CATEGORIES_COLLECTION_NAME)
    .where('uid', '==', uid)
    .where('isActive', '==', true)
    .orderBy('value', 'desc')

  return query.get().then(function(documentSnapshots) {
    const data = documentSnapshots.docs.map(doc => {
      return {
        ...doc.data(),
        docId: doc.id,
      }
    })

    return { categories: data }
  })
}

export const updateCategory = async (docId, newCategoryName) => {
  try {
    const updateResult = await db
      .collection(process.env.GATSBY_CATEGORIES_COLLECTION_NAME)
      .doc(docId)
      .update({
        value: newCategoryName,
      })

    return updateResult
  } catch (error) {
    throw error
  }
}
export const deleteCategory = async docId => {
  try {
    const deletedDoc = db
      .collection(process.env.GATSBY_CATEGORIES_COLLECTION_NAME)
      .doc(docId)
      .delete()

    return deletedDoc
  } catch (error) {
    throw error
  }
}
