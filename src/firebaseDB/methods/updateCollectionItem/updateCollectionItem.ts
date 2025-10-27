import { updateDoc, doc } from "firebase/firestore/lite"
import { db } from "../../config/firebaseConfig"
import { CollectionKey } from "../../consts/collections"

export async function updateCollectionItem<T extends object>(collectionId: CollectionKey, itemId: string, item: T) {
	await updateDoc(doc(db, collectionId, itemId), item)
}