import { useForm } from 'react-hook-form';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,useMediaQuery,
    ModalFooter,
   
    ModalCloseButton,Button
  } from '@chakra-ui/react'
  import {useDisclosure} from '@chakra-ui/react'
  import {useRef, useState} from 'react'
import { api } from '~/utils/api';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {v4} from 'uuid'


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
    const {data,isLoading} = api.adminRouter.allOfer.useQuery(undefined,{staleTime:200000})
    const initialRef = useRef(null)
    const finalRef = useRef(null)


  
    const { register, handleSubmit ,formState:{errors},reset} = useForm(
      
      {defaultValues:{email:'',lastName:'',firstName:'',confirmEmail:'',
    coachPriceOneWeek:"",clientPriceOneWeek:"",
    coachPriceTwoWeek:"",clientPriceTwoWeek:"",
    coachPriceThreeWeek:"",clientPriceThreeWeek:"",
    coachPriceFourWeek:"",clientPriceFourWeek:""
    
    
    
    }, resolver: zodResolver(validationSchema),});


        const[stepFormSalle,setStepFormSalle]=useState(1)
//function async pour creer un client au niveau de firebase

function createClient(data:ClientData) {

    const{confirmEmail,...dataToSave}= data

  console.log(dataToSave)
}
  
 
//fin de la function fermeture de l'appp
if(isLoading){
  return <p></p>
}
const allProgramme=data?.programme.map((e)=>{
return(<option value={e.id} key={v4()}>{e. coach_price}</option>)
})
const allCoaching=data?.coaching.map((e)=>{
return (<option value={e.id} key={v4()}>{e?.name[0]?.toLocaleUpperCase()+e.name?.slice(1)}</option>)
})

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
         <label className="font-bold text-sm">Inscrire le nom de la salle  :</label>
<input {...register('lastName')} type={'text'} placeholder="Veuillez inscrire le nom de la salle"
 className='w-full form-input bg-slate-100  rounded-md py-3'/>
<p className='text-xs font-bold text-sm text-red-500'>{errors.lastName?.message}</p>

<label className="font-bold text-sm">Inscrire le numero de telephone  :</label>

<input {...register('lastName')} type={'text'} placeholder="Veuillez inscrire l'adresse de la salle"
 className='w-full form-input bg-slate-100  rounded-md py-3'/>
<p className='text-xs font-bold text-sm text-red-500'>{errors.lastName?.message}</p>

<label className="font-bold text-sm">Inscrire l'adresse de la salle  :</label>

<input {...register('lastName')} type={'text'} placeholder="Veuillez inscrire l'adresse de la salle"
 className='w-full form-input bg-slate-100  rounded-md py-3'/>
<p className='text-xs font-bold text-sm text-red-500'>{errors.lastName?.message}</p>

<label className="text-xs font-bold text-slate-900">Selectionner une offre coaching</label>
<select  className='bg-slate-50  border-slate-400 
          py-3  w-full  rounded-md'>
  {allCoaching}
</select>
<label className="text-xs font-bold text-slate-900">Selectionner une offre coaching</label>
<select  className='bg-slate-50  border-slate-400 
          py-3  w-full  rounded-md'>
  {allProgramme}
</select>
        
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