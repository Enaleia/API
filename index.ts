import { createDirectus, rest } from '@directus/sdk';
import { get_actions } from './routes/actions/get_actions';
import { get_collectors } from './routes/collectors/get_collectors';
import { get_materials } from './routes/materials/get_materials';
import { create_event } from './routes/events/create_event';
import { get_events } from './routes/events/get_events';
import { get_actions_and_materials_for_role } from './business_logic/get_actions_and_materials_for_role';

const client = createDirectus('https://enaleia.directus.app').with(rest());

Bun.serve({
  fetch: async (req) => {
    const url = new URL(req.url);
    
    if (url.pathname === "/v1") {
      return new Response("All directus data - V1");
    }
    
    if (url.pathname === "/v1/boats") {
      return new Response("All Boats data!");
    }
    
    if (url.pathname === "/v1/create_event") {
      const body = await req.json(); // Ensure to parse the request body
      if (!body) {
        return new Response("Invalid request body", { status: 400 });
      }
      const { role, actionId, weights, details }: { role: any, actionId: string, weights: any, details: any } = body;
      
      const params = { role, actionId, weights, details };

      try {
        const result = await create_event(client, params)
        return new Response(JSON.stringify(result), { status: 201 });
      } catch (error) {
        return new Response("Error creating item", { status: 500 });
      }
    }

    if (url.pathname === "/v1/actions") {
      const roleId = url.searchParams.get("roleId"); // Get roleId from query parameters
      
      try {
        const result = await get_actions(client, roleId);
        return new Response(JSON.stringify(result), { status: 200 });
      } catch (error) {
        return new Response("Error fetching data", { status: 500 });
      }
    }

    if (url.pathname === "/v1/events") {
      const eventId = url.searchParams.get("eventId"); // Get roleId from query parameters
      
      try {
        const result = await get_events(client, eventId);
        return new Response(JSON.stringify(result), { status: 200 });
      } catch (error) {
        return new Response("Error fetching data", { status: 500 });
      }
    }

    if (url.pathname === "/v1/materials") {
      const roleId = url.searchParams.get("roleId"); // Get roleId from query parameters
      
      try {
        const result = await get_materials(client, roleId);
        return new Response(JSON.stringify(result), { status: 200 });
      } catch (error) {
        return new Response("Error fetching data", { status: 500 });
      }
    }

    if (url.pathname === "/v1/get_actions_and_materials_for_role") {
      const roleId = url.searchParams.get("roleId"); // Get roleId from query parameters
      if (!roleId) {
        return new Response("Missing roleId parameter", { status: 400 });
      }
      try {
        const result = await get_actions_and_materials_for_role(client, roleId);
        return new Response(JSON.stringify(result), { status: 200 });
      } catch (error) {
        return new Response("Error fetching data", { status: 500 });
      }
    }

    if (url.pathname === "/v1/collectors") {
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