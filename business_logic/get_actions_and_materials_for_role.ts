import { get_actions, get_materials } from '../routes/';


// roles: ["Manufacturer", "Administrator", "Internal", "Fisherman", "Recycler", "Port Coordinator"]
export const get_actions_and_materials_for_role = async (client: any, roles: string[]) => {
  try {
    const actions = await get_actions(client, roles)
    const materials = await get_materials(client, roles)

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
