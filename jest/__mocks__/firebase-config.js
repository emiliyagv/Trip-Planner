import mockFirebase from './firebase';

export const auth = jest.fn();
export const googleProvider = jest.fn();
export const db = mockFirebase.getFirestore();
export const storage = mockFirebase.getStorage();