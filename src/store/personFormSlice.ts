import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../../types/person.type";

export interface PersonFormState {
  formData: Omit<Person, "id">;
  editingId: string | null;
  isModalOpen: boolean;
}

const getInitialFormData = (): Omit<Person, "id"> => ({
  prefix: "",
  firstName: "",
  lastName: "",
  birthday: "",
  phone: "",
  phoneCode: "",
  address: "",
  citizenId: "",
  gender: "",
  passportNumber: "",
  nationality: "",
  expectedSalary: null,
});

const initialState: PersonFormState = {
  formData: getInitialFormData(),
  editingId: null,
  isModalOpen: false,
};

export const personFormSlice = createSlice({
  name: "personForm",
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.formData = getInitialFormData();
      state.editingId = null;
      state.isModalOpen = true;
    },
    openEditModal: (state, action: PayloadAction<Person>) => {
      const { id, ...formData } = action.payload;
      state.formData = formData;
      state.editingId = id;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.formData = getInitialFormData();
      state.editingId = null;
    },
    updateFormData: (
      state,
      action: PayloadAction<Partial<Omit<Person, "id">>>,
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { openAddModal, openEditModal, closeModal, updateFormData } =
  personFormSlice.actions;
export default personFormSlice.reducer;
