import cls from './typography.module.scss';

export const Title1 = ({ className = '', children }) => (
    <h1 className={[cls.h1, className].join(' ')}>{children}</h1>
)
export const Title2 = ({ className = '', children }) => (
    <h2 className={[cls.h2, className].join(' ')}>{children}</h2>
)
export const Title3 = ({ className = '', children }) => (
    <h3 className={[cls.h3, className].join(' ')}>{children}</h3>
)
export const Title4 = ({ className = '', children }) => (
    <h4 className={[cls.h4, className].join(' ')}>{children}</h4>
)
export const Title5 = ({ className = '', children }) => (
    <h5 className={[cls.h5, className].join(' ')}>{children}</h5>
)
export const Caption = ({ className = '', children }) => (
    <span className={[cls.caption, className].join(' ')}>{children}</span>
)
