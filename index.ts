import { createDirectus, rest } from '@directus/sdk';
import { get_actions } from './routes/actions/get_actions';
import { get_collectors } from './routes/collectors/get_collectors';
import { get_materials } from './routes/materials/get_materials';

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
    
    if (url.pathname === "/actions") {
      const roleId = url.searchParams.get("roleId"); // Get roleId from query parameters
      
      try {
        const result = await get_actions(client, roleId);
        return new Response(JSON.stringify(result), { status: 200 });
      } catch (error) {
        return new Response("Error fetching data", { status: 500 });
      }
    }

    if (url.pathname === "/materials") {
      const roleId = url.searchParams.get("roleId"); // Get roleId from query parameters
      
      try {
        const result = await get_materials(client, roleId);
        return new Response(JSON.stringify(result), { status: 200 });
      } catch (error) {
        return new Response("Error fetching data", { status: 500 });
      }
    }

    if (url.pathname === "/get_collectors") {
      try {
        const roleId = url.searchParams.get("collectorId"); // Get roleId from query parameters
      
        const result = await get_collectors(client, roleId);
        return new Response(JSON.stringify(result), { status: 200 });
      } catch (error) {
        return new Response("Error fetching data", { status: 500 });
      }
    }


    return new Response("404!", { status: 404 });
  },
});