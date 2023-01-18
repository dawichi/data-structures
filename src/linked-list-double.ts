console.clear()

/**
 * Example data to store in each node
 */
type User = {
    id: number
    name: string
}

/**
 * Single node in a linked list
 * @remarks This is a private class and should not be used directly
 */
class ListNode {
    data: User
    next: ListNode | null
    prev: ListNode | null

    constructor(data: User) {
        this.data = data
        this.next = null
        this.prev = null
    }
}

/**
 * Singly linked list
 */
export class LinkedList {
    head: ListNode | null
    tail: ListNode | null
    size: number

    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    /**
     * Adds a node to the end of the list
     * @param data The data to add to the node
     */
    add(data: User): void {
        let node = new ListNode(data)
        this.size++

        // list is empty
        if (!this.head) {
            this.head = node
            this.tail = node
            return
        }

        // add to end
        this.tail!.next = node
        node.prev = this.tail
        this.tail = node
    }

    /**
     * Removes a node from the list
     * @param data The data to remove from the list
     * @returns True if the node was removed, false otherwise
     * @remarks If the node is not found, the list is not modified
     */
    remove(data: User): boolean {
        // list is empty
        if (!this.head) {
            console.warn('WARN: List is empty, nothing to remove')
            return false
        }

        // remove tail
        if (JSON.stringify(this.tail!.data) === JSON.stringify(data)) {
            this.tail = this.tail!.prev
            this.tail!.next = null
            this.size--
            console.log('LOG: Removed tail')
            return true
        }

        // remove head
        if (JSON.stringify(this.head.data) === JSON.stringify(data)) {
            this.head = this.head.next
            this.head!.prev = null
            this.size--
            console.log('LOG: Removed head')
            return true
        }

        // remove from middle or end
        let current = this.head
        while (current.next) {
            if (JSON.stringify(current.next.data) === JSON.stringify(data)) {
                current.next = current.next.next
                current.next!.prev = current
                console.log('LOG: Removed node')
                return true
            }
            current = current.next
        }
        console.warn('WARN: Node not found, nothing to remove')
        return false
    }

    /**
     * Prints the list to the console
     * @remarks This is for debugging purposes only
     * @example list.display() // prints 1, 2, 3
     */
    display(): void {
        let current = this.head
        const data: any[] = []
        while (current) {
            data.push(current.data)
            current = current.next
        }
        console.log(data)
        console.log('Size:', this.size)
        console.log('----------------------------------')
    }

    /**
     * Finds a node in the list
     * @param data The data to find in the list
     * @returns The node if found, null otherwise
     */
    find(data: User): ListNode | null {
        let current = this.head
        while (current) {
            if (JSON.stringify(current.data) === JSON.stringify(data)) {
                console.log('LOG: Node found', JSON.stringify(data))
                return current
            }
            current = current.next
        }
        console.warn('WARN: Node not found')
        return null
    }

    /**
     * Reverses the list
     * @example 1 -> 2 -> 3 -> 4 -> 5 -> null
     * @example 5 -> 4 -> 3 -> 2 -> 1 -> null
     */
    reverse(): void {
        let current = this.head
        let prev: ListNode | null = null
        let next: ListNode | null = null

        // swap head and tail
        this.tail = this.head

        while (current) {
            next = current.next
            current.next = prev
            current.prev = next
            prev = current
            current = next
        }
        this.head = prev
    }

    /**
     * Iterator implementation
     */
    [Symbol.iterator](): Iterator<User> {
        let current = this.head
        return {
            next(): IteratorResult<User> {
                if (current) {
                    const data = current.data
                    current = current.next
                    return {
                        value: data,
                        done: false,
                    }
                }
                return {
                    value: null,
                    done: true,
                }
            },
        }
    }
}

let list = new LinkedList()
console.log('1. Add properties to the list \n')
list.add({
    id: 4234,
    name: 'John',
})
list.add({
    id: 1323,
    name: 'Jane',
})
list.add({
    id: 5435,
    name: 'Joe',
})
list.display()

console.log('2. Remove properties from the list \n')
list.remove({
    id: 4234,
    name: 'John',
})
list.display()

console.log('3. Find properties in the list \n')
list.find({
    id: 5435,
    name: 'Joe',
})

console.log('4. Reverse the list \n')
list.reverse()
list.display()

console.log('5. Iterate over the list \n')
for (let user of list) {
    console.log('Iterator:', user)
}

console.log('----------------------------------')
console.log('6. Accessing head and next properties \n')
console.log('head + 0', list.head?.data)
console.log('head + 1', list.head?.next?.data)
console.log('head + 2', list.head?.next?.next?.data)
console.log('----------------------------------')
console.log('7. Accessing tail and prev properties \n')
console.log('tail - 0', list.tail?.data)
console.log('tail - 1', list.tail?.prev?.data)
console.log('tail - 2', list.tail?.prev?.prev?.data)
console.log('----------------------------------')
