import { NextPage } from 'next';
import ContactForm from '@comp/front-page/ContactForm';
import Link from 'next/link';

const ContactPage: NextPage = () => (
  <main className="page contact">
    <h2 className="title">Contact Form</h2>

    <p>
      Feel free to contact me if you need my help. You may first take a look at
      <Link href="/faq" passHref>
        <span className="link link--inline">FAQ</span>
      </Link>{' '}
      page, you might find your answers there. Otherwise, you are welcome to ask
      anything.
    </p>
    <p>
      You can send me an email to
      <span className="marker"> aland20@pm.me</span>. Or, you can submit the
      following form to send me an email.
    </p>

    <ContactForm />
  </main>
);

export default ContactPage;
