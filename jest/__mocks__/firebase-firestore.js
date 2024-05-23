import mockFirebase from './firebase';

export const mockFirestore = {
  doc: jest.fn(),
  getDoc: jest.fn().mockResolvedValue({ data: () => ({ reviews: [] }) }),
  getDocs: jest.fn().mockResolvedValue([]),
  updateDoc: jest.fn(),
  collection: jest.fn(),
  getFirestore: mockFirebase.getFirestore,
};

export default mockFirestore;