import { Tag } from '@prisma/client';
import { NextPage } from 'next';

type Props = {
  id: number;
  title: string;
  tags: Tag[];
};

const SkillList: NextPage<Props> = ({ id, title, tags }: Props) => {
  return (
    <div className="card" key={id}>
      <div className="card__header">
        <h3 className="card__title">{title}</h3>
        <ul className="tag-list list-disc text-sm">
          {tags.map((tag) => (
            <i className="tag-list__item" key={tag.id}>
              {tag.name}
            </i>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillList;
