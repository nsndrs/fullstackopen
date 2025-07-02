import styles from '../App.module.css'

const ErrorMessage = ({ error }) => {
  return (
    <div className={styles.error}>
      <strong>Error:</strong> {error}
    </div>
  )
}

export default ErrorMessage 