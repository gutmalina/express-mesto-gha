import {useState, useEffect} from "react";

function ButtonSubmit({name, onIsButtonSubmitValid, contentButton}){
  const [isDisabled, setIsDisabled] = useState(true)

/**определение цветовой темы для кнопки */
  const temeButton = ()=>{
    if(name !== "autorization"){
      if(isDisabled){
        return 'button_teme_dark button_teme_dark_invalid'
      }else{
        return 'button_teme_dark'
      }
    }else{
      if(!isDisabled){
        return 'button_teme_ligh button_teme_light_invalid'
      }else{
        return 'button_teme_ligh'
      }
    }
  }
const classNameButtonSubmit = `button button-submit button_type_save-${name} button_style_save ${temeButton()}`

/** кнопка Submit disabled */
  const addButtonDisable=()=>{
    setIsDisabled(true)
  }
/** кнопка Submit удалить disabled */
  const removeButtonDisable=()=>{
    setIsDisabled(false)
  }

/** Изменение состояния кнопки Submit в зависимости от валидности input*/
  useEffect(()=>{
    if(onIsButtonSubmitValid){
      addButtonDisable()
    }else{
      removeButtonDisable()
    }
  }, [onIsButtonSubmitValid])

  return(
    <button
      type="submit"
      className={classNameButtonSubmit}
      disabled={isDisabled}>
        {contentButton}
    </button>
  )
}

export default ButtonSubmit;
