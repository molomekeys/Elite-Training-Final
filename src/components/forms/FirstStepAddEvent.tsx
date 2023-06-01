import {useForm} from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { setFirstStepForm ,nextStepForm} from '~/features/event/eventSlice'
import { RootState } from '~/app/store'

import {AddEventContext} from '../fonctionality/AddEvent'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
export interface FirstStepData{
    title:string 
    clientId:string 
    affiliateGym:string
    productCategory:string
}

const  validationFirstStepSchema=z.object({
    title:z.string().min(6,'Titre trop court, ce titre sera afficher à votre client') ,
    clientId:z.string().nonempty('Veuillez selectionner une valeur'),
    affiliateGym:z.string().nonempty('veuillez répondre à cette question'),
    productCategory:z.string().nonempty('veuillez inscrire le type de produit facturer')
})
// debut de la  function react composant
const FirstStepAddEvent = () => {
  
  const firstStepDefault=useSelector((state:RootState)=>state.eventReducer.firstStep)
    const {register,handleSubmit,formState:{errors}}=useForm({
        defaultValues:{...firstStepDefault},resolver:zodResolver(validationFirstStepSchema)})
        const {data}=useSession()
        const {client}=useContext(AddEventContext)
    const dispatch=useDispatch()
   
    const rooms=[
        {name:'Merouane'},
        {name:'Fares'},
     
    ]
 
    const allOptionsOffer=client.map((e)=>{
        return (<option value={e.id} key={e.id}>{e.name}</option>)
    })


    //function to submit data
    function saveFirstStepForm(data:FirstStepData){
      
     dispatch(setFirstStepForm(data))
      dispatch(nextStepForm())
    }


  return (
   <section className='bg-white w-full flex flex-col'>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(saveFirstStepForm)}>
    <label className='font-bold text-slate-900 text-xs'>Ajouter un titre</label>

        <input placeholder='Ajouter un titre ' type={'text'} {...register('title')}
         className='bg-slate-50 border-slate-400 
         rounded-md  py-3 pl-4 form-input'/>
                      <p className='text-xs font-semibold text-red-500'>{errors.title?.message}</p>

<label className="font-bold text-slate-900 text-xs">Selectionner votre client</label>
         <select  className='bg-slate-50  border-slate-400 
          py-3  w-full  rounded-md'  {...register('clientId')}>
            <option value={'' }>Selectionner votre client</option>
            {allOptionsOffer}
         </select>
         <p className='text-xs font-semibold text-red-500'>{errors.clientId?.message}</p>

         <label className="text-xs font-bold text-slate-900">Selectionner la category </label>

<select  placeholder="ajouter des infos"   {...register('productCategory')}
className=" pl-3 text-lg  rounded-md  bg-slate-50 form-select border-slate-400 " >
     <option value={''}>Selectionner une valeur</option>
    <option value={'coaching'}>Coaching</option>
    <option value={'programme'}> Programme</option>
</select>
<p className='text-xs font-semibold text-red-500'>{errors.productCategory?.message}</p>

       <label className='font-bold text-slate-900 text-xs'>Salle partenaire</label>
         <select  {...register('affiliateGym')}
           className='bg-slate-50 border-slate-400  
          py-3  w-full  rounded-md' >
            <option value={''}>Selectionner une valeur</option>
           <option value={'true'}>Oui</option>
           <option value={'false'}>Non</option>
         </select>
         <p className='text-xs font-semibold text-red-500'>{errors.affiliateGym?.message}</p>
  
         <button type='submit'
         
          className='bg-slate-800 px-6 py-3  font-semibold self-center rounded-xl text-slate-50  max-w-fit'
       >Suivant</button>
    </form>
   </section>
  )
}
export default FirstStepAddEvent