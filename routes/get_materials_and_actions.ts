import { readItems } from '@directus/sdk';

export const get_actions_and_materials_for_role_id = async (client: any, id: string) => {
  try {
    const actionsAndMaterials = await client.request(
      readItems('Actions' as never, {
        fields: ['action_id', 'action_name', 'action_description', 'user_role'],
      })
    );
    const materials = await client.request(
      readItems('Materials' as never, {
        fields: ['material_id', 'material_name', 'material_description', 'user_role'],
      })
    );
    
    // Combine actions and materials
    const result = {
      actions: actionsAndMaterials,
      materials: materials
    };
    
    console.log(result,'here');
    return result;
  } catch (e) {
    console.log(e)
  }
}
