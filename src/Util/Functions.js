export function screenScrollable(status){
    if(status){
        document.body.style.overflow = "hidden"
    }
    else{
        document.body.style.overflow = "unset"
    }
}