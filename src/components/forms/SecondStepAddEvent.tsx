import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import type {FirstStepData} from './FirstStepAddEvent'
import type { RootState } from '../../app/store'

import { useSelector, useDispatch } from 'react-redux'

import {setSecondStepForm,nextStepForm} from '../../features/event/eventSlice'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

//validation de donner pour ce formulaire
const  validationSecondStepSchema=z.object({
    programmeName:z.string().nonempty('Veuillez selectionner une valeur') ,
    typeOfDate:z.string().nonempty('Veuillez selectionner une valeur'),
    seanceWeekNumber:z.string().nonempty('veuillez répondre à cette question'),
})
const SecondStepAddEvent = () => {
  
const dataStat=useSelector((state:RootState)=>state.eventReducer)
const formData=useSelector((state:RootState)=>state.eventReducer)
const {register,handleSubmit,setValue,formState:{errors}}=useForm({defaultValues:{ ...formData.secondStep},resolver:zodResolver(validationSecondStepSchema)})
console.log('rerender')
const dispatch=useDispatch()
    const rooms=[
        {name:'Fitness Park'},
        {name:'Gym Grenoble'},
     
    ]
    const allOptionsOffer=rooms.map((e)=>{
        return (<option value={e.name} key={e.name}>{e.name}</option>)
    })

  //function to submit data
  function saveSecondStepForm(data:typeof formData['secondStep']){
    // nextStep()
   
    dispatch(setSecondStepForm(data))
   dispatch(nextStepForm())
}

useEffect(()=>{
if(formData.firstStep.affiliateGym=='false'){
   
    {/**
 //ca marche parce que quand on reviens en arriere 
    //le formulaire est enlever du dom donc defaultValue=celle du state
    //quand on reviens si ça change à oui pour salle partenaire

    en reviens à ce composant donc en fetch par rapport au stats
    si non bah c'est classique pas mal finalement
    je m'attendais pas à ce comportement

*/}
    setValue('programmeName','classique')
}

else if(formData.firstStep.affiliateGym=='true'&&formData.secondStep.programmeName=='')
{

    /**
     * cela me permet de checker si ya pas de valeurs
     * dans le state si ya pas je met à : '" "
     * si c'est en mode auto pour le first render
     * ca permet de reinitialiser l'option quand en change si on avais 
     * pas sauvegarder de valeur dans redux
     */
    setValue('programmeName','')
}
},[formData])

    return (
    <section className='w-full flex flex-col bg-white'>
        <form  onSubmit={handleSubmit(saveSecondStepForm)}
        className='flex flex-col gap-4'>
<label  className="text-xs font-bold text-slate-900">{formData.firstStep.affiliateGym=='false'? 'Le format classique a été sélectionner' : 'Selectionner votre salle'} </label>
<select {...register('programmeName')} 
 defaultValue={formData.firstStep.affiliateGym=='false'? 'classique' : '' }
disabled={formData.firstStep.affiliateGym=='false'? true : false }
 

placeholder="ajouter des infos"  
className="pl-3 text-lg  rounded-md  bg-slate-50  t border-slate-400" >



<option value={''}>selectionner une valeur</option>

{formData.firstStep.affiliateGym=='false'? <option value={'classique'}>classique</option> 
: allOptionsOffer }

</select>


<p className='text-xs font-semibold text-red-500'>{errors?.programmeName?.message}</p>


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
    <option value={'manualy'}>Manuelement</option>
    <option value={'auto'}> Automatique</option>
</select>
<p className='text-xs font-semibold text-red-500'>{errors?.typeOfDate?.message}</p>

 <button type='submit'
         
         className='bg-slate-800 px-6 py-3  font-semibold self-center rounded-xl text-slate-50  max-w-fit'
     >Suivant</button>
        </form>
       
   
    </section>
  )
}
export default SecondStepAddEvent