import { readItems } from "@directus/sdk";

export const get_aggregate_data = async (client: any) => {
  try {
    const aggregates = await client.request(
      readItems('Aggregates' as never, {
        fields: ['total_materials_recycled', 'total_fishermen_actions', 'total_countries', 'total_ports', 'active_vessels'],
      })
    );
    
    // Combine actions and materials
    const result = {
      aggregates,
    };
    
    console.log(result,'here');
    return result;
  } catch (e) {
    console.log(e)
  }
}
