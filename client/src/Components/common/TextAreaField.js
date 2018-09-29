import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaField = ({
    name,
    placeholder,
    value,
    errors,
    info,
    change,
    type
}) => {
    return(<div className="form-group">
                  
              <textarea type={type} 
                    className={classnames("form-control form-control-lg" , {
                                'is-invalid' : errors
                            })}
                    placeholder={placeholder} 
                    name={name}
                    value={value}
                    onChange= {change} />
                {
                    info && <small className='form-text text-muted'> {info} </small>
                }
                {
                    errors && <div className='invalid-feedback' > {errors} </div> 
                }
        </div>
    )
}

TextAreaField.defaultProps = {
    type : 'text'
}

TextAreaField.propTypes = {
    errors : PropTypes.string,
    placeholder : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    change : PropTypes.func.isRequired,
    type : PropTypes.string,
    info : PropTypes.string,
    value: PropTypes.string.isRequired,
}


export default TextAreaField;