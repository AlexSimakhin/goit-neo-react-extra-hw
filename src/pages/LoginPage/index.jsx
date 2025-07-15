import LoginForm from '../../components/LoginForm';
import css from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Welcome Back</h1>
      <p className={css.subtitle}>
        Sign in to access your personal contacts
      </p>
      <LoginForm />
    </div>
  );
}
