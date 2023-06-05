import { 
    arrayUnion,
    getDocs,
    getDoc,
    deleteDoc,
    setDoc,
    doc,
    updateDoc,
    QuerySnapshot,
    DocumentReference
  } from 'firebase/firestore';
  import { db } from '../../firebase/Config'; 
  
  interface MyData {
    profile?: {
      fullName: string;
      email: string;
    };
    contactInfo?: {
      email: string;
      phoneNumber?: string;
    };
    isActive: boolean;
  };
  
  export class FirestoreService {
    
    /**
     * Create a new document.
     */
    async createDoc(data: MyData, mainColl: string, uid: string, subColl?: string): Promise<void> {
      let docRef: DocumentReference;
      if (subColl) {
          docRef = doc(db, mainColl, uid, subColl, 'newDocID');
      } else {
          docRef = doc(db, mainColl, uid);
      }
      await setDoc(docRef, data, { merge: true });
    }
  
    /**
     * Read one document.
     */
    async readOneDoc(collName: string, uid: string): Promise<MyData | null> {
      const ref = doc(db, collName, uid);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        return docSnap.data() as MyData;
      } else {
        return null;
      }
    }
  
    /**
     * Update user profile.
     */
    async updateProfile(data: MyData, uid: string): Promise<void> {
      const profileRef: DocumentReference = doc(db, "users", uid);
      await updateDoc(profileRef, {
        profile: arrayUnion({
          data,
        }),
      });
    }
  
    /**
     * Get all documents from a collection.
     */
    // async getAllDocuments(collName: string): Promise<QuerySnapshot> {
    //   const querySnapshot = await getDocs(collection(db, collName));
    //   return querySnapshot;
    // }
  }
  