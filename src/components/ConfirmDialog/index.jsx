import css from './ConfirmDialog.module.css';

export default function ConfirmDialog({
  title = 'Confirm Action',
  message,
  onConfirm,
  onCancel,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}) {
  return (
    <div className={css.dialog}>
      <h3 className={css.title}>{title}</h3>
      <p className={css.message}>{message}</p>
      <div className={css.buttons}>
        <button className={css.cancelBtn} onClick={onCancel}>
          {cancelText}
        </button>
        <button className={css.confirmBtn} onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </div>
  );
}
