import { getDoc, doc } from "firebase/firestore/lite"
import { db } from "../../config/firebaseConfig"
import { CollectionKey } from "../../consts/collections"

export async function getCollectionItem(collectionId: CollectionKey, itemId: string) {
	const itemRef = doc(db, collectionId, itemId)
	const itemSnapshot = await getDoc(itemRef)

	if (itemSnapshot.exists()) {
		return itemSnapshot.data()
	} else {
  		console.error(`No such document! Collection: ${collectionId}. DocId: ${itemId}`)
		return null
	}
}