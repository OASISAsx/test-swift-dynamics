import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface PersonsState {
  persons: Person[];
}

const loadPersonsFromLocalStorage = (): Person[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("persons");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const savePersonsToLocalStorage = (persons: Person[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("persons", JSON.stringify(persons));
  }
};

const initialState: PersonsState = {
  persons: [],
};

export const personsSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.persons.push(action.payload);
      savePersonsToLocalStorage(state.persons);
    },

    updatePerson: (state, action: PayloadAction<Person>) => {
      const index = state.persons.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.persons[index] = action.payload;
        savePersonsToLocalStorage(state.persons);
      }
    },

    deletePerson: (state, action: PayloadAction<string>) => {
      state.persons = state.persons.filter((p) => p.id !== action.payload);
      savePersonsToLocalStorage(state.persons);
    },

    deleteMultiplePersons: (state, action: PayloadAction<React.Key[]>) => {
      state.persons = state.persons.filter(
        (p) => !action.payload.includes(p.id),
      );
      savePersonsToLocalStorage(state.persons);
    },

    setPersons: (state, action: PayloadAction<Person[]>) => {
      state.persons = action.payload;
      savePersonsToLocalStorage(state.persons);
    },

    loadPersons: (state) => {
      const data = loadPersonsFromLocalStorage();

      state.persons = Array.isArray(data) ? data.reverse() : [];
    },
  },
});

export const {
  addPerson,
  updatePerson,
  deletePerson,
  setPersons,
  loadPersons,
  deleteMultiplePersons,
} = personsSlice.actions;
export default personsSlice.reducer;
