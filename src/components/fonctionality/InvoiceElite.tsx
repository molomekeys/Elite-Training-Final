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



// Create component


type InvoiceInfo={
    price_coach: number;
    price_client: number;
    createdAt: Date;
    hours: number;
    type_offer: string;
    place: string;
}
type CoachData={
 
    numero_siren: string;
    isValid: boolean;
    coachName:string | null | undefined;

}
interface PropsInterface{
billInfo:InvoiceInfo[]
coachData:CoachData
roomName:string
}
    

const InvoiceElite = ({billInfo,coachData,roomName}:PropsInterface) => 

{


const coachingInfo=billInfo.filter((e)=>{
    return e.type_offer==='coaching'
})
const programmeInfo=billInfo.filter((e)=>{
    return e.type_offer==='programme'
})
const totalPriceCoaching=coachingInfo.reduce((acc,current)=>{
    return current.price_coach
},0)
const totalHoursCoaching=coachingInfo.reduce((acc,current)=>{
    return current.hours
},0)
const totalPriceProgramme=programmeInfo.reduce((acc,current)=>{
    return current.price_coach
},0)
const totalHoursProgramme=programmeInfo.reduce((acc,current)=>{
    return current.hours
},0)
//J'utilise useMemo pour faire du caching l'information(pour pas la recalculer)

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
        <View style={{width:'100%',gap:10}}>
            <Text style={styles.stylesFooterTitle}>{coachData?.coachName?.toLocaleUpperCase()} COACH SPORTIF</Text>

        </View>
   
      
      <View style={{alignItems:'flex-end',marginBottom:'10px',gap:'10px',display:'flex'}}>
      <View style={{flexDirection:'row',display:'flex',width:'100%',marginVertical:20,
   alignItems:'center',}}>
        <Text style={[styles.stylesFooterTitle,{textAlign:'left'}]}>Salle : {roomName}</Text>

      </View>
      <Text style={[styles.stylesFooterTitle,{textAlign:'left'}]}>Date : Le {new Date().toLocaleDateString()} </Text>


      </View>
      
      <View style={{display:'flex',padding:10,fontSize:'12px',borderTopLeftRadius:'15%',borderTopRightRadius:'15%'
      ,flexDirection:'row',alignItems:'center',width:'100%',color:'#FFDA8A',marginTop:'30px',
      backgroundColor:"#282F44",justifyContent:'space-between'}}>
            <Text  >
                Description
            </Text>
            <Text>
               Hours
            </Text>
            
            <Text>
               Total

            </Text>
      </View>
      <View style={styles.tableStyle}>
       
  
{totalPriceCoaching>0&&<View style={{display:'flex',gap:'10px',
flexDirection:'row',justifyContent:'space-between',fontSize:'11px',padding:'10px',alignItems:'center'}}>
<Text style={{}}>Coaching</Text>
<Text>{totalHoursCoaching}</Text>
<Text>{totalPriceCoaching}</Text>
</View>}
{totalHoursProgramme>0&&<View style={{display:'flex',gap:'10px',
flexDirection:'row',justifyContent:'space-between',fontSize:'11px',alignItems:'center',padding:'10px'}}>
<Text>Programme</Text>
<Text>{totalHoursProgramme}</Text>
<Text>{totalPriceProgramme} </Text>
</View>}
      </View>
      <View style={styles.totalSection}>
            <View style={{width:'100%',gap:10,fontSize:'11px'}}>
                <Text style={styles.stylesFooterTitle}>{'FACTURÉ À'}</Text>
               
               <Text style={styles.stylesFooterTitle}>ELITE TRAINING</Text>
               <Text style={{fontFamily:'Helvetica-Bold'}}>{`25 Rue Aimé Requet`}</Text>
               <Text  style={{fontFamily:'Helvetica-Bold'}}>3800 Grenoble</Text>
               <Text style={styles.stylesFooterTitle}>France</Text>
               <Text  style={{fontFamily:'Helvetica-Bold',fontSize:'12px'}}></Text>
            </View>
            <View style={{width:'100%',alignItems:'flex-end',fontSize:'11px',gap:10}}>
                <View style={{alignItems:'flex-end',gap:10}}>
                <Text>Grand total :{totalPriceCoaching+totalPriceProgramme}</Text>
                <Text>TVA non applicable,art. 293 du CGI</Text>
                </View>
                <View style={{flexDirection:'row',fontSize:'12px',borderRadius:'25%',
                paddingTop:20,padding:10,justifyContent:'space-between',gap:20,backgroundColor:'#282F44',color:'#FFDA8A'}}>
                <Text >Grand total   </Text>
                <Text> {totalPriceCoaching+totalPriceProgramme} euro TTC</Text>
                </View>
            </View>
           
            
      </View>
      <View style={{width:'100%',alignItems:'flex-end',fontSize:'11px',gap:10}}>
                <View style={{alignItems:'flex-end',gap:10}}>
                <Text style={{fontSize:'20px',fontFamily:'Helvetica-Bold'}}>MERCI</Text>
                <Text style={{fontSize:'15px',fontFamily:'Helvetica-Bold'}}>{coachData.coachName?.toLocaleUpperCase()}</Text>
                <Text style={{fontSize:'15px'}}>SIRET : {coachData.numero_siren}</Text>

                </View>
                
            </View>
      </View>
    </Page>
  </Document>
)};

export default InvoiceElite;
