import '../Styles/ImageViewerModal.css'

function ImageViewerModal(props){
    if(props.visible){
        return (
            <div onClick={props.actionClose} className={"Modal-Container"}>
                <img src={props.src}/>
            </div>
        )
    }
    else{
        return null
    }
}

export default ImageViewerModal;