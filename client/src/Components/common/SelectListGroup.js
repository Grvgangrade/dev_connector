import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
    name,
    value,
    errors,
    change,
    type,
    option
}) => {
    
    const selectoptions = option.map(option => 
        <option key={option.label} value={option.value} >
            {option.label}
        </option>
    );
    
    return(<div className="form-group">
                  
              <select type={type} 
                    className={classnames("form-control form-control-lg" , {
                                'is-invalid' : errors
                            })}
                    name={name}
                    value={value}
                    onChange= {change} >
                        {selectoptions}
                </select>
                
                {
                    errors && <div className='invalid-feedback' > {errors} </div> 
                }
        </div>
    )
}


SelectListGroup.propTypes = {
    errors : PropTypes.string,
    name : PropTypes.string.isRequired,
    change : PropTypes.func.isRequired,
    type : PropTypes.string,
    value: PropTypes.string.isRequired,
    option: PropTypes.array.isRequired
}


export default SelectListGroup;