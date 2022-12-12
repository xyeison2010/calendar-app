import { useState } from "react";
import styles from "./styles/Home.module.css";

type  Event  ={
  id: string;
  date: Date;
  title: string;
}
/* tenms un map dentro de otro map ,key = año.mes.dia y adentro value 
 aca esta map de eventos,donde los id son unicos 
*/
type Schedule = Map<string, Map<string, Event>>; // spanish , el horario

function App() {
  const [date, setDate] = useState<Date>(() => new Date());
  const [schedule, setSchedule] = useState<Schedule>(() => new Map()); /* inicializacmos con map vacio */

  const handleMonthChange = (offset: number) => {
    const copyDate = structuredClone(date);
    copyDate.setMonth(date.getMonth() + offset);
    setDate(copyDate);
  };

  const handleNewEvent = (newKey: string) => {
    const draft = structuredClone(schedule);

    if (!draft.has(newKey)) {
      draft.set(newKey, new Map());
    }
    const day = draft.get(newKey);
    const id = String(  Date.now());
    const title = window.prompt("event title");//guarda la rpta en title

    if (!title) return;
    day.set(id, {
      id,
      title,
    });

    setSchedule(draft);
  };
  const handleDeleteEvent = ( newKey : string ,id : string) =>{
const copySchedule = structuredClone(schedule)
 const day =  copySchedule.get(newKey);
 day.delete(id)
 setSchedule(copySchedule)
  }
  console.log(schedule);
  return (
    <>
      <div className={styles.container}>
        <head></head>

        <main className={styles.main}>
          <nav className={styles.nav}>
            <button onClick={() => handleMonthChange(-1)}>←</button>
            {date.toLocaleString("es-Ar", { month: "long", year: "numeric" })} {/* local español ,long  texto largo*/}
            <button onClick={() => handleMonthChange(1)}>→</button>
            <button onClick={() => setDate(new Date())}>Today</button>
          </nav>
          <div className={styles.calendar}>
          
               {Array.from({length : 7} , (_,i) => (<div key={i} style={{textAlign:"center" ,fontSize:"20px"}}>
              {new Date( date.getFullYear(), date.getMonth(),i+1).toLocaleDateString("es-Ar", { weekday: "long"}) }
                </div> )  ) }
           
            

            {/*arrayfrom, mapFn toma 2 argumentos */}
            {Array.from(
              {length: new Date( date.getFullYear(), date.getMonth() + 1,0).getDate(), },
              (length, i) => {
                const newKey = `${date.getFullYear()}/${date.getMonth()}/${ i + 1}`; /* 2022/11/19 */
                const events = schedule.get(newKey); 
                return (
                  <div  onClick={() => handleNewEvent(newKey)}  key={i}  className={styles.day} >
                
        
                    {i + 1} {/* ya q la fecha empieza de 0 contar */}
                    {events && (
                      <div style={{display:"flex" , flexDirection:"column" , gap:6}}>
                        {Array.from(events.values()).map((event) => (
                          <div key={event.id}  onClick={(e) =>{ e.stopPropagation(); handleDeleteEvent(newKey ,event.id)}}
                          style={{ padding:"2px 6px",borderRadius:"4"}}>
                            {event.title} </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
