
function CustomBtn(props: { label: string, onClick: Function, classes?: string }) {
    const { label, onClick, classes } = props;
    return (

        <>
            <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded ${classes}`} onClick={() => onClick()}>
                {label}
            </button>
        </>
    )
}

export default CustomBtn;