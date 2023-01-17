console.clear()

class HashTable {
    private table: Array<Array<any>>

    constructor(size: number) {
        this.table = new Array(size)
    }

    private hash(key: string): number {
        let hash = 0
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.table.length
        }
        return hash
    }

    set(key: string, value: any): void {
        const position = this.hash(key)
        if (!this.table[position]) {
            this.table[position] = []
        }
        this.table[position].push([key, value])
    }
    
    get(key: string): void {
        const position = this.hash(key)
        const currentBucket = this.table[position]
        if (currentBucket) {
            for (let i = 0; i < currentBucket.length; i++) {
                if (currentBucket[i][0] === key) {
                    return currentBucket[i][1]
                }
            }
        }
        return undefined
    }

    printBuckets(): void {
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i]) {
                console.log(i, ...this.table[i])
            }
        }
    }
}

const hashTable = new HashTable(50)
hashTable.set('grapes', 8)
hashTable.set('apples', 4)
hashTable.set('oranges', 2)
hashTable.set('bananas', 1)
hashTable.set('mangoes', 3)

hashTable.printBuckets()