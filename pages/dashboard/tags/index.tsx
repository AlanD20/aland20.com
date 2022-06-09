import { NextPage } from 'next'
import { Tag } from '@prisma/client';
import { tag } from '@/models/tag';
import BodyHeader from '@comp/dashboard/BodyHeader';
import ListModelCard from '@comp/dashboard/ListModelCard';
import SingleTag from '@comp/dashboard/SingleTag';


type Props = {
  tags: Tag[]
};

const ManageTags: NextPage<Props> = ({ tags }: Props) => {

  return (

    <main className="dashboard-page">
      <BodyHeader action="manage" model="Tag" createBtn />

      <ListModelCard>
        {
          tags.map((tag) => (
            <SingleTag {...tag} key={tag.id} />
          ))
        }
      </ListModelCard>

    </main>
  )
}


export async function getServerSideProps() {

  return {
    props: {
      tags: await tag.all()
    }
  }
}

export default ManageTags
