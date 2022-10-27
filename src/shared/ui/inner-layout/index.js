import React from 'react';
import cls from './inner-layout.module.scss'

export const InnerLayout = (
    {
        sidebar,
        header,
        footer,
        children,
    }
) => {
    return (
        <div className={cls.container}>

            {sidebar && <div className={cls.sidebar}>{sidebar}</div>}

            <div className={cls.content}>

                {header && <div className={cls.header}>{header}</div>}

                <main className={cls.main}>
                    {children}
                </main>

                {footer && <div className={cls.footer}>{footer}</div>}
            </div>

        </div>
    );
};
