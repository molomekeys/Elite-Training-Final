import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,useDisclosure
  } from '@chakra-ui/react'
  import { useRef } from 'react'

  interface Props{
    isOpen:boolean,onOpen:()=>void,onClose:()=>void
  }
const HoursErrors = ({isOpen,onClose,onOpen}:Props) => {
    const cancelRef = useRef(null)
  return (
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
    <AlertDialogOverlay>
    <AlertDialogContent>
      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
       erreur 
      </AlertDialogHeader>

      <AlertDialogBody>
       Vous devez inscrire un nombre d'heures rond 
      </AlertDialogBody>

      <AlertDialogFooter className='flex gap-4'>
        <button className='bg-slate-800 text-slate-100 px-4  py-2 rounded-lg  ' ref={cancelRef} onClick={onClose}>
         Confirmer
        </button>
        <button  className='bg-red-600 px-4 rounded-lg py-2 text-slate-100 ' onClick={onClose} >
         Fermer
        </button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialogOverlay>
</AlertDialog>)
}
export default HoursErrors