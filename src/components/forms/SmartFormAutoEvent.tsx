
import {useForm} from 'react-hook-form'
import HoursErrors from './HoursErrors'
import { zodResolver } from '@hookform/resolvers/zod';
import { number } from 'zod';
import {v4} from 'uuid'
import {FirstValidationTypeSchema,SecondValidationTypeSchema,ThirdValidationTypeSchema}from './validationSchema'
import {useDispatch,useSelector} from 'react-redux'
import {setAutoEventForm,nextStepForm} from '../../features/event/eventSlice'
import { useContext } from 'react';
import {AddEventContext} from '../fonctionality/AddEvent'
import { RootState } from '~/app/store';
import {
 useDisclosure
} from '@chakra-ui/react'
interface Props{
    numberOfSeance:string
 
}
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

// function pour creer les dates
function createTheSpecifiqueDate(a:[Date,Date],b?:[Date,Date],c?:[Date,Date]){
  let i=1
  const arrayOfEvents=[]
  console.log(b)
  if(a&&(!b&&!c)){
    const hoursFirstEvent=(a[1].getTime()-a[0].getTime())/(60*60*1000)
    do {
     
      
        arrayOfEvents.push({
          start:new Date(a[0]),id:v4(),
          end:new Date(a[1]),hours:hoursFirstEvent })
      
        a[0] = new Date(a[0].setDate(a[0].getDate()+7))
        a[1] = new Date(a[1].setDate(a[1].getDate()+7))
      i=i+1
      } while (i<=4);

  }
  else if((a&&b)&&!c){
  const  hoursFirstEvent=(a[1].getTime()-a[0].getTime())/(60*60*1000)
  const  hoursSecondEvent=(b[1].getTime()-b[0].getTime())/(60*60*1000)

    do {
     
      
      arrayOfEvents.push(
        {
        start:new Date(a[0]),id:v4(),
        end:new Date(a[1]),hours: hoursFirstEvent,
       },{
          
          start:new Date(b[0]),id:v4(),
          end:new Date(b[1]),hours: hoursSecondEvent,
        


        })
    
      a[0] = new Date(a[0].setDate(a[0].getDate()+7))
      a[1] = new Date(a[1].setDate(a[1].getDate()+7))
      b[0] = new Date(b[0].setDate(b[0].getDate()+7))
      b[1] = new Date(b[1].setDate(b[1].getDate()+7))
    i=i+1
    } while (i<=4)

  }
  else if((b&&c)&&a){
  const  hoursFirstEvent=(a[1].getTime()-a[0].getTime())/(60*60*1000)
    const hoursSecondEvent=(b[1].getTime()-b[0].getTime())/(60*60*1000)
    const hoursThirdEvent=(c[1].getTime()-c[0].getTime())/(60*60*1000)

    do {
     
      
      arrayOfEvents.push(
        {
        start:new Date(a[0]),id:v4(),
        end:new Date(a[1]),hours: hoursFirstEvent,
      },
        {
         
          start:new Date(b[0]),id:v4(),
          end:new Date(b[1]),hours: hoursSecondEvent,
         


        },{
         
          start:new Date(c[0]),id:v4(),
          end:new Date(c[1]),hours: hoursThirdEvent,
        


        })
    
      a[0] = new Date(a[0].setDate(a[0].getDate()+7))
      a[1] = new Date(a[1].setDate(a[1].getDate()+7))
      b[0] = new Date(b[0].setDate(b[0].getDate()+7))
      b[1] = new Date(b[1].setDate(b[1].getDate()+7))
      c[0] = new Date(c[0].setDate(c[0].getDate()+7))
      c[1] = new Date(c[1].setDate(c[1].getDate()+7))
    i=i+1
    } while (i<=4)


  }
  console.log(arrayOfEvents)
  
return arrayOfEvents

}
  


// function react

const SmartFormInput = ({ numberOfSeance}:Props) => {

   
const {events,functionEvent}=useContext(AddEventContext)
console.log(events)


//model pour afficher 

 const {isOpen,onOpen,onClose}=useDisclosure()
const dispatch=useDispatch()
const smartAutoDefaultValue=useSelector((state:RootState)=>state.eventReducer.formAutoEvent)
    //hook pour initialiser le formulaire avec les valeur par defaut
    

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues:{

        ...smartAutoDefaultValue

       
        },resolver:zodResolver(numberOfSeance=='1'? FirstValidationTypeSchema : numberOfSeance=='2'? SecondValidationTypeSchema : numberOfSeance=='3'? ThirdValidationTypeSchema : ThirdValidationTypeSchema)})

function handleSubmitSmartForm(val:DefaultValue){

  //cette condition est pour faire en sorte  de repeter les evenemtns

dispatch(setAutoEventForm(val))
const firstDate=new Date(val.dateFirstWeek+'T'+val.hourStartFirstWeek+':00')
const firstEndDate=new Date(val.dateFirstWeek+'T'+val.hourEndFirstWeek+':00')

const secondStartDate=new Date(val.dateSecondWeek+'T'+val.hourStartSecondWeek+':00')
const secondEndDate=new Date(val.dateSecondWeek+'T'+val.hourEndSecondWeek+':00')

const thirdStartDate=new Date(val.dateThirdWeek+'T'+val.hourStartThirdWeek+':00')
const thirdEndDate=new Date(val.dateThirdWeek+'T'+val.hourEndThirdWeek+':00')


const compareDate=new Date(val.dateFirstWeek+'T'+val.hourEndFirstWeek+':00')



    const newDate = new Date(firstDate)
    const newEndDate = new Date(firstEndDate)
    const newSecondStartDate = new Date(secondStartDate)
    const newSecondEndDate = new Date(secondEndDate)
    const newThirdStartDate = new Date(thirdStartDate)
    const newThirdEndDate = new Date(thirdEndDate)
    
    let momo:EventsType[] =[]

//je vais faire une boucle do while pour repeter la date 
if(Number(numberOfSeance)==1)
{
  momo=createTheSpecifiqueDate([new Date(newDate),new Date (newEndDate)])
}
if(Number(numberOfSeance)==2)
{
  momo=createTheSpecifiqueDate([new Date(newDate),new Date(newEndDate)],
    [new Date(newSecondStartDate),new Date(newSecondEndDate)])
}
if(Number(numberOfSeance)==3)
{
 momo= createTheSpecifiqueDate([newDate,newEndDate],
    [newSecondStartDate,newSecondEndDate],[newThirdStartDate,newThirdEndDate])
}


functionEvent(momo)

const totalHours=momo.reduce((accumulator,current)=>
{
  return  accumulator+current.hours
},0)


//je verifie que le nombre d'heure est rond
if (totalHours % 1 === 0) {
  dispatch(nextStepForm())
 
} else {
  onOpen()
}
  

}


console.log('rerender')

//ceci affiche les differents input

  return (
   <main className="flex flex-col w-full">

    <HoursErrors isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
    <section className="flex flex-col gap-4 mt-10">
  
        <h3 className="text-lg text-center font-semibold">{`Inscrivez vos s\xE9ances`} </h3>
        <form  onSubmit={handleSubmit(handleSubmitSmartForm)}
        
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





            {(numberOfSeance=='3'||numberOfSeance=='2')&&
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
                       
                   }


            {numberOfSeance=='3'&&<div className="flex flex-col gap-4">




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
           
       }
          <button  type='submit'
          
          className="bg-slate-700 px-20  font-semibold text-lg  self-center text-slate-50 py-2 rounded-lg my-8">Valider et répeter</button>
        </form>
    </section>
   </main>
  )
}
export default SmartFormInput