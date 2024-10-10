import { db, getDoc, setDoc, updateDoc, doc } from "@/app//firebaseConfig";

export const fetchAboutContent = async () => {
  const docRef = doc(db, "aboutContent", "aboutPage");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return {
      title: "",
      description: "",
      more: "",
      vision: "",
      images: [],
    };
  }
};

export const updateAboutContent = async (aboutContent: any) => {
  const docRef = doc(db, "aboutContent", "aboutPage");
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, aboutContent);
    } else {
      await setDoc(docRef, aboutContent);
    }
  } catch (error) {
    console.error("Error updating about content:", error);
    throw error;
  }
};
