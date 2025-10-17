# Team Members API Setup Instructions

## Step 1: Create Team Member Content Type in Strapi

1. Go to Strapi Admin: http://localhost:1337/admin
2. Navigate to **Content-Type Builder** (in the sidebar)
3. Click **"Create new collection type"**
4. Name it: `team-member` (API ID will be `team-member`)
5. Click **Continue**

## Step 2: Add Fields

Add the following fields:

### Text Field: `name`
- Name: `name`
- Type: Short text
- Required: Yes

### Text Field: `role`
- Name: `role`
- Type: Short text
- Required: Yes

### Text Field: `breathingStyle`
- Name: `breathingStyle`
- Type: Short text
- Required: No

### Text Field: `bio`
- Name: `bio`
- Type: Long text
- Required: No

### Number Field: `order`
- Name: `order`
- Number format: integer
- Required: Yes
- (This will help sort team members)

### Media Field: `photo`
- Name: `photo`
- Type: Single media
- Allowed types: Images only
- Required: No

6. Click **Save** and wait for server restart

## Step 3: Set Permissions

1. Go to **Settings** → **Roles** → **Public**
2. Under **Team-member**, check:
   - ✓ find
   - ✓ findOne
3. Click **Save**

## Step 4: Enable GraphQL for Team Members

1. If you haven't already, install GraphQL plugin (should already be installed)
2. The team-member content type will automatically be available in GraphQL

## Step 5: Import Sample Data (Optional)

Run this command to import sample team member data:

```bash
cd backend
node import-team-members.js
```

## Step 6: Add Your Team Photos

1. Go to **Content Manager** → **Team member**
2. For each team member:
   - Click to edit
   - Upload team member photo in the `photo` field
   - Update name, role, breathing style, and bio
   - Click **Save** and **Publish**

## GraphQL Query Example

Once setup is complete, you can query team members like this:

```graphql
query GetTeamMembers {
  teamMembers(sort: "order:asc") {
    documentId
    name
    role
    breathingStyle
    bio
    order
    photo {
      url
      alternativeText
    }
  }
}
```

Test it at: http://localhost:1337/graphql
