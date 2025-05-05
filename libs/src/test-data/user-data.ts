export interface UserData {
    firstName: string;
    lastName: string;
    birthdate: string;
    email: string;
    password: string;
    address: string;
    postalCode: string;
    city: string;
}

export class TestData {
    userWithCorrectData: UserData;
    userWithFalseName: UserData;
    userWithFalseLastName: UserData;
    userWithFalseEmail: UserData;

    constructor() {
        const userDataCommon: UserData = {
            firstName: 'Anna',
            lastName: 'Smith',
            birthdate: '12/12/1990',
            email: 'annasmith@gmail.com',
            password: 'strongpassword123',
            address: 'Banksy St',
            postalCode: '11107',
            city: 'Paris',
        };
        this.userWithCorrectData = { ...userDataCommon };
        this.userWithFalseName = {
            ...userDataCommon,
            firstName: 'Anna666',
        };
        this.userWithFalseLastName = {
            ...userDataCommon,
            lastName: 'Martinez%',
        };
        this.userWithFalseEmail = {
            ...userDataCommon,
            email: 'annagmail.com',
        }
    }
}