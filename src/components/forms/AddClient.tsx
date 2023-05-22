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

export default function AddClient() {

 
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const modalSize = isLargerThan768 ? "3xl" : "full";
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const[succesAddClient,setSuccesAddClient]=useState(false)
    const[isClientAdded,setIsAddClient]=useState(false)
    const finalRef = useRef(null)
   
    const { register, handleSubmit ,formState:{errors},watch,reset} = useForm(
      
      {defaultValues:{email:'',lastName:'',firstName:'',confirmEmail:''}, resolver: zodResolver(validationSchema),});



//function async pour creer un client au niveau de firebase

async function createClient(data:ClientData){
//   const{confirmEmail,...dataToSave}=data
//   console.log(dataToSave)
//   const checkingUser:{succes:string} =await fetch('/api/createUser',{method:'POST',headers: {
//     'Content-Type': 'application/json',
//   },body:JSON.stringify({email:data.email,password:'slt'})}).then((res)=>res.json())
//   console.log(checkingUser)

// //   await createUserWithEmailAndPassword(dataToSave?.email,

//   if(checkingUser.succes.length>10)
//   {
 
//     const clientRef= await doc(db,'clients',checkingUser.succes)
//     await setDoc(clientRef,{
      
//       dateDeSuivi: new Date(),
//       coach: id,
//       firstName:` ${dataToSave.firstName[0].toLocaleUpperCase()}${dataToSave.firstName.slice(1)}`,
//       lastName:` ${dataToSave.lastName[0].toLocaleUpperCase()}${dataToSave.lastName.slice(1)}`

//     }).then(async (e)=>{
//       const docRef =doc(db,`users/${user?.uid}/clients`,checkingUser.succes)
//       setDoc(docRef,{
//         dateDeSuivi:new Date()
//         ,id:user?.uid,
//          firstName:` ${dataToSave.firstName[0].toLocaleUpperCase()+''+dataToSave.firstName.slice(1)}`,
//         lastName:` ${dataToSave.lastName[0].toLocaleUpperCase()+''+dataToSave.lastName.slice(1)}`
        
//            })

//     })
//     reset()
//     setIsAddClient(true)}
    onClose()
   
  
  }
    
 
  


// fin de la function fermeture de l'appp


    return (
      <>
        <button onClick={onOpen} className="relative bg-[rgb(19,28,46)] text-slate-50 font-semibold py-2 px-3 rounded-lg">

        Ajouter un client

        </button>
       

        
       
        <Modal  size={modalSize}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          
  <ModalOverlay />

         <ModalContent>
         <ModalHeader className='text-center text-slate-700 font-semibold '>Vous ajouter un nouveau client</ModalHeader>
          <ModalCloseButton className='text-slate-200 '  />


          <form className='flex  flex-col gap-4 p-2 lg:p-10  w-full ' onSubmit={
   

   handleSubmit(createClient)}>
<ModalBody className='flex flex-col gap-3'>
     
            <label htmlFor='lastName' className='font-semibold text-sm'>Nom :</label>
            <input   className='form-input rounded-md bg-slate-100  border-2 border-slate-400 py-2 px-2' id='lastName'
            placeholder='Veuillez inscrire le nom de votre athlète'  {...register('lastName')}
            
           />
           <p className='text-xs font-semibold text-red-500'>{errors.lastName?.message}</p>
           <label htmlFor='firstName' className='font-semibold  text-sm' >Prénom :</label>

            <input placeholder='Veuillez inscrire le prénom de votre athlète'  
            id='firstName'   className='form-input rounded-md  border-2 border-slate-400 py-2 px-2 bg-slate-100'
              {...register('firstName')}/>
                      <p className='text-xs font-semibold text-red-500'>{errors.firstName?.message}</p>

                      <label htmlFor='email 'className='font-semibold text-sm'>Adresse email de votre ahtlète : </label>


            <input  type={'email'}  placeholder="Veuillez inscrire l'adresse email de votre athlète" 
              {...register('email')}  id='email'  className='
              form-input rounded-md bg-slate-100 border-2 border-slate-400 py-2 px-2'     
                 />
                                       <p className='text-xs font-semibold text-red-500'> {errors.email?.message}</p>

                                       <label className='font-semibold text-sm'
                                        htmlFor='confirmEmail'>Veuillez confirmer email de votre athlète :</label>

            <input  type={'email'}
             placeholder="Confirmer l'adresse email de votre athlète"   {...register('confirmEmail')}     className='form-input rounded-md bg-slate-100 border-2 border-slate-400 py-2 px-2'   
                  />
                                        <p className='text-xs font-semibold text-red-500'>{errors.confirmEmail?.message}</p>

           

                                     
         </ModalBody>                 
        
          <ModalFooter >
            <div className='w-full flex justify-between'>
          <button className='text-slate-50 bg-cyan-800 py-2 px-4 rounded-lg font-semibold' type='submit'>Sauvegarder</button>
          <Button onClick={()=>{
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