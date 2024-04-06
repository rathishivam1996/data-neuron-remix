declare module 'routes-gen' {
  export type RouteParams = {
    '/': Record<string, never>;
    '/about/:aboutId': { aboutId: string };
    '/contacts/:contactId': { contactId: string };
    '/contacts/:contactId/destroy': { contactId: string };
    '/contacts/:contactId/edit': { contactId: string };
  };

  export function route<
    T extends
      | ['/']
      | ['/about/:aboutId', RouteParams['/about/:aboutId']]
      | ['/contacts/:contactId', RouteParams['/contacts/:contactId']]
      | ['/contacts/:contactId/destroy', RouteParams['/contacts/:contactId/destroy']]
      | ['/contacts/:contactId/edit', RouteParams['/contacts/:contactId/edit']]
  >(...args: T): (typeof args)[0];
}
