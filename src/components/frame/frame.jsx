import React from 'react'

function Frame(props){
    console.log(props)
    return(
        <div >
        <h2>{props.header}</h2>
        <div className = {props.pattern}>
            {props.images.map((image)=><div className='block' key={image.id}><img className = "image" alt = 'image' src = {image.download_url}></img></div>)}
        </div>
        </div>
    )
}

export default Frame;