import { NextPage } from 'next';
import SkillList from '@comp/front-page/SkillList';
import { skill } from '@/models/skill';
import { Skill, Tag } from '@prisma/client';
import NoDataFound from '@misc/NoDataFound';


type SkillWithTags = Skill & {
  tags: Tag[];
}

type Props = {
  skills: SkillWithTags[];
}

const Home: NextPage<Props> = ({ skills }: Props) => {


  return (
    <main className="page about">
      <h1 className="title">Welcome to my portfolio!</h1>

      <p>
        Hey! I&apos;m Aland, a self-taught full-stack developer. Currently, I&apos;m pursuing my computer science bachelor degree. I&apos;m very passionate, ambitious, enthusiastic about the tech industry and love to try new technologies.
      </p>
      <p>Here is a list of all technologies I have tried. The list will be updated when I use any new technologies in my projects or any project I work on.
      </p>
      <p>
        - Experienced in database relations.
        <span className="block">- Understanding the fundamental of data structure & Algorithms</span>
        <span className="block">- Knowledge of Security, Protection, Networking.</span>
      </p>

      {skills.length > 0 ?
        (<div className="list w-full grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4">
          {skills.map(skill => (
            <SkillList {...skill} key={skill.id} />

          ))}
        </div>
        ) : <NoDataFound />
      }
    </main>
  )
}

export async function getServerSideProps() {

  return {
    props: {
      skills: await skill.all({
        orderBy: [
          { priority: 'desc' },
          { title: 'asc' },
        ],
        include: {
          tags: true
        }
      }),
    }
  }
}


export default Home;
