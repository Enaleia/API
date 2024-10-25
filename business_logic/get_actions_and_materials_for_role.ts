import { readItems } from '@directus/sdk';
import { get_actions, get_materials } from '../routes/';

export const get_actions_and_materials_for_role = async (client: any, roleId: string) => {
  try {
    const actions = await get_actions(client, roleId)
    const materials = await get_materials(client, roleId)

    const result = {
      actions,
      materials,
    };

    console.log(result, 'here');
    return result;
  } catch (e) {
    console.log(e);
  }
}
