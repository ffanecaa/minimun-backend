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
    },
    {
        id: 2,
        descripcion: "Unha tarefa",
        rematada: true,
    },
    {
        id: 3,
        descripcion: "Unha tarefa nova",
        rematada: true,
    },
    {
        id: 4,
        descripcion: "Unha tarefa nova",
        rematada: true,
    }
]

// Definicions de endpoints
app.post("/tarefa/", controladorPost)
app.get("/tarefa/", controladorGet)

// Controladores executados polos endpoints
function controladorPost (peticion, resposta) {
    tarefa.push(peticion.body)
    resposta.status(201)
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