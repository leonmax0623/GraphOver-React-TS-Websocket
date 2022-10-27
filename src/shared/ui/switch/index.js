import React from 'react';
import cls from './switch.module.scss'

export const Switch = (
    {
        name,
        id,
        value,
        onChange = e => null,
        label = null,
        disabled = false,
        className = null
    }
) => {
    return (
        <div
            className={[
                cls.container,
                className,
            ].join(' ')}
        >
            <input
                type={'checkbox'}
                className={cls.field}
                name={name}
                value={value}
                onChange={e => onChange(e)}
                id={id}
                disabled={disabled}
            />
            <label
                htmlFor={id}
                className={cls.toggle}
            >
                {
                    label &&
                    <span className={cls.label}>{label}</span>
                }
            </label>
        </div>
    );
};
