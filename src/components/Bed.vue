<template>
  <div
      class="relative w-32 h-10 border border-gray-400 mt-1 flex items-center justify-center cursor-move rounded"
      :style="{ backgroundColor: occupantColor }"
      @dragover.prevent
      @drop="onDrop"
      draggable="true"
      @dragstart="onDragStart"
  >
    <div class="pointer-events-none" v-if="bed?.occupant">{{ bed.occupant }}</div>
    <button
        v-if="bed?.occupant"
        class="absolute top-1 right-1 text-white w-5 h-5 rounded-full cursor-pointer text-sm flex items-center justify-center"
        @click.stop="clearBed"
    >
      <!-- SVG for close icon -->
      <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 14 14">
        <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l12 12M13 1L1 13"/>
      </svg>
    </button>
    <div v-else class="text-gray-500">Empty</div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useRoomStore } from '../stores/roomAllocator'

const props = defineProps({
  bedId: Number,
})

const roomStore = useRoomStore()

const bed = computed(() => {
  let foundBed = null
  roomStore.floors.some((floor) =>
      floor.rooms.some((room) =>
          room.beds.some((b) => {
            if (b.id === props.bedId) {
              foundBed = b
              return true
            }
            return false
          })
      )
  )
  return foundBed
})

// Computed property to get the occupant's color
const occupantColor = computed(() => {
  if (bed.value && bed.value.occupant) {
    const nameKey = bed.value.occupant.toLowerCase().replace(/\s+/g, '')
    return roomStore.colors[nameKey] || roomStore.colors.default
  }
  return '#e5e7eb' // default color for empty bed
})

const onDrop = (event) => {
  const name = event.dataTransfer.getData('text/plain')
  const sourceBedId = event.dataTransfer.getData('sourceBedId') || null
  console.log('Assigning to bed:', bed.value.id, 'Name:', name, 'Source Bed ID:', sourceBedId)
  roomStore.assignPersonToBed(bed.value, name, sourceBedId)
}

const clearBed = () => {
  roomStore.unassignPersonFromBed(bed.value)
}

const onDragStart = (event) => {
  if (bed.value && bed.value.occupant) {
    event.dataTransfer.setData('text/plain', bed.value.occupant)
    event.dataTransfer.setData('sourceBedId', bed.value.id.toString())
  } else {
    event.preventDefault()
  }
}
</script>
