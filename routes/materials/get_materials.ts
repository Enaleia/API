import { readItems } from '@directus/sdk';

export const get_materials = async (client: any, id: string | null) => {
  try {
    // Define the filter condition based on the presence of id
    const filter = id ? { user_role: { _eq: id } } : {};

    const materials = await client.request(
      readItems('Materials' as never, {
        fields: ['material_id', 'material_name', 'material_description', 'user_role'],
        filter, // Apply the filter if id is provided
      })
    );

    const result = {
      materials,
    };

    return result;
  } catch (e) {
    console.log(e);
  }
}