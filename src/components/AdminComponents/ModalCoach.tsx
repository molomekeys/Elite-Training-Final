
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
interface ModalCoachType{
isOpen:boolean
onOpen:()=>void 
onClose:()=>void
}
const ModalCoach = ({isOpen,onClose,onOpen}:ModalCoachType) => {
   

  return (
  
      <>
       
  
        <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Profil de </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    
  )
}
export default ModalCoach