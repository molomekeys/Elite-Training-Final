import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,Button,useDisclosure,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
  } from '@chakra-ui/react'
  import { useRef } from 'react'
  interface ModalValidateCoach{
    isOpen:boolean
    onOpen:()=>void 
    onClose:()=>void
   
    }
const CoachAlerteValidation = ({isOpen,onClose,onOpen}:ModalValidateCoach) => {
 
        const cancelRef = useRef(null)
      
        return (
          <>
           
      
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                   En attente de validation
                  </AlertDialogHeader>
      
                  <AlertDialogBody>
                    Votre carte professionnelle est en attente de validation
                  </AlertDialogBody>
      
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose} colorScheme='red'>
                        confirmer
                    </Button>
                   
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
        
      
  )
}
export default CoachAlerteValidation