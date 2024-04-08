// import { eq, ilike, or } from 'drizzle-orm';
// import { db } from './db/config.server';
// import { ContactMutation, ContactRecord, contacts } from './db/schema.server';

// export const insertOrUpdate = async (contact: ContactRecord | ContactMutation) => {
//   const savedContact = await db
//     .insert(contacts)
//     .values(contact)
//     .onConflictDoUpdate({ target: contacts.uuid, set: contact });

//   return savedContact;
// };

// export const updateContact = async (uuid: string, contact: ContactMutation) => {
//   const updatedContact = await db
//     .update(contacts)
//     .set({ ...contact })
//     .where(eq(contacts.uuid, uuid));

//   return updatedContact;
// };

// export const findContact = async (contactId: string) => {
//   try {
//     const contact = await db.query.contacts.findFirst({
//       where: (contact, { eq }) => eq(contact.uuid, contactId)
//     });

//     return contact;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const deleteContact = async (contactId: string) => {
//   const deleteContact = await db.delete(contacts).where(eq(contacts.uuid, contactId)).returning();
//   return deleteContact;
// };

// export const findAllContacts = async (query?: string | null) => {
//   let result;

//   if (query) {
//     // If a query is provided, find contacts where firstName or lastName contains the query
//     result = await db
//       .select()
//       .from(contacts)
//       .where(or(ilike(contacts.firstName, `%${query}%`), ilike(contacts.lastName, `%${query}%`)));
//   } else {
//     // If no query is provided, find all contacts
//     result = await db.query.contacts.findMany();
//   }

//   return result;
// };

// // export const findUserWithSkills = async (userId: string) => {
// //   try {
// //     const user = await db.query.users.findFirst({
// //       where: (user, { eq }) => eq(user.uuid, userId),
// //       with: {
// //         usersToSkills: {
// //           with: {
// //             skill: true
// //           }
// //         }
// //       }
// //     });

// //     return user;
// //   } catch (error) {
// //     console.error(error);
// //     throw error;
// //   }
// // };

// // export const insertOrUpdate = async (user: User) => {
// //   const insertUser = async (user: User) => {
// //     return db
// //       .insert(users)
// //       .values(user)
// //       .onConflictDoUpdate({ target: users.uuid, set: { ...user } });
// //   };

// //   const savedUser = await insertUser(user);

// //   return savedUser;
// // };
