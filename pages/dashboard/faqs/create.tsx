import { NextPage } from 'next';
import BodyHeader from '@comp/dashboard/BodyHeader';
import CreateModelForm from '@comp/dashboard/CreateModelForm';
import PriorityField from '@misc/dashboard/PriorityField';
import TextField from '@misc/dashboard/TextField';
import TextareaField from '@misc/dashboard/TextareaField';

const CreateFaq: NextPage = () => {
  const model = 'FAQ';

  return (
    <main className="dashboard-page">
      <BodyHeader action="Create" model="FAQ" url="faqs" />

      <CreateModelForm model={model}>
        <TextField title="Title:" name="title" />
        <PriorityField />
        <TextareaField title="Content:" name="content" />
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

export default CreateFaq;
