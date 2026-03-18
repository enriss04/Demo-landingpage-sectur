import "../../styles/stylespage/CardArticulos.css";

export default function TransparencyPage() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <button type="button">
        <a
          className="btn1 btn-primary font-extrabold xl:text-5xl text-3xl p-8"
          target='_blank'
          rel="noopener noreferrer"
          href="https://transparencia.guerrero.gob.mx/sujeto_obligado/oficina-de-la-gubernatura/secretaria-de-turismo/">
          Ir al nuevo portal de transparencia
        </a>
      </button>
    </div>
  )
}
