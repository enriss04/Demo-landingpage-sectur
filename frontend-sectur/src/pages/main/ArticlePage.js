import Card from "../../components/main/CardArticulos"
//import Articulos from "../assets/articulos.json"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ArticlePage() {
  const navigate = useNavigate()

  const [Articulos, setArticulos] = useState([{
    id_articulo: 0,
    titulo_articulo: '',
    imagen_articulo: 'noimage.png'
  }])

  const loadArticles = async () => {
    const response = await fetch(process.env.REACT_APP_URL_BACKEND + '/consulta_articulos')
    const data = await response.json()
    if (data.message) {
      alert(data.message);
      return
    }
    setArticulos(data)
  }

  const MostrarArticulo = (ID_Article) => {
    navigate(`/Informacion_articulo/${ID_Article}`)
  }

  useEffect(() => {
    loadArticles()
  }, [])


  return (
    <div>
      {Articulos.length > 0 ? (
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-8 justify-items-center my-7">
          {
            Articulos.map((articulo) => {
              return (
                <div key={articulo.id_articulo} onClick={() => MostrarArticulo(articulo.id_articulo)}>
                  <Card img={articulo.imagen_articulo} title={articulo.titulo_articulo} />
                </div>
              )
            })
          }
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
          <img className="w-20 h-20" loading="lazy" src={require("../../assets/Gro.png")} alt="ImagenGro" />
        </div>
      )
      }
    </div>

  )
}
