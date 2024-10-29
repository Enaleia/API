import { readItems } from '@directus/sdk';

export const get_materials = async (client: any, roles: string[]) => {
  try {
    const materials = await client.request(
      readItems('Materials' as never, {
        fields: ['material_id', 'material_name', 'material_description', 'user_role', 'roles'],
      })
    );

    const filterMaterials = roles.length > 0 
    ? materials.filter((material: any) => {
      const materialRoles = material.roles ? Object.values(material.roles) as string[] : []; // Convert JSON to array and assert type
      return materialRoles.some((role: string) => roles.includes(role)); // Check if any role matches
      })
    : materials;

    const result = {
      filterMaterials,
    };
    return result;
  } catch (e) {
    console.log(e);
  }
}