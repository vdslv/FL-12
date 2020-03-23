const rootDiv = document.getElementById('root');
const allEmployees = document.getElementById('all-employees');
const allPools = document.getElementById('all-pools');
const warningEmployees = document.getElementById('warning-employees');

async function request() {
    const req = await fetch('mock.json');
    const jsonResp = await req.json();
    const employees = await jsonResp;
    return employees;
}

class Model {
    constructor({ id, rm_id, name, performance, salary, last_vacation_date, pool_name = '' }) {
        this.id = id;
        this.rm_id = rm_id;
        this.name = name;
        this.performance = performance;
        this.salary = salary;
        this.last_vacation_date = last_vacation_date;
        this.pool_name = pool_name;
    }
}

class Developer extends Model {
    constructor({ id, rm_id, name, performance, salary, last_vacation_date, pool_name }) {
        super({ id, rm_id, name, performance, salary, last_vacation_date, pool_name })
    }
}

class RM extends Model {
    constructor({ id, rm_id, name, performance, salary, last_vacation_date, pool_name }) {
        super({ id, rm_id, name, performance, salary, last_vacation_date, pool_name })
        this.children = [];
    }
    add(component) {
        this.children.push(component)
    }
    isChild(arr) {
        for (let i = this.id; i < arr.length; i++) {
            if (this.id === arr[i].rm_id) {
                if (arr[i].pool_name && arr[i].pool_name.length > 2) {
                    const manager = new RM(arr[i]);
                    this.add(manager);
                    manager.isChild(arr);
                } else {
                    const developer = new Developer(arr[i]);
                    this.add(developer);
                }
            }
        }
    }
}

class Context {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    doSomeUI(arr, connector) {
        return this.strategy.do(arr, connector);
    }

}

class Strategy {
    do(data) {
        return data;
    }
}

const listOfAllObjects = document.createElement('ul');
listOfAllObjects.id = 'start';
const start = document.getElementById('start');

rootDiv.appendChild(listOfAllObjects);

class ConcreteStrategy1 extends Strategy {
    do(data, connector) {
        if (data.id === 1) {
            const kakashka = document.createElement('li');
            const spanchuk = document.createElement('span');
            kakashka.appendChild(spanchuk);
            kakashka.id = 'employees';
            spanchuk.style.color = 'blue';
            spanchuk.innerHTML = `${data.name}`;
            const childrenUl = document.createElement('ul');
            kakashka.appendChild(childrenUl);
            connector.appendChild(kakashka);
            this.loopChildren(data, childrenUl)
        } else {
            const childrenUl = document.createElement('ul');
            connector.appendChild(childrenUl);
            this.loopChildren(data, childrenUl)
        }
    }
    loopChildren(data, childrenUl) {
        for (const dev of data.children) {
            if (dev instanceof RM) {
                const child = document.createElement('li');
                const spanchuk = document.createElement('span');
                spanchuk.style.color = 'blue';
                child.appendChild(spanchuk);
                spanchuk.innerHTML = `${dev.name}`;
                childrenUl.appendChild(child);
                this.do(dev, child);
            } else {
                const child = document.createElement('li');
                const spanchuk = document.createElement('span');
                spanchuk.innerHTML = `${dev.name}`;
                child.appendChild(spanchuk);
                childrenUl.appendChild(child);
            }
        }
    }
}

class ConcreteStrategy2 extends Strategy {
    do(data, connector) {
        if (data.id === 1) {
            let sum = 0;
            for (const child of data.children) {
                sum += child.salary;
            }
            sum = Math.round(sum / data.children.length);
            const kakashka = document.createElement('li');
            kakashka.id = 'pools';
            const spanchuk = document.createElement('span');
            kakashka.appendChild(spanchuk);
            spanchuk.style.color = 'blue';
            spanchuk.innerHTML = `${data.pool_name}`;
            const childrenUl = document.createElement('ul');
            kakashka.appendChild(childrenUl);
            connector.appendChild(kakashka);
            this.loopChildren(data, childrenUl);
            spanchuk.innerHTML = `${data.pool_name} average salary: ${sum}`;
        } else {
            const childrenUl = document.createElement('ul');
            connector.appendChild(childrenUl);
            this.loopChildren(data, childrenUl);
        }
    }
    loopChildren(data, childrenUl) {
        for (const dev of data.children) {
            if (dev instanceof RM) {
                let sum = 0;
                for (const child of dev.children) {
                    sum += child.salary;
                }
                sum = Math.round(sum / dev.children.length);
                const child = document.createElement('li');
                const spanchuk = document.createElement('span');
                spanchuk.style.color = 'blue';
                child.appendChild(spanchuk);
                spanchuk.innerHTML = `${dev.pool_name} average salary: ${sum}`
                childrenUl.appendChild(child);
                this.do(dev, child);
            }
        }
    }
}

class ConcreteStrategy3 extends Strategy {
    do(data, connector) {
        if (data.id === 1) {
            const mainDIV = document.createElement('div');
            mainDIV.id = 'crazy';
            let sum = 0;
            for (const child of data.children) {
                sum += child.salary;
            }
            sum = Math.round(sum / data.children.length);
            connector.appendChild(mainDIV);
            this.loopChildren(data, mainDIV);
        } else {
            this.loopChildren(data, connector);
        }
    }
    loopChildren(data, connector) {
        let sum = 0;
        for (const dev of data.children) {
            sum += dev.salary;
            if (dev instanceof RM) {
                this.do(dev, connector);
            }
        }
        sum = Math.round(sum / data.children.length);
        data.children.forEach((el, i) => {
            if (el.salary > sum && el.performance === 'low') {
                const liv = document.createElement('li');
                liv.innerHTML = `${el.name} has ${el.salary} which 
                is more then average in the pool ${sum} with ${el.performance} perfomance`;
                connector.appendChild(liv);
            }
        })
    }
}

(async function buildTree() {
    const employees = await request();
    const tree = new RM(employees[0]);
    tree.isChild(employees);
    const context = new Context(new ConcreteStrategy1());
    allEmployees.addEventListener('click', (e) => {
        location.hash = '/employees';
        context.setStrategy(new ConcreteStrategy1());
        context.doSomeUI(tree, listOfAllObjects);
    });
    allPools.addEventListener('click', (e) => {
        location.hash = '/pools';
        context.setStrategy(new ConcreteStrategy2());
        context.doSomeUI(tree, listOfAllObjects);
    });
    warningEmployees.addEventListener('click', (e) => {
        location.hash = '/crazy';
        context.setStrategy(new ConcreteStrategy3());
        context.doSomeUI(tree, listOfAllObjects);
    });
})();

window.onhashchange = () => {
    if (location.hash == '#/employees') {
        document.getElementById('pools') ? document.getElementById('pools').remove() : '';
        document.getElementById('crazy') ? document.getElementById('crazy').remove() : '';
    } else if (location.hash == '#/pools') {
        document.getElementById('crazy') ? document.getElementById('crazy').remove() : '';
        document.getElementById('employees') ? document.getElementById('employees').remove() : '';
    } else if (location.hash == '#/crazy') {
        document.getElementById('employees') ? document.getElementById('employees').remove() : '';
        document.getElementById('pools') ? document.getElementById('pools').remove() : '';
    }
};
