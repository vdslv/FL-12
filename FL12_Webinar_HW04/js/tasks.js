function maxElement(array) {
    return Math.max(...array);
}

function copyArray(array) {
    return [...array];
}

let i = 0;
function addUniqueId(obj) {
    let id = Symbol('id');
    i++;
    return {...obj, [id.description]: i}
}

function regroupObject(obj) {
    let {name, details: {id, age, university}} = obj;
    return {university: university, user: {age, firstName: name, id}};
}

function findUniqueElements(array) {
    return [...new Set(array)];
}

function hideNumber(strNumber) {
    const lastDigits = strNumber.slice(strNumber.length - 4);
    return lastDigits.padStart(strNumber.length, '*');
}


function requiredArg() {
    throw new Error('Missing property');
}

function add(a = requiredArg(), b = requiredArg()) {
    return a + b;
}

function usePromise(url) {
    fetch(url)
        .then(response => response.json())
        .then(value => value.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1
            } else {
                return 0
            }
        }))
        .then(res => {
            return res.map(el => el.name)
        })
        .then(result => console.log(result))
}

async function useAsync(url) {
    const request = await fetch(url);
    const getJson = await request.json();
    const sortByName = await getJson.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1
        } else {
            return 0
        }
    });
    const getName = await sortByName.map(el => el.name);
    console.log(getName);
}
