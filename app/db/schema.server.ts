// import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
// import { v4 as uuidv4 } from 'uuid';

// export const contacts = sqliteTable('contacts', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   uuid: text('uuid')
//     .notNull()
//     .unique()
//     .$defaultFn(() => uuidv4()),
//   firstName: text('first_name'),
//   lastName: text('last_name'),
//   linkedInProfile: text('linkedin_profile'),
//   avatarUrl: text('avatar_url'),
//   notes: text('notes'),
//   favorite: integer('favorite', { mode: 'boolean' }).$defaultFn(() => false),
//   createdOn: integer('created_on', { mode: 'timestamp_ms' })
//     .notNull()
//     .$defaultFn(() => new Date()),
//   updatedOn: integer('updated_on', { mode: 'timestamp_ms' })
//     .notNull()
//     .$defaultFn(() => new Date())
// });

// export type ContactDbRecord = typeof contacts.$inferInsert;

// export type ContactRecord = {
//   uuid: string;
//   firstName: string;
//   lastName: string;
//   createdOn: Date;
//   updatedOn: Date;

//   linkedInProfile?: string;
//   avatarUrl?: string;
//   notes?: string;
//   favorite?: boolean | null;
// };

// export type ContactMutation = {
//   // uuid: string;
//   updatedOn: Date;

//   firstName?: string;
//   lastName?: string;
//   favorite?: boolean | null;
//   linkedInProfile?: string;
//   avatarUrl?: string;
//   notes?: string;
// };
