import { NextPage } from 'next';
import BodyHeader from '@comp/dashboard/BodyHeader';
import CreateModelForm from '@comp/dashboard/CreateModelForm';
import TextField from '@misc/dashboard/TextField';

const CreateTag: NextPage = () => {
  const model = 'Tag';

  return (
    <main className="dashboard-page">
      <BodyHeader action="Create" model="Tag" url="tags" />

      <CreateModelForm model={model}>
        <TextField title="Name:" name="name" />
      </CreateModelForm>
    </main>
  );
};

// Enabling SSR to enable sesison for API request.
export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default CreateTag;
