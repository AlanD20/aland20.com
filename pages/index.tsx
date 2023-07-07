import { NextPage } from 'next';
import SkillList from '@comp/front-page/SkillList';
import { skill } from '@/models/skill';
import { Skill, Tag } from '@prisma/client';
import NoDataFound from '@misc/NoDataFound';

type SkillWithTags = Skill & {
  tags: Tag[];
};

type Props = {
  skills: SkillWithTags[];
};

const HomePage: NextPage<Props> = ({ skills }: Props) => (
  <main className="page about">
    <h2 className="title">Welcome to my portfolio!</h2>

    <p>
      Hey! I&apos;m Aland, working as a software engineer. I obtained my
      bachelor of computer engineering degree in Warsaw, Poland in 2023. This is
      my personal website where I will showcase my projects and other stuffs
      that I work on.
    </p>
    <p>
      Here is a list of technologies I have tried. The list will be updated when
      I use any new technologies in my projects or any project I work on.
      Although, it may not be up to date with everything I use, but I try my
      best to keep them up to date so that in the future, each tech will be
      linked to its own projects.
    </p>
    <p>
      - Experienced in application and web development.
      <span className="block">
        - Understanding the fundamental of data structure & Algorithms.
      </span>
      <span className="block">
        - Knowledge of Security, Protection, Networking, Database.
      </span>
    </p>

    {skills.length > 0 ? (
      <div className="grid w-full grid-cols-1 list sm:grid-cols-2 gap-y-8 gap-x-4">
        {skills.map((s) => (
          <SkillList {...s} key={s.id} />
        ))}
      </div>
    ) : (
      <NoDataFound />
    )}
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

export default HomePage;
