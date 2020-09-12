const MESSAGES = {}


MESSAGES.DEFAULT = `Lo siento, aun estoy aprendiendo 🤓
Solo puedo entender platos de una sola palabra y en singular ej:
*vegano*

Si quieres ver todas las opciones que conozco dime:

*opciones*

Si quisieras hacer combinaciones como:
"un plato vegano dificil"
basta con agregarle un guion y la primer letra de la dificultad [ *f* , *m* o *d* ], ejemplo:
*vegano-d*
y si buscas recetas libre de gluten añade ' *-tacc* ' al final
*vegano-d-tacc*`;

MESSAGES.OPTIONS = `🧐 Las opciones son:

*facil*
*medio*
*dificil*
*vegetariano*
*vegano*
*postre*
*añadir*
*proximos*

Si quisieras hacer combinaciones como:
"un plato vegano dificil" basta con agregarle un guion y la primer letra de la dificultad [ *f* , *m* o *d* ], ejemplo:
*vegano-d*
y si buscas recetas libre de gluten añade ' *-tacc* ' al final
*vegano-d-tacc*`;

MESSAGES.RECIPE = (recetaRandom) =>{
    if(!recetaRandom) return 'Mi memoria debe estar fallando, no recuerdo ningun plato con esas caracteristicas'

    let ingredientsToString = '';

    recetaRandom.ingredients.forEach(item => {
        ingredientsToString += item + ' | '
    });
    return `Puedes preparar *${recetaRandom.name}* :

Los ingredientes son: ${ingredientsToString? ingredientsToString : ''}

Te llevará aproximadamente ${recetaRandom.time} minutos. ${!!recetaRandom.steps? `

Puedes ver la receta aquí: ${recetaRandom.steps}` : ''}`;
}

MESSAGES.ADD = `Si quieres contribuir añadiendo alguna receta puedes hacerlo desde aqui:

https://cheff-bot.herokuapp.com`;


MESSAGES.PROXIMOS= ` Nota del Dev📝:
Esta es una pequeña lista de cosas que quiero agregar a futuro, si se te ocurren algo mas no dudes en usar la palabra clave "sugerencia" o comentarmelo a knispel.federico@gmail.com

⏳Poder buscar platos por ingredientes
⏳Poder buscar platos por el tiempo que toma prepararlos
⏳Optimizar tiempos de respuesta
⏳Mejorar la interpretacion del lenguaje humano
❌Bajar el dolar
⏳Añadir categoria de postres veganos`;
module.exports = MESSAGES