import { NextPage } from 'next'
import ContactForm from '@comp/front-page/ContactForm';
import Link from 'next/link';


const Contact: NextPage = () => {

  return (
    <main className="page contact">
      <h1 className="title">Contact Form</h1>

      <p>
        If you need my help, I would be glad to help. Although, you may first look at <Link href="/faq" passHref><a className="link link--inline">FAQ</a></Link> section to see if your questions are listed there. Otherwise, you are welcome to ask. Again, I would like to emphasize that  everything is not a right question. So, please keep it simple &amp; worth talking.
      </p>
      <p>
        You can send me an email directly to <span className="marker">aland20@pm.me</span>. Or, you can submit the following form to send me an email.
      </p>

      <ContactForm />

    </main >
  )
}


export default Contact
