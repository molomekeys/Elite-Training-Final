import { useContext, useEffect } from 'react'
import {useForm} from 'react-hook-form'

import type { RootState } from '../../app/store'

import { useSelector, useDispatch } from 'react-redux'

import {setSecondStepForm,nextStepForm} from '../../features/event/eventSlice'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddEventContext } from '../fonctionality/AddEvent'

//validation de donner pour ce formulaire
const  validationSecondStepSchema=z.object({
    programmeName:z.string().nonempty('Veuillez selectionner une valeur') ,
    typeOfDate:z.string().nonempty('Veuillez selectionner une valeur'),
    seanceWeekNumber:z.string().nonempty('veuillez répondre à cette question'),
})
//pour le programme
const  validationSecondProgramme=z.object({
    programmeName:z.string().nonempty('Veuillez selectionner une valeur') ,
    typeOfDate:z.string(),
    seanceWeekNumber:z.string()
})



const SecondStepAddEvent = () => {
  
const {firstStep,secondStep}=useSelector((state:RootState)=>state.eventReducer)
const {allOffert}=useContext(AddEventContext)
const {register,handleSubmit,setValue,formState:{errors}}=useForm({defaultValues:{ ...secondStep},
    resolver:zodResolver(firstStep.productCategory=='programme'? validationSecondProgramme:validationSecondStepSchema)})
console.log('rerender')
const dispatch=useDispatch()
   
    const allOptionsOffer=allOffert.map((e)=>{
        return (<option value={e.id} key={e.id}>{e.room_name}</option>)
    })

  //function to submit data
  function saveSecondStepForm(data:typeof secondStep){
    // nextStep()
   
    dispatch(setSecondStepForm(data))
   dispatch(nextStepForm())
}



    return (
    <section className='w-full flex flex-col bg-white'>
        <form  onSubmit={handleSubmit(saveSecondStepForm)}
        className='flex flex-col gap-4'>
<label  className="text-xs font-bold text-slate-900">{ 'Selectionner votre salle'} </label>
<select {...register('programmeName')} 
 

 

placeholder="ajouter des infos"  
className="pl-3 text-lg  rounded-md  bg-slate-50  t border-slate-400" >



<option value={''}>selectionner une valeur</option>

{ allOptionsOffer }

</select>


<p className='text-xs font-semibold text-red-500'>{errors?.programmeName?.message}</p>


{firstStep.productCategory=='coaching'&&
    <>
 
    <label className="text-xs font-bold text-slate-900">Selectionner le nombre de séance </label>

<select  placeholder="ajouter des infos"   {...register('seanceWeekNumber')}
className=" pl-3 text-lg  rounded-md  bg-slate-50 t border-slate-400 " >
     <option value={''}>Selectionner une valeur</option>
    <option value={'1'}>1 fois par semaine</option>
    <option value={'2'}> 2 fois par semaine</option>
    <option value={'3'}> 3 fois par semaine</option>

</select>
<p className='text-xs font-semibold text-red-500'>{errors?.seanceWeekNumber?.message}</p>

<label className="text-xs font-bold text-slate-900">Choix des dates</label>

<select   {...register('typeOfDate')}
 placeholder="ajouter des infos"  
className=" pl-3 text-lg  rounded-md  bg-slate-50 t border-slate-400 " >
    <option value={''}>Selectionner une valeur</option>
    <option value={'manualy'}>Manuellement
</option>
    <option value={'auto'}> Automatique</option>
</select>
<p className='text-xs font-semibold text-red-500'>{errors?.typeOfDate?.message}</p>
</>
}

 <button type='submit'
         
         className='bg-slate-800 px-6 py-3  font-semibold self-center rounded-xl text-slate-50  max-w-fit'
     >Suivant</button>
        </form>
       
   
    </section>
  )
}
export default SecondStepAddEvent