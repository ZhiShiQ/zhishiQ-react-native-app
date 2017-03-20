
function run (out: string) {
    console.log(out);
}

class Person implements SayAble {
    constructor(public firstName: string, public lastName: string, protected age: number) {

    }
    get fullName() {
        return this.firstName + this.lastName
    }
    say() {
        console.log('Im Person');
    }
}

interface SayAble {
    say: Function;
}


class Student extends Person implements SayAble {
    // fullName: string;
    constructor(public firstName: string, public lastName: string, protected age: number, private score: number) {
        super(firstName, lastName, age);
    }

    say() {
        console.log('Im Student');
    }
}

class Teacher extends Person implements SayAble {
    // fullName: string;
    constructor(public firstName: string, public lastName: string, protected age: number) {
        super(firstName, lastName, age);
    }

    say() {
        console.log('Im Teacher');
    }
}

function say (sayAble: SayAble) {
    sayAble.say();
}

let student: Person = new Student("Cong", "Yu", 18, 100);

console.log(student.fullName);

student.say();
