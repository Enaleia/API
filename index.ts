import { createDirectus, rest } from '@directus/sdk';
import { get_actions_and_materials_for_role_id } from './routes/get_materials_and_actions';
import { get_collectors } from './routes/get_collectors';

const client = createDirectus('https://enaleia.directus.app').with(rest());

Bun.serve({
  fetch: async (req) => {
    const url = new URL(req.url);
    
    if (url.pathname === "/") {
      return new Response("All directus data");
    }
    
    if (url.pathname === "/boats") {
      return new Response("All Boats data!");
    }
    
    if (url.pathname === "/actions-and-materials") {
      const roleId = url.searchParams.get("roleId"); // Get roleId from query parameters
      if (!roleId) {
        return new Response("Role ID is required", { status: 400 });
      }
      
      try {
        const result = await get_actions_and_materials_for_role_id(client, roleId);
        return new Response(JSON.stringify(result), { status: 200 });
      } catch (error) {
        return new Response("Error fetching data", { status: 500 });
      }
    }

    if (url.pathname === "/collectors") {
      try {
        const result = await get_collectors(client);
        return new Response(JSON.stringify(result), { status: 200 });
      } catch (error) {
        return new Response("Error fetching data", { status: 500 });
      }
    }


    return new Response("404!", { status: 404 });
  },
});