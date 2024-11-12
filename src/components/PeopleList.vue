<template>
  <div id="people-list" @dragover.prevent @drop="onDrop">
    <h2 class="text-xl font-semibold mb-2">People</h2>
    <div class="flex flex-wrap gap-2">
      <div
          v-for="person in roomStore.people"
          :key="person.name"
          class="px-3 py-1 rounded cursor-move"
          :style="{ backgroundColor: getColor(person.name) }"
          draggable="true"
          @dragstart="(event) => onDragStart(event, person)"
      >
        {{ person.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoomStore } from '../stores/roomAllocator'

const roomStore = useRoomStore()

const onDragStart = (event, person) => {
  console.log('Dragging person:', person.name)
  event.dataTransfer.setData('text/plain', person.name)
}

const onDrop = (event) => {
  const name = event.dataTransfer.getData('text/plain')
  console.log('Dropped name:', name)
  if (!roomStore.people.some(p => p.name === name)) {
    roomStore.addPerson(name)
  }
}

const getColor = (name) => {
  const nameKey = name.toLowerCase().replace(/\s+/g, '')
  return roomStore.colors[nameKey] || roomStore.colors.default
}
</script>
