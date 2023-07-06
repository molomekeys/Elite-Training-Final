import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,Button,useDisclosure,
    ModalCloseButton,
  } from '@chakra-ui/react'
  interface PropsInterface{
    customMessage:string
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
  }
const SuccescChange = ({customMessage,isOpen,onClose,onOpen}:PropsInterface) => {
   
      
  return (
    
    
          <>
           
      
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                 <p>{customMessage}</p>
                </ModalBody>
      
                <ModalFooter>
                  <Button colorScheme='gray' mr={3} onClick={onClose}>
                    Fermer
                  </Button>
                  
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        
      
  )
}
export default SuccescChange