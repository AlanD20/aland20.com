import { NextPage } from 'next';
import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import _ from 'lodash';
import DeleteModelButton from './DeleteModelButton';

type Props = {
  children?: ReactNode;
  createBtn?: boolean;
  deleteBtn?: number;
  action: string;
  name?: string;
  model: string;
  url?: string;
};

const BodyHeader: NextPage<Props> = ({
  children,
  action,
  model,
  name,
  url,
  createBtn = false,
  deleteBtn = 0,
}: Props) => {
  const router = useRouter();

  const handleGoBack = () =>
    url
      ? router.replace(`/dashboard/${url.toLowerCase()}`)
      : router.replace('/dashboard');

  return (
    <div className="dashboard-page__header">
      <button type="button" className="btn go-back" onClick={handleGoBack}>
        ▼
      </button>
      <div className="title">
        {_.capitalize(action)}
        <span className="highlight">{name}</span>
        {model}
      </div>
      {children}

      {createBtn && (
        <Link
          className="btn btn--primary"
          href={`/dashboard/${model.toLowerCase()}s/create`}
        >
          Add {model}
        </Link>
      )}

      {Boolean(deleteBtn) && <DeleteModelButton model={model} id={deleteBtn} />}
    </div>
  );
};

export default BodyHeader;
