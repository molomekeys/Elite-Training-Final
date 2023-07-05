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
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                 <p>{customMessage}</p>
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
export default SuccescChange