import { NextPage } from 'next';
import Link from 'next/link';
import { Project, Tag } from '@prisma/client';
import HTMLToReactNode from '@misc/HTMLToReactNode';

type Props = Project & {
  tags: Tag[];
};

const ProjectTile: NextPage<Props> = ({
  id,
  title,
  content,
  sourceLink,
  previewLink,
  createdDate,
  completedDate,
  tags,
}: Props) => (
  <div className="card" key={id}>
    <div className="card__header">
      <h3 className="card__title">{title}</h3>
      <ul className="tag-list">
        {tags.map((tag) => (
          <i className="tag-list__item" key={tag.id}>
            {tag.name}
          </i>
        ))}
      </ul>
    </div>

    {(createdDate || completedDate) && (
      <div className="card__date">
        {createdDate && (
          <p>
            Created Date:{' '}
            <span className="italic">{createdDate?.toString()}</span>
          </p>
        )}

        {completedDate && (
          <p>
            Completed Date:{' '}
            <span className="italic">{completedDate?.toString()}</span>
          </p>
        )}
      </div>
    )}
    <HTMLToReactNode content={content} />

    <div className="card__footer">
      <Link href={sourceLink} passHref>
        <a className="btn btn--secondary" target="_blank" rel="noreferrer">
          Source Code
        </a>
      </Link>
      <Link href={previewLink} passHref>
        <a className="btn btn--primary" target="_blank" rel="noreferrer">
          Live demo
        </a>
      </Link>
    </div>
  </div>
);

export default ProjectTile;
