import { readItems } from '@directus/sdk';

export const get_collectors = async (client: any, collector_id: string | null) => {
  const filter = collector_id ? { collector_id: { _eq: collector_id } } : {};
  try {
    const collectors = await client.request(
      readItems('Collectors' as never, {
        fields: ['collector_name', 'collector_country', 'company_name', 'vessel_type', 'collector_id'],
        filter,
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
