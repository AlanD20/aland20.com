import { NextPage } from 'next';
import { Skill, Tag } from '@prisma/client';
import { skill } from '@/models/skill';
import BodyHeader from '@comp/dashboard/BodyHeader';
import ListModelCard from '@comp/dashboard/ListModelCard';
import SingleSkill from '@comp/dashboard/SingleSkill';

type SkillWithTags = Skill & {
  tags: Tag[];
};

type Props = {
  skills: SkillWithTags[];
};

const ManageSkills: NextPage<Props> = ({ skills }: Props) => (
  <main className="dashboard-page">
    <BodyHeader action="manage" model="Skill" createBtn />

    <ListModelCard>
      {skills.map((s) => (
        <SingleSkill {...s} key={s.id} />
      ))}
    </ListModelCard>
  </main>
);

export async function getServerSideProps() {
  return {
    props: {
      skills: await skill.all({
        orderBy: [{ priority: 'desc' }, { title: 'asc' }],
        include: {
          tags: true,
        },
      }),
    },
  };
}

export default ManageSkills;
