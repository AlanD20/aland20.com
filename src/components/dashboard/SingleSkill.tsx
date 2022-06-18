import { NextPage } from 'next';
import { Skill, Tag } from '@prisma/client';
import SingleModelCard from '@comp/dashboard/SingleModelCard';
import TextBlock from '@misc/dashboard/TextBlock';

type Props = Skill & {
  tags: Tag[];
};

const SingleSkill: NextPage<Props> = ({ id, title, priority, tags }: Props) => {
  const model = 'Skill';

  return (
    <SingleModelCard model={model} id={id}>
      <TextBlock title="Priority:" content={priority} inline />
      <TextBlock title="Title:" content={title} />
      <TextBlock title="Tags:" tags={tags} />
    </SingleModelCard>
  );
};

export default SingleSkill;
