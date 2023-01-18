console.clear()

class ListNode {
    data: any
    next: ListNode | null

    constructor(data: any) {
        this.data = data
        this.next = null
    }
}

class LinkedList {
    head: ListNode | null

    constructor() {
        this.head = null
    }

    /**
     * Adds a node to the end of the list
     * @param data The data to add to the node
     */
    add(data: any): void {
        let node = new ListNode(data)

        if (!this.head) {
            this.head = node
        } else {
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = node
        }
    }

    /**
     * Removes a node from the list
     * @param data The data to remove from the list
     * @returns True if the node was removed, false otherwise
     * @remarks If the node is not found, the list is not modified
     */
    remove(data: any): boolean {
        if (!this.head) {
            return false
        }

        if (this.head.data === data) {
            this.head = this.head.next
            return true
        }

        let current = this.head
        while (current.next) {
            if (current.next.data === data) {
                current.next = current.next.next
                return true
            }
            current = current.next
        }
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
    }
}

let list = new LinkedList()
list.add(1)
list.add(2)
list.add(3)
list.display() // prints 1, 2, 3
list.remove(2)
list.display() // prints 1, 3
