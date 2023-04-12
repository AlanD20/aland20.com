import { NextPage } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  model: string;
  id: number;
  sm?: boolean;
  md?: boolean;
};

const SingleModelCard: NextPage<Props> = ({
  children,
  model,
  id,
  sm,
  md,
}: Props) => {
  const clsSmall = sm ? 'single-model--sm' : '';
  const clsMedium = md ? 'single-model--md' : '';
  const cls = `single-model ${clsSmall}${clsMedium}`;

  return (
    <div className={cls} key={id}>
      <div className="single-model__left">{children}</div>
      <div className="single-model__right">
        <Link
          className="btn btn--primary btn--green pen-icon"
          href={`/dashboard/${model.toLowerCase()}s/${id}/edit`}
          as={`/dashboard/${model.toLowerCase()}s/${id}/edit`}
          passHref
        >
          ✎
        </Link>
      </div>
    </div>
  );
};

export default SingleModelCard;
