import { createSlice } from '@reduxjs/toolkit';


export const tagSelectionSlice = createSlice({
  name: 'tagSelection',
  initialState: {},
  reducers: {
    closeTagSelection() {
      const dialog = document.querySelector('.tag-list__dialog') as HTMLDialogElement;
      dialog?.close();
    },
    openTagSelection() {
      const dialog = document.querySelector('.tag-list__dialog') as HTMLDialogElement;
      dialog?.show();
    },
    toggleTagSelection() {
      const dialog = document.querySelector('.tag-list__dialog') as HTMLDialogElement;
      dialog?.toggleAttribute('open');
    },
  },
});

export const { closeTagSelection, openTagSelection, toggleTagSelection } = tagSelectionSlice.actions;
export default tagSelectionSlice.reducer;
