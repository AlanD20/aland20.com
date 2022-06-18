import { NextPage } from 'next';
import BodyHeader from '@comp/dashboard/BodyHeader';
import { tag } from '@/models/tag';
import { Tag } from '@prisma/client';
import CreateModelForm from '@comp/dashboard/CreateModelForm';
import PriorityField from '@misc/dashboard/PriorityField';
import TagListSelection from '@misc/dashboard/TagListSelection';
import TextField from '@misc/dashboard/TextField';

type Props = {
  tags: Tag[];
};

const CreateSkill: NextPage<Props> = ({ tags }: Props) => {
  const model = 'Skill';

  return (
    <main className="dashboard-page">
      <BodyHeader action="Create" model="Skill" url="skills" />

      <CreateModelForm model={model}>
        <TextField title="Title:" name="title" />
        <PriorityField />
        <TagListSelection tags={tags} />
      </CreateModelForm>
    </main>
  );
};

// Enabling SSR to enable sesison for API request.
export async function getServerSideProps() {
  return {
    props: {
      tags: await tag.all(),
    },
  };
}

export default CreateSkill;
