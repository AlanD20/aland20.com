import { useAppDispatch } from '@/app/hooks';
import { NextPage } from 'next';
import Link from 'next/link';
import { RefObject, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import AuthContainer from './AuthContainer';
import NavbarItem from './NavbarItem';

type Props = {
  navWrapperRef: RefObject<HTMLDivElement>;
  dialogRef: RefObject<HTMLDialogElement>;
};

const Navbar: NextPage<Props> = ({ navWrapperRef, dialogRef }: Props) => {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });
  const dispatch = useAppDispatch();

  const handleNavOpener = () => {
    navWrapperRef.current?.classList.toggle('nav-open');
  };

  useEffect(() => {
    isLargeScreen && navWrapperRef.current?.classList.remove('nav-open');
  }, [dispatch, isLargeScreen, navWrapperRef]);

  return (
    <nav className="py-4 px-8 flex gap-8 relative items-center">
      <div className="text-4xl font-bold tracking-wide text-cBlack-400 transition-colors duration-150 ease-linear focus-within:text-primary-normal hover:text-cBlack-400/50 focus:text-cBlack-400/50">
        <h1 role="button">
          <Link href="/">
            <a>
              Aland <span className="whitespace-nowrap">Al-Jaf</span>
            </a>
          </Link>
        </h1>
      </div>
      <div
        className="z-50 ml-auto flex flex-col items-center justify-end gap-8"
        ref={navWrapperRef}
      >
        <button
          type="button"
          className="nav-opener text-cWhite-100 bg-primary-800 px-4 py-2 rounded-lg transition-all duration-150 ease-linear font-bold text-2xl self-center ml-auto lg:hidden"
          onClick={handleNavOpener}
        >
          ☰
        </button>
        <ul>
          <NavbarItem path="/" name="About" />
          <NavbarItem path="/projects" name="Projects" />
          <NavbarItem path="/contact" name="Contact" />
          <NavbarItem path="/faq" name="FAQ" />
          <AuthContainer dialogRef={dialogRef} />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
