console.clear()

class MyArray {
    length: number = 0
    data: Record<number, any> = {}

    get(index: number) {
        return this.data[index]
    }

    push(item: any) {
        this.data[this.length] = item
        this.length++
        return this.length
    }

    pop() {
        const lastItem = this.data[this.length - 1]
        delete this.data[this.length - 1]
        this.length--
        return lastItem
    }

    delete(index: number) {
        const item = this.data[index]
        this.shiftItems(index)
        return item
    }

    shiftItems(index: number) {
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1]
        }
        delete this.data[this.length - 1]
        this.length--
    }

    unshift(item: any) {
        for (let i = this.length; i > 0; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[0] = item
        this.length++
        return this.length
    }
}

const newArray = new MyArray()

newArray.push('hi')
newArray.push('you')
newArray.push('!')
console.log(newArray)

newArray.pop()
console.log(newArray)

newArray.delete(0)
console.log(newArray)

newArray.unshift('are')
console.log(newArray)
