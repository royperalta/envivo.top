import Style from './PopUp.module.css'

const PopUp = ({onClose,children}) =>{
    
    return(
        <div className={Style.popup}>
            <div className={Style.popUpContent}>                
                {children}
                <button onClick={onClose} className={Style.closeBtn}>
                    X
                </button>
            </div>
        </div>
    )
}

export default PopUp