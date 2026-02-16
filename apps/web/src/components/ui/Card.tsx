import type { MouseEvent, ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'none'
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({ children, className = '', padding = 'md', onClick }: CardProps) {
  return (
    <div onClick={onClick} className={['bg-white rounded-xl border border-gray-200 shadow-sm', paddingClasses[padding], className].join(' ')}>
      {children}
    </div>
  )
}
