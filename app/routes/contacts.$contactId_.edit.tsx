import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useNavigate } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { useState } from 'react';
import { findContact, insertOrUpdate } from '~/api';
import { ContactRecord } from '~/db/schema.server';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, 'Missing contactId param');
  // const contact = await getContact(params.contactId);
  const contact = await findContact(params.contactId);
  // if (!contact) {
  //   throw new Response('Not Found', { status: 404 });
  // }
  return json({ contact: contact });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, 'Missing contactId param');

  const formData = await request.formData();

  const updates: { [k: string]: FormDataEntryValue } = Object.fromEntries(formData);

  // Parse skills from JSON string to array
  if (typeof updates.skills === 'string') {
    updates.skills = JSON.parse(updates.skills);
  }

  // Use params.userId as the UUID

  const contactUpdates: ContactRecord = updates as unknown as ContactRecord;
  contactUpdates.createdOn = new Date();
  contactUpdates.updatedOn = new Date();
  contactUpdates.uuid = params.contactId;

  insertOrUpdate(contactUpdates);

  // await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
};

export default function EditContact() {
  const { contact } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const handleNewSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (newSkill.trim() !== '') {
        setSkills([...skills, newSkill.trim()]);
        setNewSkill('');
      }
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  return (
    <Form id="contact-form" method="post">
      <p>
        <span>Name</span>
        <input
          defaultValue={contact?.firstName ?? ''}
          aria-label="First name"
          name="firstName"
          type="text"
          placeholder="First"
        />
        <input
          aria-label="Last name"
          defaultValue={contact?.lastName ?? ''}
          name="lastName"
          placeholder="Last"
          type="text"
        />
      </p>
      <label>
        <span>LinkedIn</span>
        <input
          defaultValue={contact?.linkedInProfile ?? ''}
          name="linkedInProfile"
          placeholder="https://www.linkedin.com/in/shivam-rathi-218993215/"
          type="text"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          aria-label="Avatar URL"
          defaultValue={contact?.avatarUrl ?? ''}
          name="avatarUrl"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea defaultValue={contact?.notes ?? ''} name="notes" rows={6} />
      </label>
      <label className="flex w-full flex-col items-center justify-start gap-[1rem]">
        <div className="flex w-full items-center justify-start">
          <span>Skills</span>
          <input
            type="text"
            placeholder="Java, Spring Boot, React.js, Typescript, Azure"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => handleNewSkill(e)}
          />
        </div>
        <div className="flex w-full items-center justify-start gap-[1rem] pl-[8rem]">
          {skills.map((skill, index) => (
            <span
              className="skill-pill inline-flex !w-auto items-center justify-center gap-[0.5rem]"
              key={`${skill}-${index}`}>
              {skill}
              <button type="button" onClick={() => removeSkill(index)}>
                x
              </button>
            </span>
          ))}
        </div>
        <input type="hidden" name="skills" value={JSON.stringify(skills)} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
