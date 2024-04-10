import { v4 as uuidv4 } from 'uuid';

export interface ContactRecord {
  readonly uuid: string; // Required
  readonly createdOn: Date; // Required
  updatedOn: Date;
  firstName: string; // Required
  lastName: string; // Required

  linkedInProfile?: string; // Optional
  avatarUrl?: string; // Optional
  notes?: string; // Optional
  favourite?: boolean;
}
export type ContactMutation = Partial<Omit<ContactRecord, 'uuid' | 'createdOn'>>; // Optional properties for mutations

const fakeContacts: Record<string, ContactRecord> = {};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const delayMs = 1000;
function log(message: string) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

async function create(contact: ContactRecord): Promise<ContactRecord> {
  await delay(delayMs);

  fakeContacts[contact.uuid] = contact;
  log(`Contact created: ${JSON.stringify(contact)}`);
  return contact;
}

async function getAll(query?: string | null): Promise<ContactRecord[]> {
  await delay(delayMs);

  let contacts = Object.values(fakeContacts);
  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    contacts = contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(lowerCaseQuery) ||
        contact.lastName.toLowerCase().includes(lowerCaseQuery)
    );
  }
  log(`Fetched all contacts: ${JSON.stringify(contacts)}`);
  return contacts.sort((a, b) => b.createdOn.getTime() - a.createdOn.getTime());
}

async function get(uuid: string): Promise<ContactRecord | null> {
  await delay(delayMs);
  const contact = fakeContacts[uuid] || null;

  log(`Fetched contact: ${JSON.stringify(contact)}`);
  return contact;
}

async function update(uuid: string, mutation: ContactMutation): Promise<ContactRecord | null> {
  await delay(delayMs);

  const existingContact = fakeContacts[uuid];
  if (!existingContact) {
    throw new Error(`No contact found for ${uuid}`);
  }

  const updatedContact = { ...existingContact, ...mutation };
  fakeContacts[uuid] = updatedContact;

  log(`Updated contact: ${JSON.stringify(updatedContact)}`);
  return updatedContact;
}

async function remove(uuid: string): Promise<void> {
  await delay(delayMs);

  delete fakeContacts[uuid];

  log(`Deleted contact with uuid: ${uuid}`);
}

// Helper functions to be called from routes or actions

export async function createContact(contact: ContactMutation) {
  if (!contact.firstName || !contact.lastName) {
    throw new Error('First name and last name are required.');
  }

  const newContact: ContactRecord = {
    uuid: uuidv4(),
    createdOn: new Date(),
    updatedOn: new Date(),
    firstName: contact.firstName,
    lastName: contact.lastName,
    linkedInProfile: contact.linkedInProfile,
    avatarUrl: contact.avatarUrl,
    notes: contact.notes,
    favourite: contact.favourite
  };
  return create(newContact);
}

export async function getContacts(query?: string | null) {
  return getAll(query);
}

export async function getContact(uuid: string) {
  return get(uuid);
}

export async function updateContact(uuid: string, mutation: ContactMutation) {
  const updatedMutation = { ...mutation, updatedOn: new Date() };
  return update(uuid, updatedMutation);
}

export async function deleteContact(uuid: string) {
  return remove(uuid);
}

const initialContacts: ContactRecord[] = [
  {
    uuid: uuidv4(),
    createdOn: new Date(),
    updatedOn: new Date(),
    firstName: 'Shivam',
    lastName: 'Rathi',
    linkedInProfile: 'https://www.linkedin.com/in/shivam-rathi-218993215/',
    avatarUrl: '/shivam-profile-image.jpeg'
  }
  // Add more initial contacts here
];

initialContacts.forEach((contact) => {
  fakeContacts[contact.uuid] = contact;
});
