import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from "../../../app/store";
import {User} from "../../../shared/libs/types/User.type";
import {
	getSpecialists as getSpecialistsRequest,
} from "../../../shared/api/rest/specialists/getSpecialists";

export interface SpecialistState {
	users: User[];
	status: 'idle' | 'loading' | 'failed';
}

const initialState: SpecialistState = {
	users: [],
	status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const getSpecialists = createAsyncThunk(
	'specialist/getSpecialists',
	async () => {
		const response = await getSpecialistsRequest();
		// The value we return becomes the `fulfilled` action payload
		return response.data;
	}
);

export const specialistSlice = createSlice({
	name: 'specialist',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		// increment: (state) => {
		//   // Redux Toolkit allows us to write "mutating" logic in reducers. It
		//   // doesn't actually mutate the state because it uses the Immer library,
		//   // which detects changes to a "draft state" and produces a brand new
		//   // immutable state based off those changes
		//   state.value += 1;
		// },
		// decrement: (state) => {
		//   state.value -= 1;
		// },
		// // Use the PayloadAction type to declare the contents of `action.payload`
		// incrementByAmount: (state, action: PayloadAction<number>) => {
		//   state.value += action.payload;
		// },
	},
	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.
	extraReducers: (builder) => {
		builder
			.addCase(getSpecialists.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getSpecialists.fulfilled, (state, action) => {
				state.status = 'idle';
				state.users = action.payload;
			})
			.addCase(getSpecialists.rejected, (state) => {
				state.status = 'failed';
			});
	},
});

// export const { increment, decrement, incrementByAmount } = specialistSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const specialistsSelector = (state: RootState) => state.specialist.users;
export const specialistsStatusSelector = (state: RootState) => state.specialist.status;
export const specialistByIdSelector = (id: number) => createSelector([specialistsSelector], state => state.find(specialist => specialist.card.id === id)!)

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectSpecialists(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default specialistSlice.reducer;
