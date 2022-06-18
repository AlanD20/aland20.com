import { NextPage } from 'next';
import { RefObject, useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  dialogRef: RefObject<HTMLDialogElement>;
};

const AuthContainer: NextPage<Props> = ({ dialogRef }: Props) => {
  const [hasRendered, setHasRendered] = useState<Boolean>(false);
  const { data } = useSession();

  const handleDialog = () => {
    dialogRef.current?.toggleAttribute('open');
  };

  // Work around to stop AuthContainer flickering
  useEffect(() => void setHasRendered(true), []);

  if (!data || !hasRendered) {
    return (
      <div>
        <button
          type="button"
          className="btn btn--primary"
          onClick={(e) => {
            e.preventDefault();
            signIn('github');
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="login-container relative lg:ml-4">
      <div className="login-container__header flex gap-2">
        <button
          type="button"
          className="btn btn--primary"
          onClick={handleDialog}
        >
          {data.user?.name ?? 'logged in'}
        </button>
      </div>

      <div className="login-container__content absolute -left-12 -bottom-4 md:-bottom-2 md:right-0 w-[200px]">
        <dialog
          ref={dialogRef}
          className="auth-dialog w-full bg-cWhite-400 rounded-md rounded-bl-lg rounded-br-lg"
        >
          <form method="dialog" className="flex flex-col gap-2">
            <div className="field profile pb-2 border-2 border-b-cBlack-200">
              <div className="profile">
                {data.user?.image && (
                  <Image
                    src={data.user?.image}
                    unoptimized
                    className="!w-[48px] !h-[48px] rounded-full"
                    width="48"
                    height="48"
                    alt="User Avatar"
                  />
                )}
              </div>

              <a
                href={`https://github.com/${data.user?.name}`}
                className="link"
                target="_blank"
                rel="noreferrer"
              >
                {data.user?.name}
              </a>
            </div>

            <div className="field">
              <Link href="/dashboard" passHref>
                <a className="btn btn--outline btn--sm">Dashboard</a>
              </Link>
            </div>

            <div className="field">
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default AuthContainer;
