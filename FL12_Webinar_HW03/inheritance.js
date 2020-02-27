const _age = Symbol('age');
const _fullName = Symbol('fullName');
const _EMPLOYEES = Symbol('EMPLOYEES');

class Employee {
    constructor({id, firstName, lastName, birthday, salary, position, department}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.salary = salary;
        this.position = position;
        this.department = department;
        this[_age] = (function () {
            const res = new Date(new Date().getTime() - Date.parse(birthday));
            return res.getFullYear() - 1970;
        })();
        this[_fullName] = `${this.firstName} ${this.lastName}`;
        Employee[_EMPLOYEES].push(this);
    }
    static [_EMPLOYEES] = [];

    static get EMPLOYEES() {
        return this[_EMPLOYEES];
    }

    get fullName() {
        return this[_fullName];
    }

    get age() {
        return this[_age];
    }

    quit() {
        Employee.EMPLOYEES.splice(Employee.EMPLOYEES.indexOf(this), 1);
    }

    retire() {
        console.log(`It was such a pleasure to work with you!`);
        this.quit();
    }

    getFired() {
        console.log(`Not a big deal!`);
        this.quit();
    }

    changeDepartment(newDepartment) {
        this.department = newDepartment;
    }

    changePosition(newPosition) {
        this.position = newPosition;
    }

    changeSalary(newSalary) {
        this.salary = newSalary;
    }

    getPromoted(benefits) {
        if (benefits) {
            if (benefits.salary) {
                this.changeSalary(benefits.salary)
            }
            if (benefits.position) {
                this.changePosition(benefits.position)
            }
            if (benefits.department) {
                this.changeDepartment(benefits.department)
            }
            console.log('Yoohooo!');
        }
    }

    getDemoted(punishment) {
        if (punishment) {
            if (punishment.salary) {
                this.changeSalary(punishment.salary)
            }
            if (punishment.position) {
                this.changePosition(punishment.position)
            }
            if (punishment.department) {
                this.changeDepartment(punishment.department)
            }
            console.log('Damn!');
        }
    }
}

const _managedEmployees = Symbol('managedEmployees');

class Manager extends Employee {
    constructor({id, firstName, lastName, birthday, salary, department}) {
        super({id, firstName, lastName, birthday, salary, department});
        this.position = 'manager';
        this[_managedEmployees] = () => {
            const result = [];
            for (const el of Employee.EMPLOYEES) {
                if (el.department === this.department && el.position !== 'manager') {
                    result.push(el);
                }
            }
            return result;
        };
    }

    get managedEmployees() {
        return this[_managedEmployees]();
    }
}

class BlueCollarWorker extends Employee {
    constructor({id, firstName, lastName, birthday, salary, position, department}) {
        super({id, firstName, lastName, birthday, salary, position, department});
    }
}

class HRManager extends Manager {
    constructor({id, firstName, lastName, birthday, salary}) {
        super({id, firstName, lastName, birthday, salary});
        this.department = 'hr';
    }
}

class SalesManager extends Manager {
    constructor({id, firstName, lastName, birthday, salary}) {
        super({id, firstName, lastName, birthday, salary});
        this.department = 'sales';
    }
}

const promoter = () => ({
    promote(id, salary) {
        for (const employee of this.managedEmployees) {
            if(employee.id === id) {
                employee.salary = salary;
                console.log('Yoohooo!');
            }
        }
    }
});

function ManagerPro(manager, promo) {
    if (manager instanceof Manager) {
        return Object.assign(manager, promo());
    }
}

const petro = new Manager({id: 1, firstName: 'Petro', lastName: 'Petrovich',birthday: '11/11/1999', salary: 33, department: 'hr'});
const oleg = new Employee({id: 2, firstName: 'Oleg', lastName: 'Petrovich',birthday: '11/11/1999', salary: 33, department: 'hr', position: 'gavno'});
