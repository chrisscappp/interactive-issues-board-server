import { collection, getDocs } from "firebase/firestore/lite"
import { db } from "../../config/firebaseConfig"
import { CollectionKey } from "../../consts/collections"

export async function getCollectionItems(collectionId: CollectionKey) {
	const col = collection(db, collectionId)
  	const snapshot = await getDocs(col)
  	const list = snapshot.docs.map(doc => doc.data())
  	return list
}