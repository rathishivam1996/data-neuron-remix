import { v4 as uuidv4 } from 'uuid';

export interface Contact {
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
export type ContactMutation = Partial<Omit<Contact, 'uuid' | 'createdOn'>>; // Optional properties for mutations

const fakeContacts: Record<string, Contact> = {};

async function create(contact: Contact): Promise<Contact> {
  const newContact = {
    ...contact,
    createdOn: new Date(),
    updatedOn: new Date()
  };
  fakeContacts[newContact.uuid] = newContact;
  return newContact;
}

async function update(uuid: string, mutation: ContactMutation): Promise<Contact | null> {
  const existingContact = fakeContacts[uuid];
  if (!existingContact) {
    throw new Error(`No contact found for ${uuid}`);
  }

  const updatedContact = { ...existingContact, ...mutation, updatedOn: new Date() };
  fakeContacts[uuid] = updatedContact;
  return updatedContact;
}

async function createOrUpdate(uuid: string, mutation: ContactMutation): Promise<Contact> {
  const existingContact = fakeContacts[uuid];
  if (!existingContact) {
    return create({ uuid, ...mutation });
  } else {
    return update(uuid, mutation);
  }
}

async function getAll(query?: string | null): Promise<Contact[]> {
  let contacts = Object.values(fakeContacts);
  if (query) {
    contacts = contacts.filter(
      (contact) => contact.firstName.includes(query) || contact.lastName.includes(query)
    );
  }
  return contacts.sort((a, b) => b.createdOn.getTime() - a.createdOn.getTime());
}

async function get(uuid: string): Promise<Contact | null> {
  return fakeContacts[uuid] || null;
}

async function deleteContact(uuid: string): Promise<void> {
  delete fakeContacts[uuid];
}

const initialContacts = [
  {
    avatarUrl: '/shivam-profile-image.jpeg',
    firstName: 'Shivam',
    lastName: 'Rathi',
    linkedInProfile: 'https://www.linkedin.com/in/shivam-rathi-218993215/'
  }
  // Add more initial contacts here
];

async function prepopulateContacts() {
  for (const contact of initialContacts) {
    await create(contact);
  }
}

(async () => {
  await prepopulateContacts();
  // Rest of your application logic here
})();

// Helper functions to be called from routes or actions
export async function getContacts(query?: string | null) {
  return getAll(query);
}

export async function createContact(contact: ContactMutation) {
  return create(contact);
}

export async function getContact(uuid: string) {
  return get(uuid);
}

export async function updateContact(uuid: string, mutation: ContactMutation) {
  return update(uuid, mutation);
}

export async function createOrUpdateContact(uuid: string, mutation: ContactMutation) {
  return createOrUpdate(uuid, mutation);
}

export async function deleteContact(uuid: string) {
  return deleteContact(uuid);
}
