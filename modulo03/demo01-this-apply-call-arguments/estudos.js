'use-strict';

class Person {
    apresentantion(person_name) {
        this.namePerson(person_name)
    }
    namePerson(person_name) {
        console.log(`Please ${person_name}, can you say your age?`)
    }
}

const person = new Person()
person.apresentantion("Leo")
person.apresentantion.call({namePerson: (person_name) => console.log(`Hey, How are you ${person_name}`)}, "Luiz")
person.apresentantion.apply({namePerson: (person_name) => console.log(`Wow, How are you ${person_name}`)}, ["Silva"])