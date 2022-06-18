import TagList from '@misc/TagList';
import { Tag } from '@prisma/client';
import { NextPage } from 'next';

type Props = {
  title: string;
  content?: string | JSX.Element | JSX.Element[] | number;
  link?: string;
  inline?: boolean;
  tags?: Tag[];
};

const TextBlock: NextPage<Props> = ({
  title,
  content,
  link,
  tags,
  inline = false,
}: Props) => {
  const cls = inline ? ' inline-pg' : '';
  return (
    <div className={`text-block${cls}`}>
      <h1 className="single-model__title">{title}</h1>

      {!link && content && <p className="single-model__text">{content}</p>}

      {!link && tags && <TagList tags={tags} />}

      {link && (
        <a
          className="link single-model__text"
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {content}
        </a>
      )}
    </div>
  );
};

export default TextBlock;
