import {defineStore} from 'pinia'
import {reactive} from 'vue'

export const useRoomStore = defineStore('roomAllocator', {
    state: () => ({
        initialPeople: [
            { name: 'Matt', order: 0 },
            { name: 'Mer', order: 1 },
            { name: 'Shayna', order: 2 },
            { name: 'Tommy', order: 3 },
            { name: 'Sarah', order: 4 },
            { name: 'Michael', order: 5 },
            { name: 'Robby', order: 6 },
            { name: 'Grace', order: 7 },
            { name: 'Ryan', order: 8 },
            { name: 'Kat', order: 9 },
            { name: 'Ben', order: 10 },
            { name: 'Rachel', order: 11 },
            { name: 'Emma', order: 12 },
            { name: 'Eric W', order: 13 },
            { name: 'Eric K', order: 14 },
            { name: 'Lexi', order: 15 }
        ],
        people: reactive([
            { name: 'Matt', order: 0 },
            { name: 'Mer', order: 1 },
            { name: 'Shayna', order: 2 },
            { name: 'Tommy', order: 3 },
            { name: 'Sarah', order: 4 },
            { name: 'Michael', order: 5 },
            { name: 'Robby', order: 6 },
            { name: 'Grace', order: 7 },
            { name: 'Ryan', order: 8 },
            { name: 'Kat', order: 9 },
            { name: 'Ben', order: 10 },
            { name: 'Rachel', order: 11 },
            { name: 'Emma', order: 12 },
            { name: 'Eric W', order: 13 },
            { name: 'Eric K', order: 14 },
            { name: 'Lexi', order: 15 }
        ]),
        colors: {
            "shayna": "#ff7f7f",
            "tommy": "#ff7f7f",
            "sarah": "#ffbf80",
            "michael": "#ffbf80",
            "kat": "#b3e6b3",
            "ryan": "#b3e6b3",
            "robby": "#a3c2ff",
            "grace": "#a3c2ff",
            "matt": "#ff99cc",
            "mer": "#ff99cc",
            "ben": "#ffff99",
            "rachel": "#ffff99",
            "default": "#e5e7eb"
        },
        floors: reactive([
            {
                id: 1,
                name: '1st Floor',
                rooms: [
                    {
                        id: 1,
                        name: 'King Bedroom',
                        beds: [
                            {id: 1, occupant: null},
                            {id: 2, occupant: null},
                        ],
                    },
                    {
                        id: 2,
                        name: 'Queen Bedroom',
                        beds: [
                            {id: 3, occupant: null},
                            {id: 4, occupant: null},
                        ],
                    },
                ],
            },
            {
                id: 2,
                name: '2nd Floor',
                rooms: [
                    {
                        id: 3,
                        name: "Queen Bedroom (Will's Room)",
                        beds: [
                            {id: 5, occupant: null},
                            {id: 6, occupant: null},
                        ],
                    },
                    {
                        id: 4,
                        name: 'Pull Out Couch',
                        beds: [
                            {id: 7, occupant: null},
                            {id: 8, occupant: null},
                        ],
                    },
                ],
            },
            {
                id: 3,
                name: '3rd Floor',
                rooms: [
                    {
                        id: 5,
                        name: 'King Bedroom',
                        beds: [
                            {id: 9, occupant: null},
                            {id: 10, occupant: null},
                        ],
                    },
                    {
                        id: 6,
                        name: 'Double Twin Bedroom',
                        beds: [
                            {id: 11, occupant: null},
                            {id: 12, occupant: null},
                        ],
                    },
                ],
            },
            {
                id: 4,
                name: 'Above Garage',
                rooms: [
                    {
                        id: 7,
                        name: 'Double Twin Bedroom',
                        beds: [
                            {id: 13, occupant: null},
                            {id: 14, occupant: null},
                        ],
                    },
                    {
                        id: 8,
                        name: 'Queen Murphy',
                        beds: [
                            {id: 15, occupant: null},
                            {id: 16, occupant: null},
                        ],
                    },
                ],
            },
        ]),
    }),

    actions: {
        // Log the state of the people array and perform removal
        removePerson(name) {
            console.log(`Attempting to remove ${name} from people list`, this.people)
            const index = this.people.findIndex(person => person.name === name)
            if (index !== -1) {
                this.people.splice(index, 1)
                console.log(`${name} removed. Updated people list:`, this.people)
            } else {
                console.log(`${name} not found in people list.`)
            }
        },

        addPerson(name) {
            const person = this.initialPeople.find(p => p.name === name)
            if (person && !this.people.some(p => p.name === name)) {
                this.people.push(person)
                this.people.sort((a, b) => a.order - b.order)
                console.log(`${name} added back to people list in order.`, this.people)
            }
        },

        assignPersonToBed(bed, name, sourceBedId = null) {
            console.log(`Assigning ${name} to bed ID: ${bed.id}`);

            // Unassign the person from any other bed
            this.floors.forEach((floor) => {
                floor.rooms.forEach((room) => {
                    room.beds.forEach((b) => {
                        if (b.occupant === name && b.id !== bed.id) {
                            console.log(`Unassigning ${name} from bed ID: ${b.id}`);
                            b.occupant = null;
                        }
                    });
                });
            });

            const previousOccupant = bed.occupant;
            bed.occupant = name; // Assign only the name here, not the whole person object
            this.removePerson(name);

            if (previousOccupant) {
                console.log(`Bed already occupied by ${previousOccupant}. Swapping or re-adding to people list.`);
                if (sourceBedId) {
                    const sourceBed = this.findBedById(parseInt(sourceBedId));
                    if (sourceBed) {
                        sourceBed.occupant = previousOccupant;
                        console.log(`Swapped ${previousOccupant} to bed ID: ${sourceBedId}`);
                    } else {
                        this.addPerson(previousOccupant);
                    }
                } else {
                    this.addPerson(previousOccupant);
                }
            }
        },

        unassignPersonFromBed(bed) {
            if (bed.occupant) {
                console.log(`Unassigning ${bed.occupant} from bed ID: ${bed.id}`);
                this.addPerson(bed.occupant); // Add only the name back to people list
                bed.occupant = null;
            }
        },

        findBedById(bedId) {
            for (const floor of this.floors) {
                for (const room of floor.rooms) {
                    for (const bed of room.beds) {
                        if (bed.id === bedId) {
                            return bed
                        }
                    }
                }
            }
            return null
        },

        clearAll() {
            console.log("Clearing all bed assignments and resetting people list.")
            this.people = [...this.initialPeople]
            this.floors.forEach(floor =>
                floor.rooms.forEach(room =>
                    room.beds.forEach(bed => (bed.occupant = null))
                )
            )
        },
    },

    persist: {
        enabled: false,
        strategies: [
            {
                key: 'roomAllocatorStore',
                storage: localStorage,
                paths: ['people', 'floors']
            }
        ]
    }
})
