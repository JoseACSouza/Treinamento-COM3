export default ({ className = '', disabled, children, ...props }) =>{
    <div
        {...props}
        className={`w-4 h-2 ${className}`}>
        {children}
    </div>
}
