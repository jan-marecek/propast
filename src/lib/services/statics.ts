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
import type { Event } from "$lib/types";
import { createBatchedCollection } from "$lib/stores/batchedCollection";

function fromSnapshotToEvent(snapshot: QueryDocumentSnapshot): Event {
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

  return data as Event;
}

export async function getAllEvents(): Promise<Event[]> {
  const db = firestore;
  const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(fromSnapshotToEvent);
}

export async function getEvent(id: string): Promise<Event | null> {
  const db = firestore;
  const docRef = doc(db, "events", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return fromSnapshotToEvent(docSnap);
  } else {
    return null;
  }
}

export async function updateEvent(data: Event) {
  if (!data.id) {
    throw new Error("updateEvent: No ID provided");
  }
  const db = firestore;
  const docRef = doc(db, "events", data.id);

  try {
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    console.log("Event successfully updated!");
  } catch (error) {
    console.error("Error updating event:", error);
  }
}

export async function deleteEvent(id: string) {
  if (!id) {
    console.error("deleteEvent: No ID provided");
    return;
  }
  const db = firestore;
  const docRef = doc(db, "events", id);
  await deleteDoc(docRef);
}

export async function createEvent(data: Event): Promise<Event> {
  const db = firestore;
  const eventsRef = collection(db, "events");
  if (!data.id || data.id == "") {
    data.id = doc(eventsRef).id;
  }
  if (!data.isVisible) {
    data.isVisible = false;
  }

  const docSnap = await setDoc(doc(eventsRef, data.id), {
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

export function createEventsStore({
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

  return createBatchedCollection<Event>({
    path: "events",
    batchSize: limitSize,
    constraints: queryConstraints,
    fromSnapshotToData: fromSnapshotToEvent,
  });
}
