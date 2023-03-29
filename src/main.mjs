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
// let tarefa = [
//     {
//         id: 0,
//         descripcion: "Unha tarefa de exemplo",
//         rematada: true,
//     }
 
// ]

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
// app.get("/tarefa/", controladorGet)
// app.put("/tarefa/", controladorPut)
// app.delete("/tarefa/", controladorDelete)

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

app.delete("/tarefa/",async(peticion,resposta)=>{
    try{
        const tarefa = await Tarefa.findByPk(peticion.body.id)
        await tarefa.destroy()
        resposta.status(200)
        resposta.send("Ok")
    }
    catch (error){
     resposta.status(500)
     resposta.send(error)
    }
})

app.put("/tarefa/",async(peticion,resposta)=>{
    try{
        const tarefa= await Tarefa.findByPk(peticion.body.id)
        await tarefa.update(peticion.body)
        resposta.status(200)
        resposta.send("Ok")
    } catch(error){
        resposta.status(500)
        resposta.send("error.")
    }
})
   


     
  
   


// function controladorGet (peticion, resposta) {
//     resposta.status(200)
//     resposta.send(JSON.stringify(tarefa))
// }

app.get("/tarefa/", async (peticion, respuesta)=>{
    if (peticion.query.id) {
        try {
            const tarefa = await Tarefa.findByPk(peticion.query.id)
            respuesta.setHeader("Content-Type", "application/json")
            respuesta.status(200)
            respuesta.send(tarefa.toJSON()) 
        } catch (error) {
            respuesta.status(500)
            respuesta.send('Error.')
        }
    } else  {
        try {
            const todasAsTarefas = await Tarefa.findAll()
            respuesta.setHeader("Content-Type", "application/json")
            respuesta.status(200)
            respuesta.send(JSON.stringify(todasAsTarefas))
        } catch (error) {
            respuesta.status(500)
            respuesta.send('Error.')
        }
    }
})






// Posta en marcha da aplicación de Express
app.listen( 8000, function () {
    console.log("Express traballando...");
})