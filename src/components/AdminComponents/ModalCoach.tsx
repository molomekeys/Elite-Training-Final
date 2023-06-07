
import { useForm } from 'react-hook-form';
import {
    Modal,
    ModalOverlay,
    ModalContent,ModalBody,
    ModalHeader,useMediaQuery,
    ModalFooter,
   
    ModalCloseButton,Button
  } from '@chakra-ui/react'
  import {useDisclosure} from '@chakra-ui/react'
  import {useRef, useState} from 'react'

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ClientDataType } from '~/pages/admin/coach';
interface ModalCoachType{
isOpen:boolean
onOpen:()=>void 
onClose:()=>void
coachInfo:ClientDataType
}
const ModalCoach = ({isOpen,onClose,onOpen,coachInfo}:ModalCoachType) => {
   
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    const modalSize = isLargerThan768 ? "xl" : "full";
  return (
  
      <>
       
  
        <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{coachInfo.name} </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             <section className='font-semibold'>
                <p>Numero : {coachInfo.phone_number}</p>
                <p>Clients : {coachInfo.clients}</p>
                <p>Email : {coachInfo.email}</p>
                <p>Numero Siren : {coachInfo.numero_siren}</p>
                <p>Licence sportif : </p>
             </section>
            </ModalBody>
  
            <ModalFooter>
              <Button className='text-slate-800' mr={3} onClick={onClose}>
               Fermer
              </Button>
              <Button variant='ghost'>Validation de la licence</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    
  )
}
export default ModalCoach