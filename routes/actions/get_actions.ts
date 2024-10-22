import { readItems } from '@directus/sdk';

export const get_actions = async (client: any, id: string | null) => {
  // Define the filter condition based on the presence of id
  const filter = id ? { user_role: { _eq: id } } : {};

  try {
    const actions = await client.request(
      readItems('Actions' as never, {
        fields: ['action_id', 'action_name', 'action_description', 'user_role'],
        filter, // Apply the filter if id is provided
      })
    );

    const result = {
      actions,
    };
    
    console.log(result,'here');
    return result;
  } catch (e) {
    console.log(e)
  }
}
