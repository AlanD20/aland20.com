import { NextPage } from 'next'


const FooterText: NextPage = () => {
  return (
    <div>
      <span>
        Copyright Reserved {new Date().getUTCFullYear()} &copy; AlanD20
      </span>
    </div>
  )
}

export default FooterText
