import RegistrationForm from '../../components/RegistrationForm';
import css from './RegistrationPage.module.css';

export default function RegistrationPage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Create Account</h1>
      <p className={css.subtitle}>
        Join us to start managing your contacts with style
      </p>
      <RegistrationForm />
    </div>
  );
}
