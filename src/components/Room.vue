<template>
  <div v-if="room" class="room mb-4">
    <h4 class="text-md font-medium mb-2">{{ room.name }}</h4>
    <div class="flex flex-wrap gap-2">
      <Bed
          v-for="(bed, index) in room.beds"
          :key="bed.id"
          :bedId="bed.id"
      />
    </div>
  </div>
  <div v-else>
    <p class="text-red-500">Room not found</p>
  </div>
</template>


<script setup>
import { defineProps, computed } from 'vue'
import Bed from './Bed.vue'
import { useRoomStore } from '../stores/roomAllocator'

const props = defineProps({
  roomId: Number,
})

const roomStore = useRoomStore()

const room = computed(() => {
  console.log('Searching for room with ID:', props.roomId)
  for (const floor of roomStore.floors) {
    for (const r of floor.rooms) {
      console.log('Checking room:', r.id, r.name)
      if (r.id === props.roomId) {
        console.log('Found room:', r)
        return r
      }
    }
  }
  console.warn('Room not found for ID:', props.roomId)
  return null
})
</script>

