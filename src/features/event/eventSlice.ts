import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FirstStepState{
    title:string
    clientId:string
    affiliateGym:string
  productCategory:string

}
export interface SecondStepType{
    programmeName:string 
    typeOfDate:string 
    seanceWeekNumber:string
}

export interface EventFormState {
  
    secondStep:SecondStepType
  firstStep:FirstStepState
  stepForm:number
}

const initialState: EventFormState = 
    {secondStep:{ programmeName:'',
     
    typeOfDate:'',seanceWeekNumber:'1'},
    firstStep:{title:'',clientId:'',affiliateGym:'',
    productCategory:''},stepForm:1
}


export const eventSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setFirstStepForm: (state,action:PayloadAction<FirstStepState>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

     state.firstStep=action.payload
    },
    setSecondStepForm: (state,action:PayloadAction<SecondStepType>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

     state.secondStep=action.payload
    },
    decrement: (state) => {
      
    },
    nextStepForm:(state)=>{
        if(state.stepForm>=5)
        {
            state.stepForm
        }

        state.stepForm+=1
    },  backStepForm:(state)=>{
        if(state.stepForm<=1)
        {
            state.stepForm
        }
        
        state.stepForm-=1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
     
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFirstStepForm ,setSecondStepForm,backStepForm,nextStepForm} = eventSlice.actions

export default eventSlice.reducer