import * as z from 'zod';


//premier validation de donner avec zod 
//j'ai mis les autres en optional pour mettre a zod de faire le calcul et de passer la verif pour chaque etapes

export const FirstValidationTypeSchema= z.object({
    dateFirstWeek: z.string().nonempty('Veuillez insérer une date'),
    hourStartFirstWeek: z.string().nonempty(),
    hourEndFirstWeek: z.string().nonempty(),
    dateSecondWeek: z.string().optional(),
    hourStartSecondWeek: z.string().optional(),
    hourEndSecondWeek: z.string().optional(),

   
    dateThirdWeek: z.string().optional(),
    hourStartThirdWeek: z.string().optional(),
    hourEndThirdWeek: z.string().optional(),
  
     
    }).refine((data)=>{

//first refine pour le premier formulaire

      const [hourStartFirstWeek=0, minuteStartFirstWeek=0] = data.hourStartFirstWeek.split(":").map(Number)
      const [hoursEndFirstWeek=0, minuteEndFirstWeek=0] = data.hourEndFirstWeek.split(":").map(Number)
  
    let TotalTimeStartFirstWeek=hourStartFirstWeek*60+minuteStartFirstWeek
    let TotalTimeEndWeek=hoursEndFirstWeek*60+minuteEndFirstWeek
    console.log(TotalTimeEndWeek)
    console.log(TotalTimeStartFirstWeek)
  
    if(TotalTimeEndWeek<=TotalTimeStartFirstWeek)
    {
     
      return false
  
    }

// message d'erreurs pour le premier formulaire erreur

   return true
  },{message: 'La date de fin de séance doit être supérieure',
  path:['hourEndFirstWeek']})

//fin du refine pour  verifier que la date de fin est superieru à l'autre





///deuxieme form validation je repete le meme processus 


  export const SecondValidationTypeSchema = z.object({
    dateFirstWeek: z.string().nonempty('Veuillez insérer une date'),
    hourStartFirstWeek: z.string().nonempty(),
    hourEndFirstWeek: z.string().nonempty(),

      dateSecondWeek: z.string().nonempty(),
      hourStartSecondWeek: z.string().nonempty().optional(),
      hourEndSecondWeek: z.string().nonempty().optional(),
      dateThirdWeek: z.string().optional(),
      hourStartThirdWeek: z.string().optional(),
      hourEndThirdWeek: z.string().optional(),
     
     
    }).refine((data)=>{

//premier refine

        const [hourStartFirstWeek=0, minuteStartFirstWeek=0] = data.hourStartFirstWeek.split(":").map(Number)
        const [hoursEndFirstWeek=0, minuteEndFirstWeek=0] = data.hourEndFirstWeek.split(":").map(Number)
  
      let TotalTimeStartFirstWeek=hourStartFirstWeek*60+minuteStartFirstWeek
      let TotalTimeEndWeek=hoursEndFirstWeek*60+minuteEndFirstWeek
      console.log(TotalTimeEndWeek)
      console.log(TotalTimeStartFirstWeek)
  
      if(TotalTimeEndWeek<=TotalTimeStartFirstWeek)
      {
       
        return false
  
      }
     return true
    },{message: 'La date de fin de séance doit être supérieure',
    path:['hourEndFirstWeek']}).refine((data)=>{
      let isPased=true
      if(data?.hourStartSecondWeek&&data?.hourEndSecondWeek)
      {
        let {hourStartSecondWeek,hourEndSecondWeek}=data
        if(hourStartSecondWeek.length>1&&hourEndSecondWeek.length>1)
        {
        const momo =data.hourStartFirstWeek
      const [hourStartSecondWeekT=0, minuteStartSecondWeek=0] = data?.hourStartSecondWeek?.split(":")?.map(Number)
      const [hoursEndSecondWeek=0, minuteEndSecondWeek=0] = data?.hourEndSecondWeek?.split(":").map(Number)
        console.log(data.hourStartSecondWeek)
        console.log(data.hourEndSecondWeek)

    let TotalTimeStartFirstWeek=hourStartSecondWeekT*60+minuteStartSecondWeek
    let TotalTimeEndWeek=hoursEndSecondWeek*60+minuteEndSecondWeek
    console.log(TotalTimeStartFirstWeek)
console.log(TotalTimeEndWeek)
    if(TotalTimeEndWeek<=TotalTimeStartFirstWeek)
    {
     console.log('false')
      return isPased=false

    }
  }
    return isPased
  }
  return isPased
  //fin de la deuxieme validation du formulaire
 
  },{message: 'La date de fin deu de séance doit être supérieure',
  path:['hourEndSecondWeek']})




  // troisieme validation de donnner 


  export const ThirdValidationTypeSchema = z.object({
    dateFirstWeek: z.string().nonempty('Veuillez insérer une date'),
    hourStartFirstWeek: z.string().nonempty(),
    hourEndFirstWeek: z.string().nonempty(),

      dateSecondWeek: z.string().nonempty(),
      hourStartSecondWeek: z.string().nonempty(),
      hourEndSecondWeek: z.string().nonempty(),
      dateThirdWeek: z.string().nonempty(),
      hourStartThirdWeek: z.string().nonempty(),
      hourEndThirdWeek: z.string().nonempty()
     
     
    }).refine((data)=>{

        //first date refine for troisieme date
        const [hourStartThirdWeekT=0, minuteStartThirdWeekT=0] = data.hourStartFirstWeek.split(":").map(Number)
        const [hoursEndThirdWeekT=0, minuteEndThirdWeekT=0] = data.hourEndFirstWeek.split(":").map(Number)
  
      let TotalTimeStartFirstWeek=hourStartThirdWeekT*60+minuteStartThirdWeekT
      let TotalTimeEndWeek=hoursEndThirdWeekT*60+minuteEndThirdWeekT
     
  
      if(TotalTimeEndWeek<=TotalTimeStartFirstWeek)
      {
       
        return false
  
      }
     return true
    },{message: 'La date de fin de séance doit être supérieure',
    path:['hourEndFirstWeek']}).refine((data)=>{


//deuxieme  date refine for hours troisieme form date

      let isPased=true
      if(data?.hourStartSecondWeek&&data?.hourEndSecondWeek)
      {
        let {hourStartSecondWeek,hourEndSecondWeek}=data
        if(hourStartSecondWeek.length>1&&hourEndSecondWeek.length>1)
        {
        const momo =data.hourStartFirstWeek
      const [hourStartSecondWeekT=0, minuteStartSecondWeek=0] = data?.hourStartSecondWeek?.split(":")?.map(Number)
      const [hoursEndSecondWeek=0, minuteEndSecondWeek=0] = data?.hourEndSecondWeek?.split(":").map(Number)
        console.log(data.hourStartSecondWeek)
        console.log(data.hourEndSecondWeek)

    let TotalTimeStartFirstWeek=hourStartSecondWeekT*60+minuteStartSecondWeek
    let TotalTimeEndWeek=hoursEndSecondWeek*60+minuteEndSecondWeek
    console.log(TotalTimeStartFirstWeek)
console.log(TotalTimeEndWeek)
    if(TotalTimeEndWeek<=TotalTimeStartFirstWeek)
    {
     console.log('false')
      return isPased=false

    }
  }
    return isPased
  }
  return isPased
  
 
  },{message: 'La date de fin deu de séance doit être supérieure',
  path:['hourEndSecondWeek']}).refine((data)=>{


    //second date refine for hours
    
          let isPased=true
          if(data?.hourStartSecondWeek&&data?.hourEndSecondWeek)
          {
            let {hourStartSecondWeek,hourEndSecondWeek}=data
            if(hourStartSecondWeek.length>1&&hourEndSecondWeek.length>1)
            {
            const momo =data.hourStartFirstWeek
          const [hourStartSecondWeekT=0, minuteStartSecondWeek=0] = data?.hourStartSecondWeek?.split(":")?.map(Number)
          const [hoursEndSecondWeek=0, minuteEndSecondWeek=0] = data?.hourEndSecondWeek?.split(":").map(Number)
            console.log(data.hourStartSecondWeek)
            console.log(data.hourEndSecondWeek)
    
        let TotalTimeStartFirstWeek=hourStartSecondWeekT*60+minuteStartSecondWeek
        let TotalTimeEndWeek=hoursEndSecondWeek*60+minuteEndSecondWeek
        console.log(TotalTimeStartFirstWeek)
    console.log(TotalTimeEndWeek)
        if(TotalTimeEndWeek<=TotalTimeStartFirstWeek)
        {
         console.log('false')
          return isPased=false
    
        }
      }
        return isPased
      }
      return isPased
      
     
      },{message: 'La date de fin deu de séance doit être supérieure',
      path:['hourEndThirdWeek']})


//derniere validation

      export const FourthValidationTypeSchema = z.object({
        dateFirstWeek: z.string().nonempty('Veuillez insérer une date'),
        hourStartFirstWeek: z.string().nonempty(),
        hourEndFirstWeek: z.string().nonempty(),
        dateFourthWeek:z.string(),
          dateSecondWeek: z.string().nonempty(),
          hourStartSecondWeek: z.string().nonempty(),
          hourEndSecondWeek: z.string().nonempty(),
          dateThirdWeek: z.string().nonempty(),
          hourStartThirdWeek: z.string().nonempty(),
          hourEndThirdWeek: z.string().nonempty(),

          hourStartFourthWeek:z.string(),
    hourEndFourthWeek:z.string(),
         
        }).refine((data)=>{
    
            //first date refine for troisieme date
            const [hourStartThirdWeekT=0, minuteStartThirdWeekT=0] = data.hourStartFirstWeek.split(":").map(Number)
            const [hoursEndThirdWeekT=0, minuteEndThirdWeekT=0] = data.hourEndFirstWeek.split(":").map(Number)
      
          let TotalTimeStartFirstWeek=hourStartThirdWeekT*60+minuteStartThirdWeekT
          let TotalTimeEndWeek=hoursEndThirdWeekT*60+minuteEndThirdWeekT
         
      
          if(TotalTimeEndWeek<=TotalTimeStartFirstWeek)
          {
           
            return false
      
          }
         return true
        },{message: 'La date de fin de séance doit être supérieure',
        path:['hourEndFirstWeek']}).refine((data)=>{
    
    
    //deuxieme  date refine for hours troisieme form date
    
          let isPased=true
          if(data?.hourStartSecondWeek&&data?.hourEndSecondWeek)
          {
            let {hourStartSecondWeek,hourEndSecondWeek}=data
            if(hourStartSecondWeek.length>1&&hourEndSecondWeek.length>1)
            {
            const momo =data.hourStartFirstWeek
          const [hourStartSecondWeekT=0, minuteStartSecondWeek=0] = data?.hourStartSecondWeek?.split(":")?.map(Number)
          const [hoursEndSecondWeek=0, minuteEndSecondWeek=0] = data?.hourEndSecondWeek?.split(":").map(Number)
            console.log(data.hourStartSecondWeek)
            console.log(data.hourEndSecondWeek)
    
        let TotalTimeStartFirstWeek=hourStartSecondWeekT*60+minuteStartSecondWeek
        let TotalTimeEndWeek=hoursEndSecondWeek*60+minuteEndSecondWeek
        console.log(TotalTimeStartFirstWeek)
    console.log(TotalTimeEndWeek)
        if(TotalTimeEndWeek<=TotalTimeStartFirstWeek)
        {
         console.log('false')
          return isPased=false
    
        }
      }
        return isPased
      }
      return isPased
      
     
      },{message: 'La date de fin deu de séance doit être supérieure',
      path:['hourEndSecondWeek']}).refine((data)=>{
    
    
        //quatrieme date date refine for hours
        
              let isPased=true
              if(data?.hourStartSecondWeek&&data?.hourEndSecondWeek)
              {
                let {hourStartSecondWeek,hourEndSecondWeek}=data
                if(hourStartSecondWeek.length>1&&hourEndSecondWeek.length>1)
                {
                const momo =data.hourStartFirstWeek
              const [hourStartSecondWeekT=0, minuteStartSecondWeek=0] = data?.hourStartSecondWeek?.split(":")?.map(Number)
              const [hoursEndSecondWeek=0, minuteEndSecondWeek=0] = data?.hourEndSecondWeek?.split(":").map(Number)
                console.log(data.hourStartSecondWeek)
                console.log(data.hourEndSecondWeek)
        
            let TotalTimeStartFirstWeek=hourStartSecondWeekT*60+minuteStartSecondWeek
            let TotalTimeEndWeek=hoursEndSecondWeek*60+minuteEndSecondWeek
            console.log(TotalTimeStartFirstWeek)
        console.log(TotalTimeEndWeek)
            if(TotalTimeEndWeek<=TotalTimeStartFirstWeek)
            {
             console.log('false')
              return isPased=false
        
            }
          }
            return isPased
          }
          return isPased
          
         
          },{message: 'La date de fin deu de séance doit être supérieure',
          path:['hourEndFourth  Week']})