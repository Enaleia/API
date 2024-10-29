import { readItems } from '@directus/sdk';

export const get_actions = async (client: any, roles: string[]) => {
  try {
    const actions = await client.request(
      readItems('Actions' as never, {
        fields: ['action_id', 'action_name', 'action_description', 'user_role', 'roles'],
      })
    );

    const filteredActions = roles.length > 0 
    ? actions.filter((action: any) => {
      const actionRoles = action.roles ? Object.values(action.roles) as string[] : []; // Convert JSON to array and assert type
      return actionRoles.some((role: string) => roles.includes(role)); // Check if any role matches
      })
    : actions;

    const result = {
      filteredActions,
    };
    
    console.log(result,'here');
    return result;
  } catch (e) {
    console.log(e)
  }
}
