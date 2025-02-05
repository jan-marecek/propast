import { firestore } from "$lib/services/firestore";
import {
  doc,
  where,
  getDoc,
  limit,
  setDoc,
  collection,
  serverTimestamp,
  orderBy,
  getDocs,
  type QueryDocumentSnapshot,
  query,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import type { Reservation } from "$lib/types";
import { createBatchedCollection } from "$lib/stores/batchedCollection";

function fromSnapshotToReservation(snapshot: QueryDocumentSnapshot): Reservation {
  const data = snapshot.data();

  if (data.publishedAt?.toDate) {
    data.publishedAt = data.publishedAt.toDate();
  }

  if (data.createdAt?.toDate) {
    data.createdAt = data.createdAt.toDate();
  }

  if (data.updatedAt?.toDate) {
    data.updatedAt = data.updatedAt.toDate();
  }

  return data as Reservation;
}

export async function getAllReservations(): Promise<Reservation[]> {
  const db = firestore;
  const q = query(collection(db, "reservations"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(fromSnapshotToReservation);
}

export async function getReservations(id: string): Promise<Reservation | null> {
  const db = firestore;
  const docRef = doc(db, "reservations", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return fromSnapshotToReservation(docSnap);
  } else {
    return null;
  }
}

export async function updateReservation(data: Reservation) {
  if (!data.id) {
    throw new Error("updateReservation: No ID provided");
  }
  const db = firestore;
  const docRef = doc(db, "reservations", data.id);

  try {
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    console.log("Reservation successfully updated!");
  } catch (error) {
    console.error("Error updating reservation:", error);
  }
}

export async function deleteReservation(id: string) {
  if (!id) {
    console.error("deleteReservation: No ID provided");
    return;
  }
  const db = firestore;
  const docRef = doc(db, "reservations", id);
  await deleteDoc(docRef);
}

export async function createReservation(data: Reservation): Promise<Reservation> {
  const db = firestore;
  const reservationsRef = collection(db, "reservations");
  if (!data.id || data.id == "") {
    data.id = doc(reservationsRef).id;
  }
  if (!data.isVisible) {
    data.isVisible = false;
  }

  const docSnap = await setDoc(doc(reservationsRef, data.id), {
    id: data.id,
    note: data.note,
    name: data.name ?? "",
    mail: data.mail ?? "",
    phone: data.phone ?? "",
    isVisible: data.isVisible ?? false,
    roomOptionsValue: data.roomOptionsValue ?? "",
    peopleOptionsValue: data.peopleOptionsValue ?? "",
    selectedDates: data.selectedDates ?? null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    checked: data.checked ?? null,
  });
  return data;
}

export function createReservationsStore({
  limitSize = 9,
  publishedTill = new Date(),
}: {
  limitSize?: number;
  publishedTill?: Date;
}) {
  const queryConstraints = [
    where("createdAt", "<=", publishedTill),
    orderBy("createdAt", "desc"),
    limit(limitSize),
  ];

  return createBatchedCollection<Reservation>({
    path: "reservations",
    batchSize: limitSize,
    constraints: queryConstraints,
    fromSnapshotToData: fromSnapshotToReservation,
  });
}
