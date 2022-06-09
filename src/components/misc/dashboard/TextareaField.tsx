import { NextPage } from "next"

type Props = {
  title: string;
  name: string;
  defaultValue?: string;
}

const TextareaField: NextPage<Props> = ({ title, name, defaultValue }: Props) => {

  return (
    <div className="field">
      <label htmlFor={name}>{title}</label>
      <textarea
        name={name}
        id={name}
        required
        defaultValue={defaultValue ?? ''}
      >
      </textarea>
    </div>
  )
}

export default TextareaField
