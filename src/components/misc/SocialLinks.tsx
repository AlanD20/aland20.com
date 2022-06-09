import { NextPage } from 'next'
import socials from 'prisma/data/socials'


const SocialLinks: NextPage = () => {

  return (
    <div className="socials">
      <span className="socials__text">Links:</span>
      <div className="socials__links">
        {socials.map(social => (
          <a
            href={social.link}
            key={social.id}
            target="_blank"
            rel="noreferrer"
            className='link'>
            {social.name}
          </a>
        ))}
      </div>
    </div>
  )
}

export default SocialLinks
