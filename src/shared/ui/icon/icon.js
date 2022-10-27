import SpriteSVG from "./sprite.svg";

export const Icon = ({name, size, className}) => (
    <svg className={className} width={size} height={size}>
        <use xlinkHref={`${SpriteSVG}#${name}`}/>
    </svg>
)
