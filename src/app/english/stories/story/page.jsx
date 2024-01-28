import React from 'react';
import FireEngineDisplay from './FireEngineDisplay'; // Ajusta la ruta según tu estructura de archivos

const App = () => {
  const data = 
    {
        "Big bold fire engines, waiting day and night": "Motores de fuego grandes y audaces, esperando día y noche",
        "ready for a rescue or a blazing fire to fight.": "listos para un rescate o para luchar contra un fuego ardiente.",
        "As soon as there's a fire alarm,": "Tan pronto como hay una alarma de fuego,",
        "the engine starts to roar.": "el motor comienza a rugir.",
        "The firefighters jump aboard; it rumbles out the door.": "Los bomberos saltan a bordo; retumba al salir por la puerta.",
        "Watch the engine speeding, on its daring dash.": "Observa el motor acelerando, en su atrevida carrera.",
        "Hear its siren screaming. See its bright lights flash.": "Escucha su sirena gritando. Mira sus luces brillantes parpadear.",
        "In helmets, fireproof pants, and jackets,": "Con cascos, pantalones y chaquetas ignífugas,",
        "boots so big and strong,": "botas tan grandes y fuertes,",
        "the crew is dressed and ready as the engine zooms along.": "la tripulación está vestida y lista mientras el motor avanza a toda velocidad.",
        "When the engine finds the fire,": "Cuando el motor encuentra el fuego,",
        "it quickly pulls up near.": "se detiene rápidamente cerca.",
        "The crew jumps out, unrolls the hose,": "La tripulación salta, desenrolla la manguera,",
        "and gets out all the gear.": "y saca todo el equipo.",
        "The hose points up its nozzle and shoots a jet of spray.": "La manguera apunta con su boquilla y dispara un chorro de spray.",
        "It squirts right at the blazing flames and sizzles them away.": "Rocía directamente a las llamas ardientes y las hace desaparecer con un siseo.",
        "The water tank is empty soon,": "El tanque de agua se vacía pronto,",
        "so where can more be found?": "entonces, ¿dónde se puede encontrar más?",
        "The engine's pump can pull it up from pipes below the ground.": "La bomba del motor puede extraerlo de tuberías debajo del suelo.",
        "The fire is hot and roaring.": "El fuego está caliente y rugiente.",
        "It makes a lot of smoke.": "Produce mucho humo.",
        "The firefighters put on masks; otherwise, they'd choke.": "Los bomberos se ponen máscaras; de lo contrario, se asfixiarían.",
        "The ladder rises upward. It reaches for the sky.": "La escalera se eleva hacia arriba. Alcanza el cielo.",
        "A fire engine's ladder stretches up so very high!": "¡La escalera de un motor de fuego se extiende tan alto!",
        "Sometimes there's a platform, right up at the top.": "A veces hay una plataforma, justo en la parte superior.",
        "It waits beside the window. Then into it you hop.": "Espera junto a la ventana. Luego, te subes.",
        "At last, the fire's extinguished.": "Finalmente, el fuego se apaga.",
        "The flames are all put out.": "Las llamas se apagan por completo.",
        "Lower the ladder. Roll the hose.": "Baja la escalera. Enrolla la manguera.",
        "\"Hurrah!\" the fire crew shouts.": "\"¡Hurra!\" grita la tripulación de bomberos.",
        "Back inside the station,": "De vuelta dentro de la estación,",
        "the crew can take a break.": "la tripulación puede tomar un descanso.",
        "But the fire engine's ready and it's waiting wide-awake.": "Pero el motor de fuego está listo y espera totalmente despierto."
            
  };

  return (
    <div className='h-screen w-screen'>
      <h1>Fire Engine Information</h1>
      <FireEngineDisplay data={data} />
    </div>
  );
};

export default App;
