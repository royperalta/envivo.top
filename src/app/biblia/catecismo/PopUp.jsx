import Style from './PopUp.module.css'
import { IoMdCloseCircle } from "react-icons/io";

const PopUp = ({onClose,color,children}) =>{
    
    return(
        <div className={Style.popup}>
            <div className={`${Style.popUpContent} ${color ? 'bg-green-400':'bg-white'}`}>                
                {children}              

               
                {color ? <button
                 className='bg-white p-3 rounded-md block w-full'
                 onClick={onClose}>OK</button>: <IoMdCloseCircle onClick={onClose} className={Style.closeBtn} />}
            </div>
        </div>
    )
}

export default PopUp