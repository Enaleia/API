import { createDirectus, rest } from '@directus/sdk';
import { get_actions } from './routes/actions/get_actions';
import { get_collectors } from './routes/collectors/get_collectors';
import { get_materials } from './routes/materials/get_materials';
import { create_event } from './routes/events/create_event';

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
    
    if (url.pathname === "/create_event") {
      const body = await req.json(); // Ensure to parse the request body
      if (!body) {
        return new Response("Invalid request body", { status: 400 });
      }
      const { role, actionId, weights, details }: { role: any, actionId: string, weights: any, details: any } = body;
      
      const params = { role, actionId, weights, details };

      try {
        const result = await create_event(client, params)
        return new Response(JSON.stringify(result), { status: 200 });
      } catch (error) {
        return new Response("Error fetching data", { status: 500 });
      }
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