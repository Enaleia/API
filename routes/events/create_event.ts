import { createItem } from '@directus/sdk';

export const create_event = async (client: any, params: any) => {
  try {
    console.log(params);
    const event = await client.request(
      createItem('Events' as never, {
        "status": "draft",
        "event_location": "",
        "event_timestamp": "",
        "action": "",
        "collector": "",
      } as never)
    );

    const result = {
      event,
    };

    return result;
  } catch (e) {
    console.log(e);
  }
}