import { readItems } from '@directus/sdk';

export const get_collectors = async (client: any) => {
  try {
    const collectors = await client.request(
      readItems('Collectors' as never, {
        fields: ['collector_name', 'collector_country', 'company_name', 'vessel_type'],
      })
    );
    
    // Combine actions and materials
    const result = {
      collectors,
    };
    
    console.log(result,'here');
    return result;
  } catch (e) {
    console.log(e)
  }
}
