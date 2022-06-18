import { NextPage } from 'next';
import HTMLToReactNode from '@misc/HTMLToReactNode';

type Props = {
  id: number;
  title: string;
  content: string;
};

const SingleFAQ: NextPage<Props> = ({ id, title, content }: Props) => {
  return (
    <details className="single-faq" key={id}>
      <summary role="button" className="single-faq__title">
        <h3>{title}</h3>
        <span className="arrow">➤</span>
      </summary>
      <HTMLToReactNode content={content} />

      {/* <p className="single-faq__content">
                {content}
            </p> */}
    </details>
  );
};

export default SingleFAQ;
