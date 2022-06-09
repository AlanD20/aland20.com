import { NextPage } from 'next'
import { useRouter } from 'next/router'

const NotFound: NextPage = () => {
  const router = useRouter();
  const handleGoBack = () => router.replace('/');

  return (
    <div className="page-container">
      <h1 className="page-container__title">Page not found!</h1>
      <button
        className="page-container__link"
        onClick={handleGoBack}>
        <h2>Click here to go back!</h2>
      </button>
    </div>
  )
}

export default NotFound
