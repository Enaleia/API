import { readItems } from '@directus/sdk';

export const get_events = async (client: any, event_id: string | null) => {
  const filter = event_id ? { event_id: { _eq: event_id } } : {};
  try {
    const events = await client.request(
      readItems('Events' as never, {
        fields: ['action', 'collector', 'status', 'event_input_id', 'event_output_id'],
        filter,
      })
    );
    
    // Combine actions and materials
    const result = {
      events,
    };
    
    console.log(result,'here');
    return result;
  } catch (e) {
    console.log(e)
  }
}
