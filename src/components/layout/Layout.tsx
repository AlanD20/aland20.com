import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SocialLinks from '@misc/SocialLinks';
import { useAppDispatch } from '@/app/hooks';
import { closeTagSelection } from '@/features/tagSelectionSlice';
import _ from 'lodash';
import { ReactNode, useRef } from 'react';
import FooterText from './FooterText';
import Navbar from './Navbar';
import MetaTags from './MetaTags';

type Props = {
  children: ReactNode;
};

const Layout: NextPage<Props> = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const capitzalizeRoute = getRouteName(router.route);
  const navWrapperRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Close navigaiton if open while loading
  navWrapperRef.current?.classList.remove('nav-open');
  dialogRef.current?.removeAttribute('open');

  const handleClose = (e) => {
    const checkNavbar = handleNavbarClose(e);
    if (checkNavbar) {
      navWrapperRef.current?.classList.remove('nav-open');
      dialogRef.current?.removeAttribute('open');
    }

    const checkTagSelection = handleTagSelection(e);
    if (checkTagSelection) dispatch(closeTagSelection());
  };

  return (
    <div className="main-container" onClick={handleClose}>
      <Head>
        <title>AlanD20 - {capitzalizeRoute}</title>
        <link rel="icon" href="/favicon.ico" />
        <MetaTags />
      </Head>

      <header className="border-b-2 border-cWhite-400 select-none mb-8">
        <Navbar navWrapperRef={navWrapperRef} dialogRef={dialogRef} />
      </header>

      {/* Render Current Pages */}
      {children}

      <footer className="mt-8 px-8 py-4 flex-col gap-4 flex justify-center items-center border-t-2 border-cWhite-400 flex-1">
        <FooterText />
        <SocialLinks />
      </footer>
    </div>
  );
};

function handleNavbarClose(e) {
  if (e.target.classList.contains('nav-opener')) return false;
  if (e.target.getAttribute('role') === 'button') return false;
  if (isPreventNode(e, 'login-container')) return false;

  return true;
}

function handleTagSelection(e) {
  if (isPreventNode(e, 'tag-list-selection-container')) return false;
  if (isPreventNode(e, 'tag-list-container')) return false;
  if (isPreventNode(e, 'tag-list__item')) {
    return false;
  }
  return true;
}

function isPreventNode(e, cls) {
  const nodes = document.querySelectorAll(`.${cls} *`);
  return Array.from(nodes).some((node) => e.target.isEqualNode(node));
}

// Returns capitalized route name
function getRouteName(route: string): string {
  switch (route) {
    case '/': {
      return 'Home';
    }
    case '/projects': {
      return 'Projects';
    }
    case '/contact': {
      return 'Contact';
    }
    case '/faq': {
      return 'FAQ';
    }
    case '/dashboard': {
      return 'Dashboard';
    }
    case '/404': {
      return 'Page Not Found';
    }
    case '/500': {
      return '500 Server Error';
    }
  }

  let title = route.split('/');
  title.shift();

  if (title.length === 2) {
    return title
      .map((t) => {
        if (t === 'dashboard') return 'manage';
        return _.capitalize(t);
      })
      .join(' ');
  }

  title = title.map((t) => _.capitalize(t));
  title.shift();

  if (title.length === 2) {
    const [model, action] = title;
    return [action, model].join(' ');
  }
  const [model, , action] = title;
  return [action, model].join(' ');
}

export default Layout;
