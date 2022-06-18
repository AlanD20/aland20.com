import { NextPage } from 'next';
import { useRouter } from 'next/router';

const ServerErrorPage: NextPage = () => {
  const router = useRouter();
  const handleGoBack = () => router.replace('/');

  return (
    <div className="page-container">
      <h2 className="page-container__title">500 Error</h2>
      <button
        type="button"
        className="page-container__link"
        onClick={handleGoBack}
      >
        <h3>Go back to home page!</h3>
      </button>
    </div>
  );
};

export default ServerErrorPage;
