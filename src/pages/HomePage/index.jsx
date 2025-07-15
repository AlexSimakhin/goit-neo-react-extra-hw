import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>
        Contacts Book
      </h1>
      <p className={css.subtitle}>
        Your Personal Contact Management Solution
      </p>
      <div className={css.text}>
        Welcome to your modern, beautiful contacts manager. 
        Experience the power of glassmorphism design while keeping 
        your contacts organized and easily accessible.
      </div>
      
      <div className={css.features}>
        <div className={css.feature}>
          <h3>🔒 Secure</h3>
          <p>Your contacts are protected with modern authentication and encryption.</p>
        </div>
        <div className={css.feature}>
          <h3>🎨 Beautiful</h3>
          <p>Enjoy a stunning glassmorphism interface that adapts to your preferences.</p>
        </div>
        <div className={css.feature}>
          <h3>📱 Responsive</h3>
          <p>Access your contacts seamlessly across all your devices and screen sizes.</p>
        </div>
        <div className={css.feature}>
          <h3>🌙 Dark Mode</h3>
          <p>Switch between light and dark themes to match your style and environment.</p>
        </div>
      </div>
    </div>
  );
}
