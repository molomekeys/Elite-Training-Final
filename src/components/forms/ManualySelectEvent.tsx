
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from 'react';
import {AddEventContext} from '../fonctionality/AddEvent'
interface Props{
nextStepSubEvent:()=>void
saveStepForm:(events:DefaultValue)=>void
defaultValueForm:DefaultValue
subStepForm?:boolean
}
type DefaultValue={
   
    dateFirstWeek: string,
    dateSecondWeek:string,
    dateThreeWeek:string,
   
    dateFourthWeek:string,

    hourStartFirstWeek:string,
    hourEndFirstWeek:string,

    hourStartSecondtWeek:string,
    hourEndSecondWeek:string,
   
    hourStartThirdWeek:string,
    hourEndThirdWeek:string,

    hourStartFourthWeek:string,
    hourEndFourthWeek:string,

}
const ManualySelectEvent = ({nextStepSubEvent,defaultValueForm,saveStepForm,subStepForm}:Props) => {


    


 const {functionAddSubEvent}=useContext(AddEventContext)
    //hook pour initialiser le formulaire avec les valeur par defaut
    const { register, handleSubmit, watch, formState: { errors },getValues ,reset} = useForm({
        defaultValues:{

       ...defaultValueForm
        }});
        const [isSubmit,setIsSubmit]=useState(false)


        //function pour submit le formulaire
function ValidateDataPick(val:DefaultValue){

    // ici je creee les variable pour les recuperer obligatoire pour creer une date
    console.log(val)
    setIsSubmit(true)
saveStepForm(val)

nextStepSubEvent()

const firstStartDate=new Date(val.dateFirstWeek+'T'+val.hourStartFirstWeek+':00')
const firstEndDate=new Date(val.dateFirstWeek+'T'+val.hourEndFirstWeek+':00')

const dateStartSecondWeek=new Date(val.dateSecondWeek+'T'+val.hourStartSecondtWeek+':00')
const dateEndSecondWeek=new Date(val.dateSecondWeek+'T'+val.hourEndSecondWeek+':00')

const dateStartThirdWeek=new Date(val.dateThreeWeek+'T'+val.hourStartThirdWeek+':00')
const dateEndThirdWeek=new Date(val.dateThreeWeek+'T'+val.hourEndThirdWeek+':00')

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
functionAddSubEvent(momo)
}

useEffect(()=>{
if(defaultValueForm.dateFirstWeek.length>1)
{
    setIsSubmit(true)
}
},[defaultValueForm])

// le return de la fonction qui permet d'afficher les composants 


  return (
   <main className="w-full">
    <form className="flex flex-col w-full gap-8 p-10 text-left" >



        <div className="w-full flex flex-col gap-4">

        <label className='font-semibold text-sm'>Première séance</label>

        <input   
        className=" bg-slate-50 border-slate-400  
        rounded-md  py-3 pl-4 form-input"  disabled={isSubmit} 
         {...register("dateFirstWeek")} type={'date'}/>
        <div className="flex gap-2 items-center justify-center">
            <label>De :</label>
        <input disabled={isSubmit} className="border-2  rounded-lg  bg-slate-50 border-slate-500"{...register('hourStartFirstWeek')} type='time'/>
        <label>A :</label>
        <input disabled={isSubmit} className="border-2  rounded-lg  bg-slate-50 border-slate-500" type={'time'}  {...register('hourEndFirstWeek')}/>
        </div>
        </div>



        <div className="flex flex-col gap-4 ">

        <label className='font-semibold text-sm'>Deuxième séance</label>

        <input  className=" bg-slate-50 border-slate-400 
         rounded-md  py-3 pl-4 form-input"    disabled={isSubmit} 
        {...register("dateSecondWeek")} type={'date'}/>
        <div className="flex gap-2 items-center justify-center">
            <label>De :</label>
        <input  disabled={isSubmit}  className="border-2  rounded-lg  bg-slate-50 border-slate-500"  {...register("hourStartSecondtWeek")} type={'time'}/>
        <label>A :</label>
        <input   {...register("hourEndSecondWeek")} type={'time'}  disabled={isSubmit} 
        className="border-2  rounded-lg  bg-slate-50 border-slate-500"/>
        </div>
        </div>


        <div className="flex flex-col gap-4 ">

        <label className='font-semibold text-sm'>Troisième séance</label>

        <input  className=" bg-slate-50 border-slate-400 
         rounded-md  py-3 pl-4 form-input "   disabled={isSubmit} 
         {...register("dateThreeWeek")} type={'date'}/>
        <div className="flex gap-2 items-center justify-center">
            <label>De :</label>
        <input className="border-2  rounded-lg  bg-slate-50 border-slate-500"   disabled={isSubmit}   {...register("hourStartThirdWeek")} type='time' />
        <label>A :</label>
        <input className="border-2  rounded-lg  bg-slate-50 border-slate-500"  disabled={isSubmit}  type='time'  {...register("hourEndThirdWeek")}/>
        </div>
        </div>


        <div className="flex flex-col gap-4 ">
        <label className='font-semibold text-sm'>Quatrième séance</label>

        <input  className=" bg-slate-50 border-slate-400 
         rounded-md  py-3 pl-4 form-input"    disabled={isSubmit} 
         {...register("dateFourthWeek")} type={'date'}/>
        <div className="flex gap-2 items-center justify-center">
            <label>De :</label>
        <input className="border-2  rounded-lg bg-slate-50 border-slate-500 "    disabled={isSubmit}  {...register("hourStartFourthWeek")} type='time' />
        <label>A :</label>
        <input className="border-2  rounded-lg  bg-slate-50 border-slate-500"   disabled={isSubmit} type='time'  {...register("hourEndThirdWeek")}/>
        </div>
        </div>


        
     <div className="w-full flex justify-center">
     { isSubmit&&
  <button  className="bg-slate-700 px-20  s font-semibold text-lg  self-center
   text-slate-50 py-2 rounded-lg my-8"
        type="button"
        onClick={()=>{
          
            setIsSubmit(false)
           
    }}>Modifier</button> }
    {isSubmit==false&& <button  type="submit" className="bg-slate-700 px-20  font-semibold text-lg  self-center text-slate-50 py-2 rounded-lg my-8"
        
    onClick={handleSubmit(ValidateDataPick)}>Valider</button>}
    </div>
     
    </form>
 
   </main>
  )
}
export default ManualySelectEvent