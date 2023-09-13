export default ({...props}) => {
 return (
    <div>
        <h5>{ owner }</h5>
        <div>
            <h3>{ subject }</h3>
            {owner === user ?
            <div>
                <button> Edit </button>
                <button> Delete </button>
            </div>
            : <></>
            }
        </div>
        <p>{ content }</p>
    </div>
 )
}
