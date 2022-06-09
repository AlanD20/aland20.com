import { NextPage } from 'next'
import { useRouter } from 'next/router'


const ServerError: NextPage = () => {
  const router = useRouter();
  const handleGoBack = () => router.replace('/');

  return (
    <div className="page-container">
      <h1 className="page-container__title">500 Error</h1>
      <button
        className="page-container__link"
        onClick={handleGoBack}>
        <h2>Go back to home page!</h2>
      </button>
    </div>
  )
}

export default ServerError
