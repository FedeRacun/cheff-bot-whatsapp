const MESSAGES = {}

MESSAGES.NOTACTION = `Perdon, aun estoy aprendiendo 🤓
Solo puedo entender platos de una sola palabra, en singular y que tengan un '#' al principio ej:
*#vegano*

Si quieres conocer todas las opciones dime *#opciones*`;

MESSAGES.DEFAULT = `Lo siento, encontre nada 😔
Si quieres ver todas las opciones que conozco dime:

*#opciones*

Si quisieras hacer combinaciones como:
"un plato vegano dificil"
basta con agregarle un guion y la primer letra de la dificultad [ *f* , *m* o *d* ], ejemplo:
*#vegano-d*
y si buscas recetas libre de gluten añade ' *-tacc* ' al final
*#vegano-d-tacc*`;

MESSAGES.OPTIONS = `🧐 Las opciones son:

*#facil*
*#medio*
*#dificil*
*#vegetariano*
*#vegano*
*#postre*
*#añadir*

Si quisieras hacer combinaciones como:
"un plato vegano dificil" basta con agregarle un guion y la primer letra de la dificultad [ *f* , *m* o *d* ], ejemplo:
*#vegano-d*
y si buscas recetas libre de gluten añade ' *-tacc* ' al final
*#vegano-d-tacc*`;

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

module.exports = MESSAGES