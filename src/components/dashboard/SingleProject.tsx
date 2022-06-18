import { NextPage } from 'next';
import { Project, Tag } from '@prisma/client';
import SingleModelCard from '@comp/dashboard/SingleModelCard';
import TextBlock from '@misc/dashboard/TextBlock';
import ParseHTMLToReactNode from 'html-react-parser';

type Props = Project & {
  tags: Tag[];
};

const SingleProject: NextPage<Props> = ({
  id,
  title,
  content,
  priority,
  sourceLink,
  previewLink,
  createdDate,
  completedDate,
  tags,
}: Props) => {
  const model = 'Project';
  const parsed = ParseHTMLToReactNode(content);

  return (
    <SingleModelCard model={model} id={id}>
      <TextBlock title="Priority:" content={priority} inline />
      <TextBlock title="Title:" content={title} />
      <TextBlock title="Contents:" content={parsed} />

      <TextBlock
        title="Project Source Link:"
        content={sourceLink}
        link={sourceLink}
      />
      <TextBlock
        title="Project Preview Link:"
        content={previewLink}
        link={previewLink}
      />

      <TextBlock
        title="Created Date:"
        content={createdDate?.toString()}
        inline
      />

      <TextBlock
        title="Completed Date:"
        content={completedDate?.toString()}
        inline
      />

      <TextBlock title="Project Tags:" tags={tags} />
    </SingleModelCard>
  );
};

export default SingleProject;
