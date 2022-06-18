import { NextPage } from 'next';
import { ReactNode } from 'react';
import AlertStatus from '@misc/AlertStatus';

type Props = {
  children: ReactNode;
};

const ListModelCard: NextPage<Props> = ({ children }: Props) => {
  return (
    <>
      <AlertStatus />

      <div className="list-model">{children}</div>
    </>
  );
};

export default ListModelCard;
