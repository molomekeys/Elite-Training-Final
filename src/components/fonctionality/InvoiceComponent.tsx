import React,{useMemo} from 'react';
import { Page, Text, View, Document, StyleSheet ,Svg,Image,Font,Polygon,Polyline} from '@react-pdf/renderer';

import {v4} from 'uuid'


// Create styles
const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
      },
  page: {
    backgroundColor: '#ffffff',
    padding: 0,
    display:'flex',
    
  },
  section: {
    marginBottom: 10,
    
  },
 
  tableStyle: {
    marginBottom: '50px',padding:10,borderBottomLeftRadius:'15%',borderBottomRightRadius:'15%',
    borderBottomColor:'black',borderBottomWidth:'1px',borderLeft:'1px',borderRight:'1px',borderColor:'black',paddingTop:'20px',gap:20,
  },
  title: {
    fontSize: '14px',
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,display:'flex',width:'100%',justifyContent:'space-between',
    flexDirection:'row'
  },
  totalSection:{
    display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between',fontSize:'10px'
  },stylesFooterTitle:{fontWeight:'bold',fontFamily:'Helvetica-Bold',color:'black',fontSize:'11px'}
});

// Create invoice data
const invoiceData = {
  invoiceNumber: 'INV-001',
  date: '2022-03-28',
  dueDate: '2022-04-28',
  items: [
    { description: 'Item 1', quantity: 1, price: 10 },
    { description: 'Item 2', quantity: 2, price: 20 },
  ],
};

// Create component
export interface DataEvent{
    
    dateStart: Date
    dateEnd:  Date
    price:number
    type:string
    hours:number
    salle:string
    category:string
        title:string
    
}
interface dataforPdf{
    dataEvent?:DataEvent[]
    dateRange?:{dateStart:Date,dateEnd:Date}
    hours?:number
    
}
const InvoiceComponent = ({dataEvent,dateRange,hours}:dataforPdf) => 

{
   let singlePrice=''
   let singleProgrammePrice=''
 let fullHoursCoaching=0
 let fullHoursProgramme=0
let fullCoachingPrice=0


//J'utilise useMemo pour faire du caching l'information(pour pas la recalculer)
const priceMemo=useMemo(()=>{
  let totalPrice=0
  let totalHours=0
  let allSalle:string[]=[]
const fullPrice=dataEvent&&dataEvent.map((e,index)=>{
  totalPrice+=(e.price)
  totalHours+=e.hours
  if(index==0)
  {
    allSalle.push(e.salle)
  }
  else if(index>0) {
      if(dataEvent[index-1]?.salle==e.salle)
      {

      }
      else{
        allSalle.push(e.salle)
      }
  } 
})
return {price:totalPrice,hours:totalHours,salle:allSalle}
},[dataEvent])

//autre test
   console.log(dataEvent)
   dataEvent?.map((e)=>{
    if(e.type==='coaching')
    {
     fullHoursCoaching+=e.hours
     fullCoachingPrice+=e.price
     
      // fullHoursCoaching+=(e.dateEnd.getTime()-e.dateStart.getTime())/(1000 * 60 * 60)

    }
    else if(e.type==='programme')
    {
     
      // fullHoursProgramme+=(e.dateEnd.getTime()-e.dateStart.getTime())/(1000 * 60 * 60)

    }
   })



   let fullPriceCoaching=Number(singlePrice)*fullHoursCoaching
   let fullPriceProgramme=Number(singleProgrammePrice)*fullHoursProgramme

   console.log(fullCoachingPrice)
   console.log(priceMemo)
  
    return (
        
  <Document >
    <Page size="A4" style={styles.page}>
  
       
       
    
        <View style={{width:'100%',display:'flex',backgroundColor:'#282F44',color:'#F7F7F7', marginBottom:'10px',
        flexDirection:'row',alignItems:'center'}}>
        
        <View style={{display:'flex',width:'100%',
        flexDirection:'row',alignItems:'center'}}>
            <Image src="/logo.png" style={styles.logo} />
           <View style={{flexDirection:'row',display:'flex'}}>
            <Text>Elite </Text>
            <Text>Training</Text>
            
            </View>
        </View>
        
        </View>
        <View style={{padding:30}}>
        <View style={{width:'100%'}}>
            <Text style={{fontSize:'12px',color:'black',textAlign:'left',padding:10}}>Coach : Teddy Martinez</Text>
        </View>
      <View style={{flexDirection:'row',display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center',alignContent:'center',padding:10}}>
        <Text style={styles.title}>Facture pour {invoiceData.invoiceNumber}</Text>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:'14px'}}>Salle : </Text>

      </View>
      </View>
      
      <View style={{alignItems:'flex-end',marginBottom:'10px',gap:'10px',display:'flex'}}>
      <Text style={styles.stylesFooterTitle}>Date de facturation : {dateRange?.dateStart?.toLocaleDateString()} </Text>
        <Text style={styles.stylesFooterTitle}>Date limite : {dateRange?.dateEnd?.toLocaleDateString()}</Text>
      </View>
      
      <View style={{display:'flex',padding:10,fontSize:'12px',borderTopLeftRadius:'15%',borderTopRightRadius:'15%'
      ,flexDirection:'row',alignItems:'center',width:'100%',color:'#FFDA8A',marginTop:'30px',
      backgroundColor:"#282F44",justifyContent:'space-between'}}>
            <Text  >
                Description
            </Text>
            <Text>
                Heures
            </Text>
            <Text>
                Taux
            </Text>
            <Text>
                Montant
            </Text>
      </View>
      <View style={styles.tableStyle}>
       
  
{priceMemo.price>0 &&<View style={{display:'flex',gap:'10px',
flexDirection:'row',justifyContent:'space-between',fontSize:'11px',padding:'10px',alignItems:'center'}}>
<Text style={{}}>Coaching</Text>
<Text>{hours}</Text>
<Text>{priceMemo.price/priceMemo.hours} </Text>
<Text>{priceMemo.price}</Text>
</View>}
{fullPriceProgramme>0&&<View style={{display:'flex',gap:'10px',
flexDirection:'row',justifyContent:'space-between',fontSize:'11px',alignItems:'center',padding:'10px'}}>
<Text>Programme</Text>
<Text>{fullHoursProgramme }</Text>
<Text>{singleProgrammePrice} </Text>
<Text>{`${fullPriceProgramme}`}</Text>
</View>}
      </View>
      <View style={styles.totalSection}>
            <View style={{width:'100%',gap:10,fontSize:'11px'}}>
                <Text style={styles.stylesFooterTitle}>METHODES DE PAIEMENTS</Text>
                <Text>Virement</Text>
               <Text style={styles.stylesFooterTitle}>Elite Training</Text>
               <Text>IBAN : FR76 1659 8000 0121 7362 9000 194</Text>
               <Text>BIC : FPELFR21XXX</Text>
               <Text style={styles.stylesFooterTitle}>COACH</Text>
               <Text>Teddy martinez</Text>
            </View>
            <View style={{width:'100%',alignItems:'flex-end',fontSize:'11px',gap:10}}>
                <View style={{alignItems:'flex-end'}}>
                <Text>Grand total : {priceMemo.price}</Text>
                <Text>Tva : N/A</Text>
                </View>
                <View style={{flexDirection:'row',fontSize:'12px',borderRadius:'25%',
                paddingTop:20,padding:10,justifyContent:'space-between',gap:20,backgroundColor:'#282F44',color:'#FFDA8A'}}>
                <Text >Grand total  </Text>
                <Text>{priceMemo.price} euro TTC</Text>
                </View>
            </View>
            
      </View>
      </View>
    </Page>
  </Document>
)};

export default InvoiceComponent;
