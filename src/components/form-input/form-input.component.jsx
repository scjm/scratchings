import './form-input.component.scss'

const FormInput = (props) => {

    const {inputLabel, ...otherProps} = props

    return(
        <div className="group">
        <input className="form-input"{...otherProps}/>
        {inputLabel && 
            <label className={`${otherProps.length ? 'shrink': ''} form-input-label`}>
            {inputLabel}
            </label>}
        </div>
    )
}

export default FormInput;