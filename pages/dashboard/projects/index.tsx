import { NextPage } from 'next';
import { Project, Tag } from '@prisma/client';
import { project } from '@/models/project';
import BodyHeader from '@comp/dashboard/BodyHeader';
import ListModelCard from '@comp/dashboard/ListModelCard';
import SingleProject from '@comp/dashboard/SingleProject';
import highlightCustomDirectives from '@/modules/CustomDirectives/highlightCustomDirectives';
import moment from 'moment';

type ProjectWithTags = Project & {
  tags: Tag[];
};

type Props = {
  projects: ProjectWithTags[];
};

const ManageProjects: NextPage<Props> = ({ projects }: Props) => (
  <main className="dashboard-page">
    <BodyHeader action="manage" model="Project" createBtn />

    <ListModelCard>
      {projects.map((p) => (
        <SingleProject {...p} key={p.id} />
      ))}
    </ListModelCard>
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
    content: highlightCustomDirectives(p.content),
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

export default ManageProjects;
