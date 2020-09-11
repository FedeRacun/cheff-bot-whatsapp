const recetaCtrler = {};
const Receta = require('../models/recetas')

function getRandom(max) {
    if (max !== 0) max--;
    const number=  0 + Math.random() * (max - 0);
    return number.toFixed();
}

recetaCtrler.getRecetas =
    async (req, res) => {
        console.log(req.body)
        const query = req.body;
        Receta.find(query)
            .exec( (err, recetaDB)=> {
                if( err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                };

                res.json({
                    receta: recetaDB
                })
            })
    }

recetaCtrler.postRecetas =
    async (req, res) => {

        const body = req.body;

        let receta = new Receta({
            name: body.name,
            difficulty: body.difficulty,
            time: body.time,
            ingredients: body.ingredients,
            type: body.type,
            steps: body.staps,
            glutenFree: body.glutenFree,
            userName: body.userName
        });

        receta.save( (err, recetaDB) => {
            if( err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            };


            res.json({
                ok: true,
                receta: recetaDB
            })

        })
    }


module.exports = recetaCtrler;