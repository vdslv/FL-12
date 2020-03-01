const display = document.getElementById('display-out');
const list = document.getElementById('list');
const spinner = document.querySelector('.loader');
const main = document.querySelector('#main');
const editBtn = document.getElementsByClassName('edit');
const saveBtn = document.getElementsByClassName('save-btn');
const deleteBtn = document.getElementsByClassName('delete');

function getUsers() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(val => {
            return val;
        })
};

async function getUserlist() {
    spinnOn();
    const arr = await getUsers();
    const result = (arr) => {
        let out = `<h2>Users</h2>`;
        arr.forEach(elem => {
            out += `
                <li id="${elem.id}">id : ${elem.id} | Name: <a href="#post-${elem.id}" onclick="openUserPost(${elem.id})">${elem.name}</a>
                | Username: ${elem.username} |
                Email: ${elem.email} | Website: ${elem.website}
                <div class="flex-row">
                    <p class="flex-column">Address: <span>Street: ${elem.address.street}</span>
                                <span>Suite: ${elem.address.suite}</span>
                                <span>City: ${elem.address.city}</span>
                                <span>Zipcode: ${elem.address.zipcode}</span>
                                <span>Phone: ${elem.phone}</span>
                                <span>Company name: ${elem.company.name}</span>
                                <span>Company catchphrase: ${elem.company.catchPhrase}</span>
                                <span>Company bs: ${elem.company.bs}</span>
                    </p>
                    <p class="flex-column">Geo: <span>lat: ${elem.address.geo.lat}</span>
                                <span>lng: ${elem.address.geo.lng}</span>
                    </p>
                </div>
                    <button type="button" class="edit btn">Edit user</button>
                    <button class="delete btn">Delete user</button>
                 <hr>
                </li>

                `
        });
        list.innerHTML = out;
        spinnOff();
    };
    result(arr);
    editBUTTONFUNC(arr);
    deleteUser();
};

function editBUTTONFUNC(arrOfObj) {
    for (let elem of editBtn) {
        const userObj = arrOfObj[elem.parentNode.id - 1];
        let groupDIV;
        elem.addEventListener('click', function editToggleListener() {
                document.getElementById(`${userObj.id}`).innerHTML = `<div id="group-${userObj.id}" class="edit-group">
                         <label for="name">Name: <input type="text" value="${userObj.name}"></label>
                         <label for="username">Username: <input type="text" value="${userObj.username}"></label>
                         <label for="email">Email: <input type="email" value="${userObj.email}"></label>
                         <label for="website">Website: <input type="text" value="${userObj.website}"></label>
                         <label for="address_street">Street: <input type="text" value="${userObj.address.street}"></label>
                         <label for="address_suite">Suite: <input type="text" value="${userObj.address.suite}"></label>
                         <label for="address_city">City: <input type="text" value="${userObj.address.city}"></label>
                         <label for="address_zipcode">Zipcode: <input type="text" value="${userObj.address.zipcode}"></label>
                         <label for="phone">Phone: <input type="tel" value="${userObj.phone}"></label>
                         <label for="address_company_name">Company name: <input type="text" value="${userObj.company.name}"></label>
                         <label for="address_company_catchPhrase">Company catchPhrase: <input type="text" value="${userObj.company.catchPhrase}"></label>
                         <label for="address_company_bs">Company bs: <input type="text" value="${userObj.company.bs}"></label>
                         <label for="address_geo_lat">Lat: <input type="number" value="${userObj.address.geo.lat}"></label>
                         <label for="address_geo_lng">Lng: <input type="number" value="${userObj.address.geo.lng}"></label>
                         <button type="button" class="save-btn btn">Save</button>
                        </div>
                        `;
                groupDIV = document.getElementById(`group-${userObj.id}`);
                groupDIV.classList.add('display-flex');

                for (const button of saveBtn) {
                    button.addEventListener('click', () => {
                        spinnOn();
                        document.getElementById(`group-${userObj.id}`).classList.remove('display-flex');
                        document.getElementById(`group-${userObj.id}`).classList.add('display-none');
                        const editDIV = document.getElementById(`group-${userObj.id}`);
                        const allInputs = editDIV.getElementsByTagName('input');
                        const [nameValue,
                            userNameValue,
                            emailValue,
                            websiteValue,
                            streetValue,
                            suiteValue,
                            cityValue,
                            zipcodeValue,
                            phoneValue,
                            companyNameValue,
                            companyCatchPhraseValue,
                            companyBsValue,
                            latValue,
                            lngValue] = allInputs;

                        fetch(`https://jsonplaceholder.typicode.com/users/${userObj.id}`, {
                            method: 'PUT',
                            body: JSON.stringify({
                                id: userObj.id,
                                name: nameValue.value,
                                username: userNameValue.value,
                                email: emailValue.value,
                                address: {
                                    street: streetValue.value,
                                    suite: suiteValue.value,
                                    city: cityValue.value,
                                    zipcode: zipcodeValue.value,
                                    geo: {
                                        lat: latValue.value,
                                        lng: lngValue.value
                                    }
                                },
                                phone: phoneValue.value,
                                website: websiteValue.value,
                                company: {
                                    name: companyNameValue.value,
                                    catchPhrase: companyCatchPhraseValue.value,
                                    bs: companyBsValue.value
                                }
                            }),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            }
                        })
                            .then(response => response.json())
                            .then(res => {
                                console.log(res);
                                spinnOff();
                            });
                        getUserlist();
                    })
                }
            }
        )
    }
}

function openUserPost(id) {
    spinnOn();
    location.hash = `#post-${id}`;
    Promise.all([getPosts(id), getComments(id)])
        .then(([data, comments]) => {
            let comm = `<h2>COMMENTS</h2>`;
            main.innerHTML += `<div id="comments-posts">
                                <button onclick="goBack()" type="button">Back</button>
                                <h1>Posts of user ${id}</h1>
                                </div>
                                `;
            for (const el of comments) {
                comm += `<div>Post : ${el.id}
                            <h3>Title : ${el.name}</h3>
                            <p>${el.email}</p>
                            <p>${el.body}</p>
                            </div>`
            }
            for (const post of data) {
                let output = `
            <div>
                <h2>Title: ${post.title}</h2>
                <p>${post.body}</p>
            </div>
            `
                document.getElementById('comments-posts').innerHTML += output;
            }
            document.getElementById('comments-posts').innerHTML += comm;
            spinnOff()
        });
}

function goBack(e) {
    location.hash = '';
    getUserlist();
}

function getComments(id) {
    return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(response => response.json())
        .then(res => {
            return res;
        })
}

function getPosts(id) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then(response => response.json())
        .then(res => {
            return res;
        })
}

function deleteUser() {
    for (const elem of deleteBtn) {
        elem.addEventListener('click', (e) => {
            spinnOn();
            if (e.target.matches('.delete')) {
                e.target.parentNode.remove();
                const id = e.target.parentNode.id;
                fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        spinnOff()
                    });
            }
        });
    }
};

function spinnOn() {
    main.classList.remove('display-block');
    main.classList.add('display-none');
    spinner.classList.add('display-block');
};

function spinnOff() {
    spinner.classList.remove('display-block');
    main.classList.add('display-block');
};

window.onhashchange = function (e) {
    if (window.location.hash.includes('#post-')) {
        display.classList.add('display-none');
    } else {
        location.reload();
        document.getElementById('comments-posts').remove();
        display.classList.remove('display-none');
        document.getElementById('display-out').style.display = 'block';
    }
};

getUserlist();