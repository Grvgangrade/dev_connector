import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
    name,
    placeholder,
    value,
    errors,
    change,
    icon,
    type
}) => {
    return(<div className="input-group mb-3">
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className={icon} />
                    </span>
                </div>
                  
              <input type={type} 
                    className={classnames("form-control form-control-lg" , {
                                'is-invalid' : errors
                            })}
                    placeholder={placeholder} 
                    name={name}
                    value={value}
                    onChange= {change} />
                
                {
                    errors && <div className='invalid-feedback' > {errors} </div> 
                }
        </div>
    )
}

InputGroup.defaultProps = {
    type: 'text'
}


InputGroup.propTypes = {
    errors : PropTypes.string,
    placeholder : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    change : PropTypes.func.isRequired,
    type : PropTypes.string,
    value: PropTypes.string.isRequired,
}


export default InputGroup;