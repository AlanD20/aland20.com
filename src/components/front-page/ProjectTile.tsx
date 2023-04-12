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
      <Link
        className="btn btn--secondary"
        href={sourceLink}
        target="_blank"
        rel="noreferrer"
        passHref
      >
        Source Code
      </Link>
      <Link
        className="btn btn--primary"
        href={previewLink}
        target="_blank"
        rel="noreferrer"
        passHref
      >
        Live demo
      </Link>
    </div>
  </div>
);

export default ProjectTile;
