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
import { number } from 'zod';


// ce qui sera transmis au formulaire par react hook form 

type RoomData={
  
  email:string,name:string,adresse:string,offerId:string,programmeId:string,phoneNumber:string
}

//validation de donner à travers Zod
const validationSchema = z.object({
  email:z.string().email('Veuillez inscrire une adresse email valide'),
  name:z.string().min(3,'Veuillez inscrire un nom valide, minimun 3 caractères'),
  adresse:z.string().min(3,'Veuillez inscrire un prénom valide, minimun 3 caracteres'),
  programmeId:z.number(),offerId:z.number(),phoneNumber:z.string().length(10,'Numéro non valide ')

  })



//function qui affiche à l'ecran

export default function AddRoom() {


  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const modalSize = isLargerThan768 ? "5xl" : "full";
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {data,isLoading} = api.adminRouter.allOfer.useQuery(undefined,{staleTime:200000})
  const addRommRoute=api.adminRouter.addAvailaiblePlace.useMutation()
    const initialRef = useRef(null)
    const finalRef = useRef(null)


  
    const { register, handleSubmit ,formState:{errors}} = useForm(
      
      {defaultValues:{email:'',name:'',adresse:'',offerId:'',programmeId:'',phoneNumber:''
    
    
    
    } });

     
//function async pour creer un client au niveau de firebase


  
 
//fin de la function fermeture de l'appp
if(isLoading){
  return <p></p>
}
const allProgramme=data?.programme.map((e)=>{
return(<option value={`${e.id}`} key={v4()}>{e. coach_price}</option>)
})
const allCoaching=data?.coaching.map((e)=>{
return (<option value={`${e.id}`}  key={v4()}>{e?.name[0]?.toLocaleUpperCase()+e.name?.slice(1)}</option>)
})
async function createClient(data:RoomData) {
  console.log(data)

    const{adresse,email,offerId,name,programmeId}= data
  const addRommDefinetely= await addRommRoute.
  mutateAsync({adresse:adresse,email:email,name:name,
    relatedOffer:Number(offerId),programme_id:Number(programmeId)})
    console.log(addRommDefinetely)

    
  }

    return (
      <>
        <button onClick={onOpen} 
        className="relative  bg-slate-800 py-3 text-slate-50 font-semibold 
        py-2 px-3 rounded-lg">

        Ajouter une salle

        </button>
       

        
       
        <Modal  size={modalSize}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={()=>{
            
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
<input {...register('name')} type={'text'} placeholder="Veuillez inscrire le nom de la salle"
 className='w-full form-input bg-slate-100  rounded-md py-3'/>
<p className='text-xs font-bold text-sm text-red-500'>{errors.name?.message}</p>
<label className="font-bold text-sm">{`Inscrire l'adresse email  :`}</label>
<input {...register('email')} type={'email'} placeholder="Veuillez inscrire l'adresse email de la salle"
 className='w-full form-input bg-slate-100  rounded-md py-3'/>
<p className='text-xs font-bold text-sm text-red-500'>{errors.name?.message}</p>

<label className="font-bold text-sm">Inscrire le numero de telephone  :</label>

<input {...register('phoneNumber')} type={'text'} placeholder="Veuillez inscrire l'adresse de la salle"
 className='w-full form-input bg-slate-100  rounded-md py-3'/>
<p className='text-xs font-bold text-sm text-red-500'>{errors.phoneNumber?.message}</p>

<label className="font-bold text-sm">{"Inscrire l'adresse de la salle :"}</label>

<input {...register('adresse')} type={'text'} placeholder="Veuillez inscrire l'adresse de la salle"
 className='w-full form-input bg-slate-100  rounded-md py-3'/>
<p className='text-xs font-bold text-sm text-red-500'>{errors.adresse?.message}</p>

<label className="text-xs font-bold text-slate-900">Selectionner une offre coaching</label>
<select {...register('offerId')}
 className='bg-slate-50  border-slate-400 
          py-3  w-full  rounded-md'>
                <option value={''}>{`Veuillez sélectionner un choix`}</option>
  {allCoaching}
</select>
<label className="text-xs font-bold text-slate-900">Selectionner une offre coaching</label>
<select   {...register('programmeId')}
className='bg-slate-50  border-slate-400 
          py-3  w-full  rounded-md'>
            <option value={''}>{`Veuillez sélectionner un choix`}</option>
  {allProgramme}
</select>
<div className='flex items-center justify-center'> 
  
</div>

          <ModalFooter >
            <div className='w-full flex justify-between'>
            <button type='submit'
   className='bg-slate-700 py-4 px-12 mt-4 rounded-xl  text-slate-50 w-fit'>Valider</button>
          
          <Button onClick={
           ()=> {   
                onClose()}}>Annuler</Button>
          </div>
         </ModalFooter>
         </form>
         </ModalContent>
        
        </Modal>
        
      
      </>
    )
  }