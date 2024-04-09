import ContactForm from '~/components/ContactForm';

import { ActionFunctionArgs } from '@remix-run/node';
import { z } from 'zod';
import { ContactMutation, createContact } from '~/data2';

const contactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  linkedInProfile: z.string().optional(),
  avatarUrl: z.string().optional(),
  notes: z.string().optional(),
  favourite: z.boolean().optional()
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates: { [k: string]: FormDataEntryValue } = Object.fromEntries(formData);
  try {
    const contactUpdates: ContactMutation = contactSchema.parse(updates);
    createContact(contactUpdates);
  } catch (error) {
    console.error(error);
  }
};

const Create = () => {
  const contact = {};

  return <ContactForm contact={contact} />;
};

export default Create;
