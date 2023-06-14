import "../../styles/stylespage/CardArticulos.css";

export default function CardArticulos({ img, title }) {

  return (
    <div className="ArticleCard">
      <div className="h-full xl:w-4/12 w-5/12">
        <img src={require = (process.env.REACT_APP_GET_IMG_ARTICULO + img)} alt="Avatar" className="h-full w-full p-3"/>
      </div>
      <div className="flex items-center xl:w-8/12 w-7/12 p-2 textStyle">
        <p className="PageText2 text-[#3d3d3d] xl:text-lg sm:text-lg text-base font-semibold">{title}</p>
      </div>
    </div>
  )
}
