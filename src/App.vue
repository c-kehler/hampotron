<!-- src/App.vue -->
<template>
  <div id="app" class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-6">Hamponator 500</h1>
    <PeopleList />
    <div id="rooms">
      <h2 class="text-2xl font-semibold mt-8 mb-4">Rooms</h2>
      <div id="floors-container" class="flex flex-wrap gap-4">
        <Floor
            v-for="(floor, index) in roomStore.floors"
            :key="index"
            :floor="floor"
        />

      </div>
      <button
          @click="clearAll"
          class="my-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear All
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoomStore } from './stores/roomAllocator'
import PeopleList from './components/PeopleList.vue'
import Floor from './components/Floor.vue'

const roomStore = useRoomStore()
const clearAll = () => {
  roomStore.clearAll()
}
</script>
