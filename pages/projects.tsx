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
      updated each time I make a new project.
    </p>
    <p>
      I will only try to put those projects that probably worth sharing here.
      Although checkout my github for all the projects. Some of them are my
      first hand-on experience for a tool or language and some are just
      utilities and helper scripts that helps me to do my daily works
      conveniently.
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

  return {
    props: {
      projects,
    },
  };
}

export default ProjectsPage;
