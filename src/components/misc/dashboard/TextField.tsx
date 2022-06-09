import { NextPage } from 'next';
import React from 'react'

type Props = {
  type?: string;
  title: string;
  name: string;
  defaultValue?: string | number;
  required?: boolean;
}

const TextField: NextPage<Props> = ({
  title, name, defaultValue, type = 'text', required = true
}: Props) => {
  return (
    <div className="field">
      <label htmlFor={name}>{title}</label>
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        defaultValue={defaultValue ?? ''}
      />
    </div>
  )
}

export default TextField
