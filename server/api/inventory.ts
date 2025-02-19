import mock from './MOCK_DATA.json';

import type { H3Event } from 'h3'

// TODO I don't know how to manage mock data properly in Nuxt
export const inventoryData = [...mock]
export default cachedEventHandler((_event) => {
    return { hello: inventoryData }
}, {
    maxAge: 60,
    name: 'get_inventory',
    getKey: (event: H3Event) => event.path
});