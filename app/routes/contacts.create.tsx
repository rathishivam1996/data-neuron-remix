import ContactForm from '~/components/ContactForm';

import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { z } from 'zod';
import { ContactMutation, createContact } from '~/data2';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required and cannot be empty.'),
  lastName: z.string().min(1, 'Last name is required and cannot be empty.'),
  linkedInProfile: z.string().url('LinkedIn profile must be a valid URL.').optional(),
  avatarUrl: z.string().url('Avatar URL must be a valid URL.').optional(),
  notes: z.string().optional(),
  favourite: z.boolean().optional()
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates: { [k: string]: FormDataEntryValue } = Object.fromEntries(formData);
  try {
    const contactUpdates: ContactMutation = contactSchema.parse(updates);
    const createdContact = await createContact(contactUpdates);
    return redirect(`/contacts/${createdContact.uuid}`);
  } catch (error) {
    console.error(error);
    return { status: 500, body: 'An error occurred while creating the contact.' };
  }
};

const Create = () => {
  const contact = {};

  return <ContactForm contact={contact} />;
};

export default Create;
