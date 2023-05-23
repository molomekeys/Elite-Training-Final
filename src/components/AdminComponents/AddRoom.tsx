import { useForm } from 'react-hook-form';
import {
    Modal,
    ModalOverlay,
    ModalContent,FormControl,Input,FormLabel,
    ModalHeader,useMediaQuery,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Button
  } from '@chakra-ui/react'
  import {useDisclosure} from '@chakra-ui/react'
  import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
  import {useRef, useState} from 'react'

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';



// ce qui sera transmis au formulaire par react hook form 

type ClientData={
  lastName:string
  email:string 
  confirmEmail:string
  firstName:string
}

//validation de donner à travers Zod
const validationSchema = z.object({
  email:z.string().email('Veuillez inscrire une adresse email valide'),
  lastName:z.string().min(3,'Veuillez inscrire un nom valide, minimun 3 caractères'),
  firstName:z.string().min(3,'Veuillez inscrire un prénom valide, minimun 3 caracteres'),
  confirmEmail:z.string().email('Veuillez inscrire une adresse email valide'),
  }).refine((data)=>{return (data.confirmEmail===data.email)},
  {message:'email ne correspondent pas',path:['confirmEmail']})



//function qui affiche à l'ecran

export default function AddRoom() {


  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const modalSize = isLargerThan768 ? "5xl" : "full";
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const[succesAddClient,setSuccesAddClient]=useState(false)
    const[isClientAdded,setIsAddClient]=useState(false)
    const finalRef = useRef(null)
  
    const { register, handleSubmit ,formState:{errors},watch,reset,trigger} = useForm(
      
      {defaultValues:{email:'',lastName:'',firstName:'',confirmEmail:'',
    coachPriceOneWeek:"",clientPriceOneWeek:"",
    coachPriceTwoWeek:"",clientPriceTwoWeek:"",
    coachPriceThreeWeek:"",clientPriceThreeWeek:"",
    coachPriceFourWeek:"",clientPriceFourWeek:""
    
    
    
    }, resolver: zodResolver(validationSchema),});


        const[stepFormSalle,setStepFormSalle]=useState(1)
//function async pour creer un client au niveau de firebase

async function createClient(data:ClientData){
  const{confirmEmail,...dataToSave}=data
  console.log(dataToSave)
 
//fin de la function fermeture de l'appp
}

    return (
      <>
        <button onClick={onOpen} className="relative  bg-slate-800 py-3 text-slate-50 font-semibold py-2 px-3 rounded-lg">

        Ajouter une salle

        </button>
       

        
       
        <Modal  size={modalSize}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={()=>{
            setStepFormSalle(1)
            reset()
            onClose()}
        }
        >
          
  <ModalOverlay />

         <ModalContent>
         <ModalHeader className='text-center text-slate-800'>Vous ajouter un nouveau client</ModalHeader>
          <ModalCloseButton />

          <form className='flex flex-col gap-4 p-2 lg:p-10 bg-white' onSubmit={
   

          handleSubmit(createClient)}>
         { stepFormSalle==1&&<div className='flex flex-col w-full gap-3'>
              <label htmlFor='lastName' className='font-semibold text-sm'>Nom de la salle :</label>
            <input   className='form-input py-2 px-3  rounded-md bg-slate-100 ' id='lastName'
            placeholder='Veuillez inscrire le nom de votre athlète'  {...register('lastName')}
            
           />
           <p className='text-xs font-semibold text-red-500'>{errors.lastName?.message}</p>
           <label htmlFor='firstName' className='font-semibold text-sm' >Id comptable pour la salle : </label>

            <input placeholder='Veuillez inscrire le prénom de votre athlète'  id='firstName'  
             className='form-input rounded-md py-2 px-3 bg-slate-200'
              {...register('firstName')}/>
                      <p className='text-xs font-semibold text-red-500'>{errors.firstName?.message}</p>
              
              
                      <label htmlFor='firstName' className='font-semibold text-sm' >Tarif séance unique client:</label>

<input placeholder='Veuillez inscrire le tarif de la seance unique client'  id='firstName' 
  className='form-input rounded-md bg-slate-100  py-3' type={'number'} min={0}
  {...register('clientPriceOneWeek')}/>
                        <label htmlFor='firstName' className='font-semibold text-sm' >Tarif séance unique coach :</label>

<input placeholder='Veuillez inscrire le tarif de la seance unique du coach'  id='firstName' 
  className='form-input rounded-md bg-slate-100  py-3' type={'number'}
  {...register('coachPriceOneWeek')} min={0}/>
          <p className='text-xs font-semibold text-red-500'>{errors.firstName?.message}</p>
              
                <button onClick={()=>{
                    setStepFormSalle(2)
    }
            }
                
                
                type='button' className='py-2 px-8 bg-slate-800 text-slate-50 rounded-lg max-w-fit self-center'>Suivant</button> </div>}

{/**Tarif une seance par semaine
 * 
 * cela feras partie de la step 2
 */}


{stepFormSalle==2&&<div className='flex flex-col gap-12 text-center '>



    {/*ça permet de recuperer les seances pour chaques type de sous programme coaching */}
<div className='flex flex-col gap-2 text-left  '>
    
                <h2 className='font-semibold text-center  py-4 '>Indiquez les tarif de deux  séances par semaine</h2>

<section className='flex w-full gap-4 lg:gap-20 flex-col lg:flex-row '>


    <div className='flex-col flex w-full gap-2'>
                      <label htmlFor='email' className='font-semibold text-sm'>Tarif horaire du client : </label>


            <input  type={'number'}  min={0}
             placeholder="Tarif deux seances par semaine du clients" 
              {...register('clientPriceTwoWeek')} 
              className='form-input rounded-md bg-slate-100 py-2 '     
                 />
                                       <p className='text-xs font-semibold text-red-500'> {errors.email?.message}</p>

                                       </div>



                                       <div className='flex flex-col w-full gap-2'>
                                       <label className='font-semibold text-sm'
                                        htmlFor='confirmEmail'>Tarif horaire du coach :</label>

            <input  type={'number'} min={0} placeholder="Tarif de deux seances par semaines du coach" 
              {...register('coachPriceTwoWeek')}     
              className='form-input rounded-md bg-slate-100 py-2 '   
                  />
                                        <p className='text-xs font-semibold text-red-500'>{errors.confirmEmail?.message}</p>
                                        </div>
                                        </section>
                                        </div>


                                        <div className='flex flex-col gap-2 border-t-2 border-cyan-700 lg:border-none'>
                <h2 className='font-semibold   py-4 '>Indiquez les tarif de trois séances par semaine</h2>

                <section className='flex w-full gap-4 lg:gap-20 flex-col lg:flex-row text-left '>


<div className='flex-col flex w-full gap-2'>
                  <label htmlFor='email' className='font-semibold text-sm'>Tarif horaire du client : </label>


        <input  type={'number'} min={0}  placeholder="Inscrire le prix client de trois seance par semaines" 
          {...register('clientPriceThreeWeek')}  id='email'  className='form-input py-2
           rounded-md  bg-slate-100'     
             />
                                   <p className='text-xs font-semibold text-red-500'> {errors.email?.message}</p>

                                   </div>



                                   <div className='flex flex-col w-full gap-2'>
                                   <label className='font-semibold text-sm'
                                    htmlFor='confirmEmail'>Tarif horaire du coach :</label>

        <input  type={'number'} placeholder="Tarifs coach trois seances par semaines"  min={0}
          {...register('coachPriceThreeWeek')}     className='form-input bg-slate-100 rounded-md py-2 px-3'   
              />
                                    <p className='text-xs font-semibold text-red-500'>{errors.confirmEmail?.message}</p>
                                    </div>
                                    </section>
                                        </div>


{/*fin du sous-programme*/}
{/*
Je le duplique pour faire le troisieme sous programme coaching
*/}

<div className='flex flex-col gap-2 border-t-2 border-cyan-600 lg:border-none'>
    
                <h2 className='font-semibold   py-4 '>Indiquez les tarif du programme</h2>


                <section className='flex w-full gap-4 lg:gap-20 flex-col lg:flex-row text-left '>


<div className='flex-col flex w-full gap-2'>
                  <label htmlFor='email' className='font-semibold text-sm'>Tarif horaire du client : </label>


        <input   min={0} max={100}
        type={'number'}  placeholder="Tarif client du programme" 
          {...register('email')}  id='email'  className='form-input
           rounded-md bg-slate-100  px-4 py-3'     
             />
                                   <p className='text-xs font-semibold text-red-500'> {errors.email?.message}</p>

                                   </div>



                                   <div className='flex flex-col w-full gap-2'>
                                   <label className='font-semibold text-sm'
                                    htmlFor='confirmEmail'>Tarif horaire du coach :</label>

        <input  type={'email'} placeholder="Confirmer l'adresse email de votre athlète"   {...register('confirmEmail')}    
         className='bg-slate-100 form-input rounded-md py-2 px-3'   
              />
                                    <p className='text-xs font-semibold text-red-500'>{errors.confirmEmail?.message}</p>
                                    </div>
                                    </section>       
                                        </div>


                                        <button onClick={()=>setStepFormSalle(3)}
                type='button' className='py-2 px-8 bg-slate-800 text-slate-50 rounded-lg max-w-fit self-center'>Suivant</button>
                                        </div>
                                        
                                        
                                        
                                        }




                                        {/** ça c'est pour la step 3 */}
                                        {stepFormSalle==3&&<div className='flex flex-col gap-2'>

                <h2 className='font-semibold text-center  py-4 border-t-2'>Indiquez les tarif de une fois par semaine</h2>
                                        <section className='w-full flex flex-row gap-20'>
                                        <div className='flex-col w-full flex'>
                      <label htmlFor='email' className='font-semibold text-xs'>Tarif horaire du client : </label>


            <input  type={'email'}  placeholder="Veuillez inscrire l'adresse email de votre athlète" 
              {...register('email')}  id='email'  className='form-input rounded-md'     
                 />
                                       <p className='text-xs font-semibold text-red-500'> {errors.email?.message}</p>
                                       </div>
                                       <div className='flex-col w-full flex'>
                                       <label className='font-semibold text-xs'
                                        htmlFor='confirmEmail'>Tarif horaire du coach :</label>

            <input  type={'email'} placeholder="Confirmer l'adresse email de votre athlète"   {...register('confirmEmail')}     className='form-input rounded-md'   
                  />
                                        <p className='text-xs font-semibold text-red-500'>{errors.confirmEmail?.message}</p>
                                        </div>
                                        </section>
                                        <button onClick={()=>setStepFormSalle(4)}
                type='button' className='py-2 px-8 bg-slate-800 text-slate-50 rounded-lg max-w-fit self-center'>Suivant</button>
                                       
                                        </div>}


        
          <ModalFooter >
            <div className='w-full flex justify-between'>
          {stepFormSalle==3&&<Button type='submit'>Sauvegarder</Button>}
          {stepFormSalle<4&&stepFormSalle>1&&<Button type='button' onClick={()=>{
            setStepFormSalle((prev)=>prev-1)
          }}>Précedent</Button>}
          <Button onClick={
           ()=> {   setStepFormSalle(1)
                reset()
                onClose()}}>Annuler</Button>
          </div>
         </ModalFooter>
         </form>
         </ModalContent>
        
        </Modal>
        
      
      </>
    )
  }