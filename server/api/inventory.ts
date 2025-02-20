import { InventoryItem } from "~/types/Inventory";

// TODO I don't know how to manage mock data properly in Nuxt
export default cachedEventHandler(async (_event) => {
    const inventoryData = await useStorage("assets:server").getItem<InventoryItem[]>('json:foobar.json')
    return { hello: inventoryData }
});