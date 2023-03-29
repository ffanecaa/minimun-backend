import express from "express"
import cors from "cors"

// Creamos e configuramos a aplicación de Express
const app = express()
app.use(cors()) // Aceptar peticións desde outras URL
app.use(express.json()) // Manexar os datos recibidos como JSON

// O noso almacen de datos.
// Normalmente en lugar do array atoparemos unha base de datos.
let tarefa = [
    {
        id: 0,
        descripcion: "Unha tarefa de exemplo",
        rematada: true,
    }
 
]

// Definicions de endpoints
app.post("/tarefa/", controladorPost)
app.get("/tarefa/", controladorGet)
app.put("/tarefa/", controladorPut)
app.delete("/tarefa/", controladorDelete)

// Controladores executados polos endpoints
function controladorPost (peticion, resposta) {
    tarefa.push(peticion.body)
    resposta.status(201)
    resposta.send("Ok")
}
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