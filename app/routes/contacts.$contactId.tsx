import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, useFetcher, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { ContactRecord, getContact, updateContact } from '~/data';
// import { ContactRecord } from '~/db/schema.server';

// export const action = async ({ params, request }: ActionFunctionArgs) => {
//   invariant(params.contactId, 'Missing contactId param');
//   const formData = await request.formData();

//   return updateContact(params.contactId, {
//     favorite: formData.get('favorite') === 'true',
//     updatedOn: new Date()
//   });
//   // return updateContact(params.contactId, {
//   //   favorite: formData.get('favorite') === 'true'
//   // });
// };

// export const loader = async ({ params }: LoaderFunctionArgs) => {
//   invariant(params.contactId, 'Missing contactId param');
//   const contact = await findContact(params.contactId);
//   if (!contact) {
//     throw new Response('Not Found', { status: 404 });
//   }
//   return json({ contact: contact });
// };

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, 'Missing contactId param');
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
    updatedOn: new Date()
  });
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, 'Missing contactId param');
  const contact = await getContact(params.contactId);
  console.log(contact, 'cccccccccccc');
  if (!contact) {
    console.log('dddddddddddddddddddd');
    throw new Response('Not Found', { status: 404 });
  }
  return json({ contact });
};

export default function Contact() {
  const { contact } = useLoaderData<typeof loader>();

  return (
    <div id="contact">
      <div>
        <img
          alt={`${contact.firstName} ${contact.lastName} avatar`}
          key={contact.avatarUrl}
          src={contact.avatarUrl ?? ''}
        />
      </div>

      <div>
        <h1>
          {contact.firstName || contact.lastName ? (
            <>
              {contact.firstName} {contact.lastName}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.linkedInProfile ? (
          <p>
            <a href={`https://twitter.com/${contact.linkedInProfile}`}>{contact.linkedInProfile}</a>
          </p>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm('Please confirm you want to delete this record.');
              if (!response) {
                event.preventDefault();
              }
            }}>
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: { contact: Pick<ContactRecord, 'favorite'> }) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get('favorite') === 'true'
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        name="favorite"
        value={favorite ? 'false' : 'true'}>
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}
