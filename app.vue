<script setup lang="ts">
import Card from './components/Card/Card.vue';
import AddItemCard from './components/Card/AddItemCard.vue';
import { useIntervalFn } from '@vueuse/core'

const nuxtApp = useNuxtApp()

const { data, error, refresh } = await useFetch('/api/inventory', {
  headers: {
    Accept: 'application/json'
  },
  getCachedData(key) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (!data) return

    const expirationDate = new Date(data.fetchedAt)
    expirationDate.setTime(expirationDate.getTime() + 10 * 1000)
    const isExpired = expirationDate.getTime() < Date.now()
    if (isExpired) return

    return data
  },
})

if (!data.value || error) {
  if (error) {
    console.error(error?.value?.name, error?.value?.message)
  }
  await refresh()
} else {
  // The data was cached, so use it
  console.log('Using cached data:', data.value)
}

useIntervalFn(() => {
  console.log(`refreshing the data again ${new Date().toISOString()}`)
  refresh()
}, 10000)
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="w-full my-5">
      <div class="text-center mx-auto inset-x-0 bottom-0 z-10 bg-white border-t shadow-xl p-3">
        <div class="mb-10">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Inventory
          </h1>
        </div>

        <div class="mb-4 text-lg font-semibold text-gray-700">
          Filters (search for name, order by name, last updated, quantity, edited by...) would be nice
        </div>

        <div class="flex justify-center space-x-4">
          <div>
            <div v-if="!data" class="text-gray-500">Loading...</div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
              <AddItemCard />
              <div v-for="item in data.hello" :key="item.id">
                <Card :item="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
