import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    errors,
    info,
    change,
    disabled,
    type
}) => {
    return(<div className="form-group">
                  
              <input type={type} 
                    className={classnames("form-control form-control-lg" , {
                                'is-invalid' : errors
                            })}
                    placeholder={placeholder} 
                    name={name}
                    value={value}
                    onChange= {change}
                    disabled={disabled}/>
                {
                    info && <small className='form-text text-muted'> {info} </small>
                }
                {
                    errors && <div className='invalid-feedback' > {errors} </div> 
                }
        </div>
    )
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

TextFieldGroup.propTypes = {
    errors : PropTypes.string,
    placeholder : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    change : PropTypes.func.isRequired,
    type : PropTypes.string.isRequired,
    info : PropTypes.string,
    disabled : PropTypes.string,
    value: PropTypes.string.isRequired
}


export default TextFieldGroup;