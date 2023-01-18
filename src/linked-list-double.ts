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
            return
        }
        
        let current = this.head
        while (current.next) {
            current = current.next
        }
        current.next = node
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

        // remove head
        if (this.head.data === data) {
            this.head = this.head.next
            console.log('LOG: Removed head')
            return true
        }

        // remove from middle or end
        let current = this.head
        while (current.next) {
            if (current.next.data === data) {
                current.next = current.next.next
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
        console.log('----------------------------------')
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
            if (current.data === data) {
                console.log('LOG: Node found')
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
        while (current) {
            next = current.next
            current.next = prev
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

list.remove({
    id: 4234,
    name: 'John',
})
list.display()

list.find({
    id: 3,
    name: 'Joe',
})

list.reverse()
list.display()

for (let user of list) {
    console.log('Iterator:', user)
}
