
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from 'react';
import {AddEventContext} from '../fonctionality/AddEvent'
import { zodResolver } from "@hookform/resolvers/zod";
import { FourValidationTypeSchema } from "./validationSchema";
interface Props{

saveStepForm:(events:DefaultValue)=>void
defaultValueForm:DefaultValue
subStepForm?:boolean
isSubmit?: boolean
}
type DefaultValue={
   
    dateFirstWeek: string,
    dateSecondWeek:string,
    dateThirdWeek:string,
   
    dateFourthWeek:string,

    hourStartFirstWeek:string,
    hourEndFirstWeek:string,

    hourStartSecondWeek:string,
    hourEndSecondWeek:string,
   
    hourStartThirdWeek:string,
    hourEndThirdWeek:string,

    hourStartFourthWeek:string,
    hourEndFourthWeek:string,

}
const ManualySelectEvent = ({defaultValueForm,saveStepForm}:Props) => {


    

const {nextSubStepForm,subStepForm}=useContext(AddEventContext)
 const {functionAddSubEvent}=useContext(AddEventContext)
    //hook pour initialiser le formulaire avec les valeur par defaut
    const { register, handleSubmit, watch, formState: { errors },getValues ,reset} = useForm({resolver:zodResolver(FourValidationTypeSchema),
        defaultValues:{

       ...defaultValueForm
        }});
        const [isSubmit,setIsSubmit]=useState(false)


        //function pour submit le formulaire
function ValidateDataPick(val:DefaultValue){

    // ici je creee les variable pour les recuperer obligatoire pour creer une date
    console.log(val)
 




const firstStartDate=new Date(val.dateFirstWeek+'T'+val.hourStartFirstWeek+':00')
const firstEndDate=new Date(val.dateFirstWeek+'T'+val.hourEndFirstWeek+':00')

const dateStartSecondWeek=new Date(val.dateSecondWeek+'T'+val.hourStartSecondWeek+':00')
const dateEndSecondWeek=new Date(val.dateSecondWeek+'T'+val.hourEndSecondWeek+':00')

const dateStartThirdWeek=new Date(val.dateThirdWeek+'T'+val.hourStartThirdWeek+':00')
const dateEndThirdWeek=new Date(val.dateThirdWeek+'T'+val.hourEndThirdWeek+':00')

const dateStartFourthdWeek=new Date(val.dateFourthWeek+'T'+val.hourStartFourthWeek+':00')
const dateEndFourthdWeek=new Date(val.dateFourthWeek+'T'+val.hourEndThirdWeek+':00')

//calcul des heures

const hoursFirstWeek=(firstEndDate.getTime()-firstStartDate.getTime())/( 3600000)
const hoursSecondtWeek=(dateEndSecondWeek.getTime()-dateStartSecondWeek.getTime())/( 3600000)
const hoursThirdtWeek=(dateEndThirdWeek.getTime()-dateStartThirdWeek.getTime())/( 3600000)
const hoursFourthWeek=(dateEndFourthdWeek.getTime()-dateStartFourthdWeek.getTime())/( 3600000)
// dans cette partie je sauvegarde les dates créer et génerer pour les 
//sauvegarde dans le store 

const momo =[{hours:hoursFirstWeek,start:new Date(firstStartDate),id:'1',
    end:
    new Date(firstEndDate)},
    {end:dateEndSecondWeek,start:dateStartSecondWeek,hours:hoursSecondtWeek,id:'1'},
    {end: new Date(dateEndThirdWeek),start: new Date(dateStartThirdWeek),id:'1',hours:hoursThirdtWeek},
    {end: new Date(dateEndFourthdWeek),start: new Date(dateStartFourthdWeek),id:'1',hours:hoursFourthWeek}]
console.log(momo)

// setManualyEvent(momo)
nextSubStepForm()

}

useEffect(()=>{
if(defaultValueForm.dateFirstWeek.length>1)
{
    setIsSubmit(true)
}
},[defaultValueForm])

// le return de la fonction qui permet d'afficher les composants 


  return (
   
    <main className="flex flex-col w-full">
    <section className="flex flex-col gap-4 mt-10">
  
        <h3 className="text-lg text-center font-semibold">{`Inscrivez vos s\xE9ances`} </h3>
        <form  onSubmit={handleSubmit(ValidateDataPick)}
        
        className="flex flex-col gap-4">




            <div className="flex flex-col gap-4">




{/* ceci est pour la date de la premiere seance*/}

                <div className='flex flex-col gap-4'>
            <label  className="font-semibold text-sm">{`Premi\u00E8re s\xE9ance :`}</label>
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




            {/* ceci est pour la date de la deuxieme seance*/}
            
                            <div className='flex flex-col gap-4 w-full'>
                        <label  className="font-semibold text-sm">{`Deuxième Séance :`}</label>
                        <input placeholder="Premiere seance" {...register('dateSecondWeek')}
                        type={'date'}
                        className=" w-full rounded-lg bg-slate-50 border-slate-500 "  />
            <p className='text-xs font-semibold text-red-500'>{errors?.dateSecondWeek?.message}</p>
            
            </div>
            
               {/* 
                ceci c'est pour les heures du 
                premier formulaire formulaires
               
               */}
            
                          <div className="flex  justify-between items-center   px-4 gap-10 w-full
                           ">
                            <div className='flex flex-col gap-4 w-full items-center w-full'>
                     <div className='flex items-center gap-4 w-full '>
                      
                         <input  {...register('hourStartSecondWeek')}
                        
                        className=" w-full  rounded-lg bg-slate-50 border-slate-500  min-w-fit px-3"  type='time'/>
                      </div>
                      <div className='w-full text-center'>            
                         <p className='text-xs font-semibold  text-red-500'>{errors?.hourStartSecondWeek?.message}</p>
                      </div>
            
                       </div>
                       <div className='flex items-center h-full justify-center'>
                       <p className='whitespace-nowrap'>--</p>
                       </div>
                       <div className='flex  items-center flex-col gap-4 w-full'>
                          

                          
                          <div className='flex items-center w-full  gap-2'>
                         
                          <div className='flex flex-col w-full'>
            
                          
                           <input 
                            {...register('hourEndSecondWeek')}
                            className=" w-full   rounded-lg bg-slate-50 border-slate-500 min-w-fit px-3 "  type={'time'}  />
            
                             </div>
            
                                </div>
                              
                                <p className='text-xs font-semibold text-red-500 '>{errors?.hourEndSecondWeek?.message}</p>

                               </div>
            
                               </div>
            
                        </div>
                       
                   


       <div className="flex flex-col gap-4">




{/* ceci est pour la date de la troisieme  seance*/}

                <div className='flex flex-col gap-4'>
            <label  className="font-semibold text-sm">{`Troisième séance :`}</label>
            <input placeholder="Premiere seance" {...register('dateThirdWeek')}
            type={'date'}
            className="  rounded-lg bg-slate-50 border-slate-500 "  />
<p className='text-xs font-semibold text-red-500'>{errors?.dateThirdWeek?.message}</p>

</div>

   {/* 
    ceci c'est pour les heures du 
    premier formulaire formulaires
   
   */}

              <div className="flex items-center px-4 w-full justify-center gap-8  w-full
               ">
                <div className='flex  w-full flex-col gap-4  items-center w-full'>
         <div className='flex items-center gap-4 w-full '>
           
             <input   {...register('hourStartThirdWeek')}
            
            className="  w-full  rounded-lg bg-slate-50 border-slate-500 " type='time'/>
          </div>
          <div className='w-full text-center'>            
             <p className='text-xs font-semibold  text-red-500'>{errors?.hourStartThirdWeek?.message}</p>
          </div>

           </div>
           <p className='whitespace-nowrap'>--</p>


           <div className='flex  items-center flex-col gap-4 w-full'>
              
              <div className='flex items-center  w-full gap-2'>
            
              <div className='flex flex-col w-full'>

              
               <input 
                {...register('hourEndThirdWeek')}
                className="  rounded-lg bg-slate-50 border-slate-500 "  type={'time'}  />

                 </div>

                    </div>
                  
                    <p className='text-xs font-semibold text-red-500 '>{errors?.hourEndThirdWeek?.message}</p>
                   
                   </div>

                   </div>

            </div>
            <div className="flex flex-col gap-4">




{/* ceci est pour la date de la troisieme  seance*/}

                <div className='flex flex-col gap-4'>
            <label  className="font-semibold text-sm">{`Troisième séance :`}</label>
            <input placeholder="Premiere seance" {...register('dateFourthWeek')}
            type={'date'}
            className="  rounded-lg bg-slate-50 border-slate-500 "  />
<p className='text-xs font-semibold text-red-500'>{errors?.dateFourthWeek?.message}</p>

</div>

   {/* 
    ceci c'est pour les heures du 
    premier formulaire formulaires
   
   */}

              <div className="flex items-center px-4 w-full justify-center gap-8  w-full
               ">
                <div className='flex  w-full flex-col gap-4  items-center w-full'>
         <div className='flex items-center gap-4 w-full '>
           
             <input   {...register('hourStartFourthWeek')}
            
            className="  w-full  rounded-lg bg-slate-50 border-slate-500 " type='time'/>
          </div>
          <div className='w-full text-center'>            
             <p className='text-xs font-semibold  text-red-500'>{errors?.hourStartFourthWeek?.message}</p>
          </div>

           </div>
           <p className='whitespace-nowrap'>--</p>


           <div className='flex  items-center flex-col gap-4 w-full'>
              
              <div className='flex items-center  w-full gap-2'>
            
              <div className='flex flex-col w-full'>

              
               <input 
                {...register('hourEndFourthWeek')}
                className="  rounded-lg bg-slate-50 border-slate-500 "  type={'time'}  />

                 </div>

                    </div>
                  
                    <p className='text-xs font-semibold text-red-500 '>{errors?.hourEndFourthWeek?.message}</p>
                   
                   </div>

                   </div>

            </div>
           
       
          <button  type='submit'
          
          className="bg-slate-700 px-20  font-semibold text-lg  self-center text-slate-50 py-2 rounded-lg my-8">Valider et répeter</button>
        </form>
        <p>{subStepForm}</p>
    </section>
   </main>
  )
}
export default ManualySelectEvent