function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const deepClone = (list: any, map = new WeakMap()) => {
    //判断传进来的list是否为引用类型数据
    if (list && typeof list === 'object') {
        //通过list的constructor来指定cloneList的类型
        const cloneList = list.constructor === Array ? [] : {}
        //如果是Date，RegExp类型直接返回
        if (list instanceof Date) return new Date(list)
        if (list instanceof RegExp) return new RegExp(list)
        //如果传进来的list已经存在于map中直接返回对应的value
        if (map.has(list)) {
            return map.get(list)
        }
        //保存每个list key
        map.set(list, cloneList)
        for (const key in list) {
            //不循环原型上的key
            if (Object.hasOwnProperty.call(list, key)) {
                //每个key值等于deepClone的函数返回值，把新的map作为参数传递
                cloneList[key] = deepClone(list[key], map)
            }
        }
        return cloneList
    } else {
        //值类型直接返回
        return list
    }
}
export { getRandomNumber, deepClone }
