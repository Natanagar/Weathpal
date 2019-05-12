
const example = {AED: 4.127033, AFN: 87.918345, ALL: 123.370417, AMD: 541.743193, ANG: 2.106551}
export const arrayFromData = data => {
    const result = Object.keys(data).map(item => item)
}
console.log(arrayFromData(example))