import { createItem } from '@directus/sdk';

export const create_event_output = async (client: any, params: any) => {
  try {
    console.log(params);
    const event_output = await client.request(
      createItem('Events Output' as never, {
        "status": "draft",
        "output_material": "",
        "output_weight": "",
        "output_code": "",
        "event_id": "",
        "date_created": "",
      } as never)
    );

    const result = {
      event_output,
    };

    return result;
  } catch (e) {
    console.log(e);
  }
}