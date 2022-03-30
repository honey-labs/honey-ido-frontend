import classNames from 'classnames'
import { vars } from 'degen'

export interface SpinnerProps {
  size?: 'sm' | 'md'
  className?: string
}

const Spinner: React.FC<SpinnerProps> = ({ className, size = 'md' }) => {
  return (
    <svg
      className={classNames(
        'animate-spin text-brandPrimary',
        {
          'h-3 w-3': size === 'sm',
          'h-5 w-5': size === 'md',
        },
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={vars.colors.accent}
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-90"
        fill={vars.colors.accent}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

export default Spinner
