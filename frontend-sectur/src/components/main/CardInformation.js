import "../../styles/stylespage/cardinfo.css";

export default function CardInformation({ Image, titleInfo, TextInfo }) {
    return (
        <div className='flex justify-center h-20 w-full my-1'>
            <div className='flex MainContainerDPrin'>
                <div className='ContainerLogoDPrin'>
                    <img className="iconsDPrin cursor-pointer" loading="lazy" src={Image} alt="iconfacebook" />
                </div>

                <div className='ContainerWordDPrin'>
                    <div className="overlayDPrin">
                        <p className="TitleDPrin font-medium text-xl PageTitle2">{titleInfo}</p>
                        <p className="TextDPrin font-semibold text-base PageText1">{TextInfo}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}  