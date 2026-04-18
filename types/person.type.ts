export interface Person {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  phone: string;
  phoneCode: string;
  address: string;
  birthday: string | null;
  nationality: string;
  citizenId: string;
  gender: number | string;
  passportNumber: string;
  expectedSalary: number | null;
}

export interface PersonsState {
  persons: Person[];
}
