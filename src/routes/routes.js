const {Router} = require('express');
const router = Router();

const {getRecetas,postRecetas} = require('../controllers/receta.controller');

//  BUSQUEDA
router.route('/recetas')
    .get(getRecetas)
    .post(postRecetas)

router.route('/')
    .get((req,res)=>{
        res.send(`<span style="
        font-size: 3rem;
        border-radius: 6%;
        padding: 10px;
        position: absolute;
        top: 50%;
        left: 32%;
    ">Server status: </span> <span style="
        font-size: 3rem;
        background-color: lightgreen;
        border-radius: 15%;
        padding: 10px;
        position: absolute;
        top: 50%;
        left: 56%;
        color: white;
    ">ON</span>`)
    })


module.exports = router;