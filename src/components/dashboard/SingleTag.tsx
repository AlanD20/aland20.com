import SingleModelCard from '@comp/dashboard/SingleModelCard';
import TextBlock from '@misc/dashboard/TextBlock';
import { NextPage } from 'next'
import React from 'react'

type Props = {
  id: number;
  name: string;
}

const SingleTag: NextPage<Props> = ({ id, name }: Props) => {

  const model = 'Tag';

  return (
    <SingleModelCard model={model} id={id} sm >
      <TextBlock title="Tag Name:" content={name} />
    </SingleModelCard>
  )
}

export default SingleTag
