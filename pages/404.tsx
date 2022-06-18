import { NextPage } from 'next';
import { useRouter } from 'next/router';

const NotFound: NextPage = () => {
  const router = useRouter();
  const handleGoBack = () => router.replace('/');

  return (
    <div className="page-container">
      <h2 className="page-container__title">Page not found!</h2>
      <button
        type="button"
        className="page-container__link"
        onClick={handleGoBack}
      >
        <h3>Click here to go back!</h3>
      </button>
    </div>
  );
};

export default NotFound;
