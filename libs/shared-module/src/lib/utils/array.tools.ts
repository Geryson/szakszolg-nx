export const removeItem = (array: any[], item: any) => {
    const index = array.indexOf(item)
    if (index > -1) {
        array.splice(index, 1)
    }
    return array
}

export const distinct = (array: any[]) => array.filter((value, index, self) => self.indexOf(value) === index)
