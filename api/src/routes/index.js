const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { getAllPoke } = require("../recyclableFunctions/utilsFunctions");
const axios = require("axios");
const { Pokemon, Tipo } = require("../db");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get("/pokemon", async (req, res) => {
  const { name } = req.query; // destructuro nombre de req.query
  let allPoke = await getAllPoke(); // llamo a todos los poke d api y db
  try{
  if (name) {
    // si tengo nombre por query
    let pokeName = await allPoke.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    ); // pongo includes por si algun personaje tiene 2 nombres
    if (pokeName.length) {
      // si encontro nombre
      res.status(200).send(pokeName); // devuelvo el nombre del poke
    } else {
      res.status(404).send("No se encontro el nombre del Pokemon"); // si no encontro no duelvo
    }
  } else {
    res.status(200).send(allPoke); // si no me lo pasan por query devuelvo todos los pokes
  }} catch (error){
    console.log(error)
  }
});

router.get("/pokemon/:id", async (req, res) => {
  //misma logica que arriba
  const { id } = req.params;
//   console.log(req.params)
  const allPoke = await getAllPoke();
  
  if (id) {
      try{
    let pokeId = await allPoke.filter((e) => e.id == id);
    if (pokeId.length) {
      res.status(200).send(pokeId);
    } else {
      res.status(404).send("No se encontro el id del Pokemon");
    }} catch(error){
        console.log(error)
    }
  }
});

router.post("/pokemon", async (req, res) => {
    const { name, hp, attack, defense,height, weight, types, img } =
      req.body;
      // console.log(req.body)
    const createdPoke = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      height,
      weight,
      img,
    });
    const typeDB = await Tipo.findAll({ // busco los types que esten en el modelo que coincidan con body
      where: { name: types }
    });

    await createdPoke.addTipo(typeDB); // al poke que me cree le agrego los typos que vengan por body
    res.send(createdPoke);
  });

  

router.get("/tipo", async (req, res) => {
  let getTipoApi = await axios.get("https://pokeapi.co/api/v2/type");
  // console.log(getTipoApi)
  let getAllTipo = getTipoApi.data.results.map((e) => e.name); // me traigo los tipos y los mapeo
  // console.log(getAllTipo)
  getAllTipo.forEach((e) => { // a cada tipo le digo encontralo o crealo
    Tipo.findOrCreate({
      where: { name: e },
    });
  });
  let allTipo = await Tipo.findAll(); // me traigo todos los tipos
  return res.send(allTipo);
});





module.exports = router;
