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
    <h2 className="title">Welcome to my personal website!</h2>

    <p>
      Hey! I&apos;m Aland, working as a software Engineer and Cloud
      Infrastructure Engineer. I obtained my bachelor of computer engineering
      degree in Warsaw, Poland in 2023. This is my personal website where you
      can find my experience, projects, and probably more stuff.
    </p>
    <p>
      I have experience in leading many complex integration projects that
      require leading, designing, implementation decisions for scalability,
      maintenance, monitoring, logging, and communication with many teams to
      make this integration workflow across multiple products into existence. In
      Cloud Infrastructure side, I worked on maintenance, reliability, CI, CD,
      monitoring, and logging of the infrastructure. I have been getting into a
      lot of enterprise level services particularly with AWS services and
      microservice architecture with Event-Driven and Queue System Design.
    </p>
    <p>
      - Experienced in Software Development and led many projects from design to
      deployment.
      <span className="block">
        - Understanding the fundamental of data structure & Algorithms.
      </span>
      <span className="block">
        - Decently deep understanding of relational databases.
      </span>
      <span className="block">
        - Knowledge of Security, Protection, Networking in advanced level.
      </span>
      <span className="block">
        - Understanding of many scalable architecture such as Event-Driven,
        Queue System, monolithic, and microservices.
      </span>
      <span className="block">
        - Understanding of monitoring and logging such as OpenSearch setup,
        FilaBeat, Grafana, Prometheus.
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
