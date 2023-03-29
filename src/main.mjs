import express from "express"
import cors from "cors"
import { Sequelize, DataTypes } from "sequelize"

// Creamos e configuramos a aplicación de Express
const app = express()
app.use(cors()) // Aceptar peticións desde outras URL
app.use(express.json()) // Manexar os datos recibidos como JSON

const sequelize = new Sequelize({
 dialect:'sqlite',
 storage:'./Database.sqlite'
});

// O noso almacen de datos.
// Normalmente en lugar do array atoparemos unha base de datos.
let tarefa = [
    {
        id: 0,
        descripcion: "Unha tarefa de exemplo",
        rematada: true,
    }
 
]

const Tarefa = sequelize.define('tarefa',{
    descripcion:{
        type:DataTypes.STRING
    },
   rematada:{
       type: DataTypes.BOOLEAN
    }
});

await sequelize.sync({ alter: true })
//creamos base datos

// 

// Definicions de endpoints
// app.post("/tarefa/", controladorPost)
app.get("/tarefa/", controladorGet)
app.put("/tarefa/", controladorPut)
app.delete("/tarefa/", controladorDelete)

// Controladores executados polos endpoints
app.post("/tarefa/",async (peticion, resposta)=> {
    try{
  const tarefa = await Tarefa.create(peticion.body)

  resposta.setHeader("content-Type","application/json")
    resposta.status(201)
    resposta.send(tarefa.toJSON())
} catch(error){
    resposta.status(500)
    resposta.send("Error.")
}
})


function controladorDelete (peticion, resposta) {
    console.log(peticion.body)
     let indice =tarefa.findIndex(estatarefa => estatarefa.id === peticion.body.id)
      tarefa.splice(indice,1)
      resposta.status(200)
       resposta.send("Ok")

   
}
function controladorPut (peticion, resposta) {
    console.log(peticion.body)
     let indice =tarefa.findIndex(estatarefa => estatarefa.id === peticion.body.id)
  
      tarefa.splice(indice,1,peticion.body)
      resposta.status(200)
      resposta.send("Ok")
  
   
}

function controladorGet (peticion, resposta) {
    resposta.status(200)
    resposta.send(JSON.stringify(tarefa))
}




// Posta en marcha da aplicación de Express
app.listen( 8000, function () {
    console.log("Express traballando...");
})