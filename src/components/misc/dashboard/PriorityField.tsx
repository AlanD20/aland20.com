import { NextPage } from "next"


type Props = {
  defaultValue?: number;
}

const PriorityField: NextPage<Props> = ({ defaultValue }: Props) => {
  return (
    <div className="field">
      <label htmlFor="priority">Priority: (1 - 100)</label>
      <input type="number" min="1" max="100" name="priority" id="priority" defaultValue={defaultValue} required />
    </div>
  )
}

export default PriorityField
