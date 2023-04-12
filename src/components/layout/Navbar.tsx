import { useAppDispatch } from '@/config/hooks';
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
    <nav className="relative flex items-center gap-8 px-8 py-4">
      <div className="text-4xl font-bold tracking-wide transition-colors duration-150 ease-linear text-cBlack-400 focus-within:text-primary-normal hover:text-cBlack-400/50 focus:text-cBlack-400/50">
        <h1 role="button">
          <Link href="/">AlanD20</Link>
        </h1>
      </div>
      <div
        className="z-50 flex flex-col items-center justify-end gap-8 ml-auto"
        ref={navWrapperRef}
      >
        <button
          type="button"
          className="self-center px-4 py-2 ml-auto text-2xl font-bold transition-all duration-150 ease-linear rounded-lg nav-opener text-cWhite-100 bg-primary-800 lg:hidden"
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
