import { setDoc, doc } from "firebase/firestore/lite"
import { db } from "../../config/firebaseConfig"
import { CollectionKey } from "../../consts/collections"

export async function addItemToCollection<T extends object>(collectionId: CollectionKey, itemId: string, item: T) {
	await setDoc(doc(db, collectionId, itemId), item)
}