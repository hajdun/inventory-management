import type { H3Event } from 'h3'
import { inventoryData } from './MOCK_DATA';

// TODO I don't know how to manage mock data properly in Nuxt
export default cachedEventHandler((_event) => {
    return { hello: inventoryData }
}, {
    maxAge: 60,
    name: 'get_inventory',
    getKey: (event: H3Event) => event.path
});