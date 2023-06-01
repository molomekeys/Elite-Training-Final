import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import { useMediaQuery } from '@chakra-ui/media-query';
import 'moment/locale/fr'; // import the French locale

import "../../styles/specifiqueStyleCalendar.css"
type SingleEvent={
 
  start:Date
  end:Date
  resource?:{
   
    customMessage?:string
  }
  customInfo?:string
}
interface Props {
  event:SingleEvent[];
  // getInfo:(e:any)=>void
  // openTheMod:()=>void
  // openTheEvent:()=>void
}

function CalendarComponent({event}:Props) {


  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const modalSize = isLargerThan768 ? "650px" : "800px";

  const messages = {
    allDay: 'Toute la journée',
    previous: 'Précédent',
    next: 'Suivant',
    today: 'Aujourd\'hui',
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Heure',
    event: 'Événement',
    showMore:()=>`...`
  };
  
  moment.locale('fr', {
    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse : /PD|MD/,
    isPM : function (input) {
        return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem : function (hours) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // Used to determine first week of the year.
    }
});
  const localizer = momentLocalizer(moment); // initialize the localizer with Moment.js
  


//cela change la couleur d'une celule

const eventStyleGetter = (event:any, start:Date, end:Date, isSelected:any) => {

  // change the color based on the event type

  const style = {
    backgroundColor:'red',
    borderRadius: '3px',
    opacity: 0.8,
    color: 'F5F5F5',
    border: '2px',
    fontSize:'15px',
    width:'90%',
    display: 'block',
    padding: '1px 10px',
    marginLeft:'12px'
  };

  const today = new Date()
  if (event.end < new Date()) { // check if the event has already ended
    style.backgroundColor = 'black'; // set background color to grey for finished events
    style.opacity = 0.6
    return {style}; // reduce opacity for finished events
  }
  
  if (event.type === 'meeting') {
    style.backgroundColor = '#f0'
    return {style};
  } else if (event.type === 'appointment') {
    style.backgroundColor = '#064e3b'
    return {style};
  }
 
   
    if(start.getDay=== today.getDay){
      if(start.getMonth=== today.getMonth){

      style.backgroundColor='#0d9488'
    
        return {
          style
        };
    }
 
  }
  
  if (event.end > new Date()) { // check if the event has already ended
   style.backgroundColor='#064e3b'
    return {style}; // reduce opacity for finished events
  }

  return {
    style,
  };
};
const customDayPropGetter = (date:any) => {
 
    return {
     
      className: 'testBro',
      style: {
        
      }
    
  
}
}
console.log(event)
  return (
    <div className=" h-full  ">
     <Calendar
     popup
     
     resourceIdAccessor="resource.id"
     resourceTitleAccessor="resource.title"
     
    
  localizer={localizer}
  style={{height:modalSize}}
  culture='fr'
  dayPropGetter={customDayPropGetter}
  eventPropGetter={eventStyleGetter}
  events={event} 
  messages={messages}// replace with your own events array
  startAccessor="start"
  
  // onSelectEvent={(e)=>{getInfo(e)
  // openTheMod()}}
  endAccessor="end"
  selectable
  
  
/>

    </div>
  )
}

export default CalendarComponent
