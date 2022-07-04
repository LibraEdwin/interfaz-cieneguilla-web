const urlApi = `${process.env.URI_API}/api-cieneguilla-service`

export async function getAllPaquetes () {
  return await fetch(`${urlApi}/paquete-turistico`)
    .then(res => res.json())
    .then(data => data.body)
}
