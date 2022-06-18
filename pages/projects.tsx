import { NextPage } from 'next';
import ProjectTile from '@comp/front-page/ProjectTile';
import { project } from '@/models/project';
import { Project, Tag } from '@prisma/client';
import CustomDirective from '@/modules/CustomDirectives/CustomDirective';
import NoDataFound from '@misc/NoDataFound';
import moment from 'moment';

type ProjectWithTags = Project & {
  tags: Tag[];
};

type Props = {
  projects: ProjectWithTags[];
};

const ProjectsPage: NextPage<Props> = ({ projects }: Props) => (
  <main className="page projects">
    <h2 className="title">Projects</h2>

    <p>
      Here are most of my projects I have done, or worked on. The list will be
      updated each time I do a new project.
    </p>
    <p>
      I will only try to share those projects that I&apos;m proud of. Although,
      some of them might be easy for someone else, but I consider them
      challenging and interesting to bring solutions from my own experience.
      Some of them are my first hand-on experience for the technologies I have
      used.
    </p>

    <div className="cards">
      {projects.length > 0 ? (
        projects.map((p) => <ProjectTile {...p} key={p.id} />)
      ) : (
        <NoDataFound />
      )}
    </div>
  </main>
);

export async function getServerSideProps() {
  const rawProjects = await project.all({
    orderBy: [{ priority: 'desc' }, { title: 'asc' }],
    include: {
      tags: true,
    },
  });

  const projects = rawProjects.map((p) => ({
    ...p,
    content: CustomDirective(p.content),
    createdDate: p.createdDate
      ? moment(p.createdDate).format('MMM DD, YYYY')
      : null,
    completedDate: p.completedDate
      ? moment(p.completedDate).format('MMM DD, YYYY')
      : null,
  }));

  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=2000000, stale-while-revalidate=59'
  // );

  return {
    props: {
      projects,
    },
  };
}

export default ProjectsPage;
