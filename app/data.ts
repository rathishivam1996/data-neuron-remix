import { v4 as uuidv4 } from 'uuid';

export type ContactRecord = {
  uuid: string;
  firstName: string;
  lastName: string;
  createdOn: Date;
  updatedOn: Date;

  linkedInProfile?: string;
  avatarUrl?: string;
  notes?: string;
  favorite?: boolean | null;
};

export type ContactMutation = {
  // uuid: string;
  updatedOn: Date;

  firstName?: string;
  lastName?: string;
  favorite?: boolean | null;
  linkedInProfile?: string;
  avatarUrl?: string;
  notes?: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(query?: string | null): Promise<ContactRecord[]> {
    let contacts = Object.values(fakeContacts.records);
    if (query) {
      contacts = contacts.filter(
        (contact) => contact.firstName.includes(query) || contact.lastName.includes(query)
      );
    }
    return contacts.sort((a, b) => b.createdOn.getTime() - a.createdOn.getTime());
  },

  async get(uuid: string): Promise<ContactRecord | null> {
    return fakeContacts.records[uuid] || null;
  },

  async create(contact: ContactRecord): Promise<ContactRecord> {
    contact.createdOn = new Date();
    contact.updatedOn = new Date();
    fakeContacts.records[contact.uuid] = contact;

    console.log(fakeContacts.getAll(), 'alllllllllll');
    return contact;
  },

  async update(uuid: string, mutation: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(uuid);
    if (!contact) {
      throw new Error(`No contact found for ${uuid}`);
    }
    const updatedContact = { ...contact, ...mutation };
    updatedContact.updatedOn = new Date();
    fakeContacts.records[uuid] = updatedContact;
    console.log(fakeContacts.getAll(), 'alllllllllll');

    return updatedContact;
  },

  async createOrUpdate(uuid: string, contact: ContactRecord | ContactMutation) {
    const existingContact = await fakeContacts.get(uuid);
    if (existingContact) {
      // If the contact exists, update it
      console.log(`updating`, contact, uuid);
      return fakeContacts.update(uuid, contact as ContactMutation);
    } else {
      console.log(`creating`, contact, uuid);

      // If the contact does not exist, create a new one
      const newContact = { uuid, ...contact };
      return fakeContacts.create(newContact as ContactRecord);
    }
  },

  async delete(uuid: string): Promise<void> {
    delete fakeContacts.records[uuid];
  }
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  return fakeContacts.getAll(query);
}

export async function createContact(contact: ContactRecord) {
  return fakeContacts.create(contact);
}

export async function getContact(uuid: string) {
  return fakeContacts.get(uuid);
}

export async function updateContact(uuid: string, mutation: ContactMutation) {
  return fakeContacts.update(uuid, mutation);
}

export async function createOrUpdate(uuid: string, mutation: ContactMutation | ContactRecord) {
  return fakeContacts.createOrUpdate(uuid, mutation);
}

export async function deleteContact(uuid: string) {
  return fakeContacts.delete(uuid);
}

[
  {
    avatarUrl: '/shivam-profile-image.jpeg',
    firstName: 'Shivam',
    lastName: 'Rathi',
    linkedInProfile: 'https://www.linkedin.com/in/shivam-rathi-218993215/'
  }
].forEach(async (contact) => {
  const uuid = uuidv4();
  const createdOn = new Date();
  const updatedOn = new Date();

  await fakeContacts.create({
    uuid,
    firstName: contact.firstName,
    lastName: contact.lastName,
    createdOn,
    updatedOn,
    avatarUrl: contact.avatarUrl,
    linkedInProfile: contact.linkedInProfile
  });
});
