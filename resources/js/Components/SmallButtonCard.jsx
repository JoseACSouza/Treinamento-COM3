export default ({className= '', children, ...props}) => {
    return(
        <button
            {...props}
            className={`pointer-events-auto rounded-md px-2 py-1 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 `+ className}
        >
            {children}
        </button>
    );
}
