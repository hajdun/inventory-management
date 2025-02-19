import { inventoryData } from '../inventory';


export default defineEventHandler(async (event) => {
    //  const query = getQuery(event) was empty ({}) for some reason
    const queryId = event.context.params?.id || "";

    const findItemIndexById = () => {
        return inventoryData.findIndex(invD => invD.id === queryId)
    }

    if (event.req.method === 'GET') {
        const index = findItemIndexById()
        return { found: inventoryData[index] }
    }

    if (event.req.method === 'PUT') {
        const requestBody = await readBody(event)

        const modifyAtIndex = findItemIndexById()
        const originalInventoryItem = inventoryData[modifyAtIndex]

        if (!originalInventoryItem) {

            throw createError({
                status: 404,
                statusMessage: "Bad Request, Could not find item",
            });
        }

        // CONFLICT
        if (requestBody.lastUpdated < originalInventoryItem.lastUpdated) {

            throw createError({
                status: 409,
                statusMessage: `Conflicting user input - Did not modify quantity of ${originalInventoryItem.name} at ${new Date(requestBody.lastUpdated)} as someone has a more fresh edit of ${new Date(parseInt(originalInventoryItem.lastUpdated))}. \n Please contact the system administrator`
            })
        } else {
            const originalQty = originalInventoryItem.quantity
            const newQty = parseInt(requestBody.quantity)

            inventoryData[modifyAtIndex] = { ...originalInventoryItem, quantity: newQty, lastUpdated: requestBody.lastUpdated as string }

            return {
                success: true, message: `Modified quantity of ${originalInventoryItem.name} from ${originalQty} to ${newQty} at ${new Date(requestBody.lastUpdated)}`
            };
        }
    }
    if (event.req.method === 'DELETE') {

        return { success: true };
    }
});