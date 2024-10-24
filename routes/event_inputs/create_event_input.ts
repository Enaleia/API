import { createItem } from '@directus/sdk';

export const create_event_input = async (client: any, params: any) => {
  try {
    console.log(params);
    const event_input = await client.request(
      createItem('Events Input' as never, {
        "status": "draft",
        "input_material": "",
        "input_weight": "",
        "input_code": "",
        "event_id": "",
        "date_created": "",
      } as never)
    );

    const result = {
      event_input,
    };

    return result;
  } catch (e) {
    console.log(e);
  }
}