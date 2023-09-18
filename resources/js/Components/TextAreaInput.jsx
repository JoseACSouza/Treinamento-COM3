export default ({className= '', children, ...props}) => {
    return(
        <textarea
            {...props}
            className={`resize-none min-w-fit text-md h-28 mb-2 border-0 bg-[#FFFFFF]/60 `+ className}
        >
            {children}
        </textarea>
    );
}

