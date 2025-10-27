import { deleteDoc, doc } from "firebase/firestore/lite"
import { db } from "../../config/firebaseConfig"
import { CollectionKey } from "../../consts/collections"

export async function deleteItemFromCollection(collectionId: CollectionKey, itemId: string) {
	await deleteDoc(doc(db, collectionId, itemId))
}