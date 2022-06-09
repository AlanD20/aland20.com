import { Tag } from '@prisma/client'
import { NextPage } from 'next'
import { MouseEventHandler } from 'react'

type Props = {
  tags: Tag[],
  handleClickEvent?: MouseEventHandler<HTMLLIElement>,
}

const TagList: NextPage<Props> = ({ tags, handleClickEvent }: Props) => {
  return (
    <ul className="tag-list">
      {tags.map(tag => (
        <li
          onClick={handleClickEvent}
          className="tag-list__item"
          data-id={tag.id}
          data-name={tag.name}
          data-strict={tag.strict}
          key={tag.id}
        >
          {tag.name}
        </li>
      ))}
    </ul>
  )
}

export default TagList
