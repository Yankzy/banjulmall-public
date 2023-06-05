import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/Config'; 
import {
  collection,
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  getDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  DocumentData,
  Query,
  QuerySnapshot,
  DocumentReference,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';


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

interface createDoc {
  (data: DocumentData, mainColl: string, subColl?: string): void;
};


const useFirestore = (collRef: Query<unknown>) => {
  const user = useSelector(({user}) => user.currentUser);
  const [documents, setDocuments] = useState<any[]>([]);
  
  // useEffect(() => {
  //   const unSubUsersRef = onSnapshot(collRef, (snapshot) => {
  //     const docs = snapshot.docs.map(doc => {
  //       const data = doc.data() as MyData; 
  //       return { id: doc.id, ...data };
  //     });
  //     setDocuments(docs);
  //   });
  //   return () => {
  //     unSubUsersRef();
  //   };
  
  // }, [collRef]);
  

  const createDoc: createDoc = async(data: DocumentData, mainColl: string, subColl?: string) => {
    // await setDoc(doc(db, ref, user.uid), data );
    let docRef: DocumentReference;
    
    if (subColl) {
        // Get a reference to a document in a subcollection (if subcollection)
        docRef = doc(db, mainColl, user.uid, subColl, 'newDocID');
    } else {
        // Get a reference to a document in the main collection
        docRef = doc(db, mainColl, user.uid);
    }
    setDoc(docRef, data, { merge: true });
  };

  const readOneDoc = async(collName: string) => {
    const ref = doc(db, collName, user.uid);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      return null;
    }

  };

  const updateProfile = (data: DocumentData, uid?: string) => {
    try {
      if(uid){
        setDoc(doc(db, 'users', uid), data );
      }else{
        const profileRef: DocumentReference = doc(db, "users", user.uid);
        updateDoc(profileRef, {
          profile: arrayUnion({
            data,
          }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { documents, createDoc, readOneDoc, updateProfile };
};

export default useFirestore;


