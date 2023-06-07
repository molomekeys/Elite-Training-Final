import { useForm } from 'react-hook-form';
import {motion} from 'framer-motion'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,useMediaQuery,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Button
  } from '@chakra-ui/react'

  import {useDisclosure} from '@chakra-ui/react'

  import { useRef, useState} from 'react'


import { api } from '~/utils/api';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {useAnimate} from 'framer-motion'

// ce qui sera transmis au formulaire par react hook form 

type ClientData={
  lastName:string
  email:string 
  confirmEmail:string
  firstName:string
  phoneNumber:string
}

//validation de donner à travers Zod
const validationSchema = z.object({
  email:z.string().email('Veuillez inscrire une adresse email valide'),
  phoneNumber:z.string().nonempty("Veuillez insérez le numéro de votre athlète").length(10,'Numéro non valide'),
  lastName:z.string().min(3,'Veuillez inscrire un nom valide, minimun 3 caractères'),
  firstName:z.string().min(3,'Veuillez inscrire un prénom valide, minimun 3 caracteres'),
  confirmEmail:z.string().email('Veuillez inscrire une adresse email valide'),
  }).refine((data)=>{return (data.confirmEmail===data.email)},
  {message:'email ne correspondent pas',path:['confirmEmail']})



//function qui affiche à l'ecran

interface Props{
  refetchData:()=>void
}
export default function AddClient({refetchData}:Props) {

 const createNewClient=api.example.createClient.useMutation()
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const modalSize = isLargerThan768 ? "3xl" : "full";
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [refTest,animate]=useAnimate()
    function handleAnimate(){
    animate(refTest.current,{x:['3%','-3%','0%','3%',"0%","-3%","0%"]},{duration:0.75})
    }
    const initialRef = useRef(null)
    const[succesAddClient,setSuccesAddClient]=useState(false)
    const[isClientAdded,setIsAddClient]=useState(false)
    const finalRef = useRef(null)
   
  
    
    const { register,setFocus, handleSubmit,setError ,formState:{errors},watch,reset} = useForm(
      
      {defaultValues:{email:'',lastName:'',firstName:'',confirmEmail:'',phoneNumber:''}, resolver: zodResolver(validationSchema),});



//function async pour creer un client au niveau de planete scale

async function createClient(data:ClientData){
  const {firstName,lastName,phoneNumber}=data
  const correctFirstName=`${firstName[0]?.toLocaleUpperCase()}${firstName.slice(1).toLowerCase()}`
  const correctLastName=`${lastName[0]?.toLocaleUpperCase()}${lastName.slice(1).toLowerCase()}`
const password=`${correctFirstName.toLowerCase()}${correctLastName.toLowerCase()}`

    const tryCreatedUser=await createNewClient.mutateAsync({email:data.email,phoneNumber:phoneNumber,
      name:`${correctLastName+" "+correctFirstName}`,password:password})
  if(tryCreatedUser=='utilisateur déjà existant'){
    console.log(tryCreatedUser)
    setError('email',{
      message:'Cet email est déjà affilié à un client'
    })
    setFocus('email')
    handleAnimate()
    

  } 
  else if(tryCreatedUser=='bravo utilisateur ajouter avec succès'){
   
   console.log(tryCreatedUser)
   
   onClose()
   reset()
refetchData()
  }
  }
    
 
 


// fin de la function fermeture de l'appp


    return (
      <>
        <motion.button onClick={onOpen}   whileHover={{scale:1.05}}
        className="relative bg-[rgb(19,28,46)] max-w-fit text-slate-50 font-semibold py-2 px-3 rounded-lg">

        Ajouter un client

        </motion.button>
       

        
       
        <Modal  size={modalSize} 
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          
  <ModalOverlay />

         <ModalContent className='rounded-lg'>
         <ModalHeader className='text-center bg-slate-100 rounded-lg text-slate-700 font-semibold '>Vous ajouter un nouveau client</ModalHeader>
          <ModalCloseButton className='text-slate-00 '  />


          <motion.form  
          className='flex bg-slate-100  flex-col gap-4  lg:p-10  w-full rounded-lg ' onSubmit={
   

   handleSubmit(createClient)}>
<ModalBody className='flex flex-col gap-3'>
     
            <label htmlFor='lastName' className='font-semibold text-sm'>Nom :</label>
            <input   className='form-input rounded-md bg-slate-50   py-3 px-2' id='lastName'
            placeholder='Veuillez inscrire le nom de votre athlète'  {...register('lastName')}
            
           />
           <p className='text-xs font-semibold text-red-500'>{errors.lastName?.message}</p>
           <label htmlFor='firstName' className='font-semibold  text-sm' >Prénom :</label>

            <input placeholder='Veuillez inscrire le prénom de votre athlète'  
            id='firstName'   className='form-input rounded-md   py-3 px-2 bg-slate-50'
              {...register('firstName')}/>
                      <p className='text-xs font-semibold text-red-500'>{errors.firstName?.message}</p>

                      <label htmlFor='phoneNumber' className='font-semibold  text-sm' >Numéro de télphone :</label>

<input placeholder='Veuillez inscrire le numero de votre athlète'  
id='firstName' type={'tel'}   className='form-input rounded-md   py-3 px-2 bg-slate-50'
  {...register('phoneNumber')}/>
          <p className='text-xs font-semibold text-red-500'>{errors.phoneNumber?.message}</p>

                      <label htmlFor='email 'className='font-semibold text-sm'>Adresse email de votre ahtlète : </label>


            <input  type={'email'}  placeholder="Veuillez inscrire l'adresse email de votre athlète" 
              {...register('email')}  id='email'  className='
              form-input rounded-md bg-slate-50  py-3 px-2'     
                 />
                                       <motion.p ref={refTest}
                                       className='text-xs font-semibold text-red-500'> {errors.email?.message}</motion.p>

                                       <label className='font-semibold text-sm'
                                        htmlFor='confirmEmail'>Veuillez confirmer email de votre athlète :</label>

            <input  type={'email'}
             placeholder="Confirmer l'adresse email de votre athlète"   {...register('confirmEmail')}     className='form-input rounded-md bg-slate-50  py-3 px-2'   
                  />
                                        <p className='text-xs font-semibold text-red-500'>{errors.confirmEmail?.message}</p>

           

                                     
         </ModalBody>                 
        
          <ModalFooter  className=''>
            <div className='w-full flex justify-between'>
          <button className='text-slate-50 bg-slate-800 py-2 px-4 rounded-lg font-semibold' type='submit'>Ajouter</button>
          <Button onClick={()=>{
            reset()
            onClose()
            return 
            }}>Annuler</Button>
          </div>
         </ModalFooter>
         </motion.form>
         </ModalContent>
        
        </Modal>
        
      
      </>
      
    )
  }