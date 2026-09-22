// Shared "supervisor approval" field for content types where staff create/edit
// content but a supervisor must sign off before it appears on the live website.
//
// How it works:
//   - Every document of a type using this field gets an `approved` boolean,
//     defaulting to false on new documents.
//   - The field is read-only for anyone whose Sanity role is not
//     "administrator" — staff (Editor role) can see the status but cannot
//     change it themselves.
//   - The website's queries only return documents where `approved == true`,
//     so publishing a document in Studio is not enough on its own to make it
//     live; a supervisor must also flip this field on.
//
// Setup required in Sanity (manage.sanity.io -> project -> Members):
//   - Staff members should have the "Editor" role.
//   - Supervisors who approve content should have the "Administrator" role.
export const approvedField = {
  name: 'approved',
  title: 'Approved — Live on Website',
  type: 'boolean',
  initialValue: false,
  description:
    'Only a Sanity Administrator can turn this on. Staff can create and edit this content freely, but it will not appear on the live website until a supervisor approves it here.',
  readOnly: ({ currentUser }) => {
    const roles = currentUser?.roles?.map(r => r.name) || []
    return !roles.includes('administrator')
  },
}

// Prefixes a preview title with a status icon so supervisors can scan a list
// and immediately see what still needs review.
export function approvalStatusPrefix(approved) {
  return approved ? '✅ ' : '⏳ '
}
