import {
  db,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "@/app//firebaseConfig";

const featuresCollection = collection(db, "features");

export const fetchFeaturesFromFirebase = async () => {
  const snapshot = await getDocs(featuresCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addFeatureToFirebase = async (feature: any) => {
  const docRef = await addDoc(featuresCollection, feature);
  return { id: docRef.id, ...feature };
};

export const updateFeatureInFirebase = async ({ id, updatedFeature: any }) => {
  const featureDoc = doc(db, "features", id);
  await updateDoc(featureDoc, updatedFeature);
};

export const deleteFeatureFromFirebase = async (id) => {
  const featureDoc = doc(db, "features", id);
  await deleteDoc(featureDoc);
};
