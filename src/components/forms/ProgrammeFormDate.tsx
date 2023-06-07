
import {useForm} from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod';
import { number } from 'zod';
import {v4} from 'uuid'
import {FirstValidationTypeSchema,SecondValidationTypeSchema,ThirdValidationTypeSchema}from './validationSchema'
import {useDispatch,useSelector} from 'react-redux'
import {setAutoEventForm,nextStepForm} from '../../features/event/eventSlice'
import { useContext } from 'react';
import {AddEventContext} from '../fonctionality/AddEvent'
import { RootState } from '~/app/store';

import {EventsType} from '../fonctionality/AddEvent'
// valeurs  par default du formulaire
type DefaultValue={
   
    dateFirstWeek: string,
    dateSecondWeek:string,
    dateThirdWeek:string,
   

    hourStartFirstWeek:string,
    hourEndFirstWeek:string,

    hourStartSecondWeek:string,
    hourEndSecondWeek:string,
   
    hourStartThirdWeek:string,
    hourEndThirdWeek:string,

    

}


  


// function react

const ProgrammeFormDate = () => {

   
const {events,functionEvent}=useContext(AddEventContext)
console.log(events)

const dispatch=useDispatch()
const smartAutoDefaultValue=useSelector((state:RootState)=>state.eventReducer.formAutoEvent)
    //hook pour initialiser le formulaire avec les valeur par defaut
    

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues:{

        ...smartAutoDefaultValue

       
        },resolver:zodResolver(ThirdValidationTypeSchema)})

function handleSubmitSmartForm(val:DefaultValue){

  //cette condition est pour faire en sorte  de repeter les evenemtns
  const firstDate=new Date(val.dateFirstWeek+'T'+val.hourStartFirstWeek+':00')
  const firstEndDate=new Date(val.dateFirstWeek+'T'+val.hourEndFirstWeek+':00')
  
  const secondStartDate=new Date(val.dateSecondWeek+'T'+val.hourStartSecondWeek+':00')
  const secondEndDate=new Date(val.dateSecondWeek+'T'+val.hourEndSecondWeek+':00')
  
  const thirdStartDate=new Date(val.dateThirdWeek+'T'+val.hourStartThirdWeek+':00')
  const thirdEndDate=new Date(val.dateThirdWeek+'T'+val.hourEndThirdWeek+':00')


dispatch(setAutoEventForm(val))



    
    let momo:EventsType[] =[]
momo.push({end:firstEndDate,start:firstDate,hours:(firstEndDate.getTime()-firstDate.getTime())/3600000,id:v4()}
,{end:secondEndDate,start:secondStartDate,hours:(secondEndDate.getTime()-secondStartDate.getTime())/3600000,id:v4()},
{end:thirdEndDate,start:thirdStartDate,hours:(thirdEndDate.getTime()-thirdStartDate.getTime())/3600000,id:v4()})
//je vais faire une boucle do while pour repeter la date 

functionEvent(momo)
  dispatch(nextStepForm())

}


console.log('rerender')

//ceci affiche les differents input

  return (
   <main className="flex flex-col w-full">
    <section className="flex flex-col gap-4 mt-10">
  
        <h3 className="text-lg text-center font-semibold">{`Inscrivez vos s\xE9ances pour le programme`} </h3>
        <form  onSubmit={handleSubmit(handleSubmitSmartForm)}
        
        className="flex flex-col gap-4">




<div className="flex flex-col gap-4">




{/* ceci est pour la date de la premiere seance*/}

                <div className='flex flex-col gap-4'>
            <label  className="font-semibold text-sm">{`D\xE9but de programme :`}</label>
            <input placeholder="Premiere seance" {...register('dateFirstWeek')}
            type={'date'}
            className=" bg-slate-50 border-slate-400 
         rounded-md  py-3 pl-4 form-input" />
<p className='text-xs font-semibold text-red-500'>{errors?.dateFirstWeek?.message}</p>

</div>

   {/* 
    ceci c'est pour les heures du 
    premier formulaire formulaires
   
   */}

              <div className="flex justify-betwenn items-center gap-2  w-full
               ">
                <div className='flex flex-col gap-4  items-center w-full'>
         <div className='flex items-center gap-4 w-full '>
          
             <input  {...register('hourStartFirstWeek')}
            
            className=" rounded-lg bg-slate-50 border-slate-500  w-full min-w-fit px-3 "  type='time'/>
          </div>
 
          <div className='w-full text-center'>            
             <p className='text-xs font-semibold  text-red-500'>{errors?.hourStartFirstWeek?.message}</p>
          </div>

           </div>
           <p className='whitespace-nowrap'>--</p>
           <div className='flex  items-center flex-col gap-4 w-full'>
              
              <div className='flex items-center w-full  gap-2'>
            
              <div className='flex flex-col w-full'>

              
               <input 
                {...register('hourEndFirstWeek')}
                className="   rounded-lg bg-slate-50 border-slate-500  w-full  min-w-fit px-3"  type={'time'}  />

                 </div>

                    </div>
                  
                    <p className='text-xs font-semibold text-red-500 '>{errors?.hourEndFirstWeek?.message}</p>

                   </div>

                   </div>

            </div>
           
             {/* 
    ceci c'est pour les dates du 
    formulaires deuxieme semaine 
   
   */}


<div className="flex flex-col gap-4">




{/* ceci est pour la date de la  date du deuxieme programme seance*/}

                <div className='flex flex-col gap-4'>
            <label  className="font-semibold text-sm">{`Rendez-vous mi-programme:`}</label>
            <input placeholder="Rendez-vous mi programme" {...register('dateSecondWeek')}
            type={'date'}
            className=" bg-slate-50 border-slate-400 
         rounded-md  py-3 pl-4 form-input" />
<p className='text-xs font-semibold text-red-500'>{errors?.dateSecondWeek?.message}</p>

</div>

   {/* 
    ceci c'est pour les heures du 
    premier formulaire formulaires
   
   */}

              <div className="flex justify-betwenn items-center gap-2  w-full
               ">
                <div className='flex flex-col gap-4  items-center w-full'>
         <div className='flex items-center gap-4 w-full '>
          
             <input  {...register('hourStartSecondWeek')}
            
            className=" rounded-lg bg-slate-50 border-slate-500  w-full min-w-fit px-3 "  type='time'/>
          </div>
 
          <div className='w-full text-center'>            
             <p className='text-xs font-semibold  text-red-500'>{errors?.hourStartSecondWeek?.message}</p>
          </div>

           </div>
           <p className='whitespace-nowrap'>--</p>
           <div className='flex  items-center flex-col gap-4 w-full'>
              
              <div className='flex items-center w-full  gap-2'>
            
              <div className='flex flex-col w-full'>

              
               <input 
                {...register('hourEndSecondWeek')}
                className="   rounded-lg bg-slate-50 border-slate-500  w-full  min-w-fit px-3"  type={'time'}  />

                 </div>

                    </div>
                  
                    <p className='text-xs font-semibold text-red-500 '>{errors?.hourEndSecondWeek?.message}</p>

                   </div>

                   </div>

            </div>
            <div className="flex flex-col gap-4">




{/* ceci est pour la date de la premiere seance*/}

                <div className='flex flex-col gap-4'>
            <label  className="font-semibold text-sm">{`Rendez-vous bilan : `}</label>
            <input placeholder="Rendez vous bilan" {...register('dateThirdWeek')}
            type={'date'}
            className=" bg-slate-50 border-slate-400 
         rounded-md  py-3 pl-4 form-input" />
<p className='text-xs font-semibold text-red-500'>{errors?.dateThirdWeek?.message}</p>

</div>

   {/* 
    ceci c'est pour les heures du 
    premier formulaire formulaires
   
   */}

              <div className="flex justify-betwenn items-center gap-2  w-full
               ">
                <div className='flex flex-col gap-4  items-center w-full'>
         <div className='flex items-center gap-4 w-full '>
          
             <input  {...register('hourStartThirdWeek')}
            
            className=" rounded-lg bg-slate-50 border-slate-500  w-full min-w-fit px-3 "  type='time'/>
          </div>
 
          <div className='w-full text-center'>            
             <p className='text-xs font-semibold  text-red-500'>{errors?.hourStartThirdWeek?.message}</p>
          </div>

           </div>
           <p className='whitespace-nowrap'>--</p>
           <div className='flex  items-center flex-col gap-4 w-full'>
              
              <div className='flex items-center w-full  gap-2'>
            
              <div className='flex flex-col w-full'>

              
               <input 
                {...register('hourEndThirdWeek')}
                className="   rounded-lg bg-slate-50 border-slate-500  w-full  min-w-fit px-3"  type={'time'}  />

                 </div>

                    </div>
                  
                    <p className='text-xs font-semibold text-red-500 '>{errors?.hourEndThirdWeek?.message}</p>

                   </div>

                   </div>

            </div>


            
          
           
       
          <button  type='submit'
          
          className="bg-slate-700 px-20  font-semibold text-lg  self-center text-slate-50 py-2 rounded-lg my-8">Valider et répeter</button>
        </form>
    </section>
   </main>
  )
}
export default ProgrammeFormDate