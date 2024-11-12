<!-- src/components/Floor.vue -->
<template>
  <div class="w-full md:w-[48%] p-4 bg-gray-100 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4">{{ floor.name }}</h3>
    <Room
        v-for="(room, roomIndex) in floor.rooms"
        :key="room.id"
        :roomId="room.id"
        :room="room"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Room from './Room.vue'

const props = defineProps({
  floor: Object,
})
</script>
