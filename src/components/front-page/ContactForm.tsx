import { NextPage } from 'next';
import { ChangeEvent } from 'react';
import config from '@/config/app';
import { useAppDispatch, useFetchForm } from '@/config/hooks';
import { setError, setSuccess } from '@/features/alertSlice';
import AlertStatus from '@misc/AlertStatus';

type FormEvent = ChangeEvent<HTMLFormElement>;

const ContactForm: NextPage = () => {
  const dispatch = useAppDispatch();
  const handleContact = useFetchForm({
    url: config.api.contact(),
    method: 'POST',
  });

  const handleOnSubmit = async (e: FormEvent) => {
    e.target.fields.setAttribute('disabled', 'disabled');
    loadingSpinner({ state: true });

    const { code, message, errors } = await handleContact(e);

    if (code === 200) {
      dispatch(setSuccess({ success: message }));
      e.target.reset();
    } else {
      dispatch(
        setError({
          error: Array.isArray(errors) ? errors : message,
        })
      );
    }

    loadingSpinner({ state: false });
    e.target.fields.removeAttribute('disabled');
  };

  return (
    <form onSubmit={handleOnSubmit} id="contact-form">
      <fieldset id="fields">
        <AlertStatus />

        <dialog id="dialog">
          <div className="absolute w-full h-full border-4 border-dashed rounded-full border-primary-600 animate-spin" />

          <div>loading...</div>
        </dialog>

        <div className="field">
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            required
            placeholder="e.g, John Doe"
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="e.g, johndoe@example.com"
          />
        </div>
        <div className="field">
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            id="message"
            required
            placeholder="Message..."
          />
        </div>
        <div className="field">
          <input type="submit" value="send" className="btn btn--primary" />
        </div>
      </fieldset>
    </form>
  );
};

type loadingSpinnerType = {
  state: boolean;
};

function loadingSpinner({ state }: loadingSpinnerType) {
  const dialog = document.getElementById('dialog') as HTMLDialogElement;

  if (state) {
    dialog.show();
    dialog.classList.add('contact__dialog');
  } else {
    dialog.close();
    dialog.classList.remove('contact__dialog');
  }
}

export default ContactForm;
