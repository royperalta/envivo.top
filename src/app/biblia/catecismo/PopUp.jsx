import Style from './PopUp.module.css'
import { IoMdCloseCircle } from "react-icons/io";
import { AiFillSound } from "react-icons/ai";

const PopUp = ({ onClose, color, children, play }) => {

    return (
        <div className={Style.popup}>
            <div className={`${Style.popUpContent} ${color ? 'bg-green-400' : 'bg-white'}`} >
                <div onClick={play} className='flex justify-center items-center gap-1'>
                    <div><AiFillSound /></div>
                    <div>{children}</div>
                </div>

                {color ? <button
                    className='bg-white p-3 rounded-md block w-full'
                    onClick={onClose}>OK</button> : <IoMdCloseCircle onClick={onClose} className={Style.closeBtn} />}
            </div>
        </div>
    )
}

export default PopUp