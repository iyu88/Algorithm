function solution(arr1, arr2) {
    arr1.forEach((el, index) => {
        el.forEach((el2, index2) => {
            arr2[index][index2] += el2;
        })
    })
    return arr2;
}
