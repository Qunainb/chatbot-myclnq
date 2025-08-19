
export default function Button({text, style_button, func})
{
    return(
            <button type="button" className={`${style_button}`} onClick={(e) => {func(e)}}>
                {text}
            </button>
    )
}