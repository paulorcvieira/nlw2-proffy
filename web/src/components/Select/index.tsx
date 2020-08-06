import React, { SelectHTMLAttributes } from 'react'
import { v1 as uuidv1 } from 'uuid';

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}
const Select: React.FC<SelectProps> = ({ name, label, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>Selecione uma opção</option>
        {options.map(option => {
          return <option key={uuidv1()} value={option.value}>{option.label}</option>
        })}
      </select>
    </div>
  )
}

export default Select