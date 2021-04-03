import '../Styles/DetailMovie.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import {server} from '../API/server';
import {getMovieDetailParam} from '../API/apiEndpoint';
import SearchTopBar from '../Component/SearchTopBar';
import {useHistory} from 'react-router-dom';
import ImageViewerModal from '../Component/ImageViewerModal';
import {screenScrollable} from '../Util/Functions';


const api = axios.create()

function DetailMovie({match}) {

  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [rated, setRated] = useState("")
  const [runtime, setRuntime] = useState("")
  const [genre, setGenre] = useState("")
  const [poster, setPoster] = useState("")
  const [plot, setPlot] = useState("")
  const [director, setDirector] = useState("")
  const [writer, setWriter] = useState("")
  const [actors, setActors] = useState("")
  const [imageViewerModal, setImageViewerModal] = useState(false)

  useEffect(()=>{
    document.title = "Movie";
    getMovieDetail()
  },[])

  const history = useHistory();

  const findInHome = ()=>{
    history.push('/')
  }

  const getMovieDetail = ()=>{
    try{
      api.get(server+getMovieDetailParam+`${match.params.id}`).then(async(res)=>{
        if(res.data.Response === "True"){
          setTitle(res.data.Title)
          setYear(res.data.Year)
          setRated(res.data.Rated)
          setRuntime(res.data.Runtime)
          setGenre(res.data.Genre)
          setPoster(res.data.Poster)
          setPlot(res.data.Plot)
          setDirector(res.data.Director)
          setWriter(res.data.Writer)
          setActors(res.data.Actors)
          document.title = res.data.Title;
        }
        else{
          console.log(res.data.Error)
        }
      })
    }
    catch(err){
      alert(err)
    }
  }

  function showImagePopup(status){
    if(status){
      screenScrollable(true)
      setImageViewerModal(true)
    }
    else{
      screenScrollable(false)
      setImageViewerModal(false)
    }
  }


  return (
    <div>
      <SearchTopBar actionSearch={findInHome}/>
      <div className={"Movie-Detail-Container"}>
        <div className={"Movie-Detail"}>
          <div className={"Movie-Detail-Info-Header"}>
            <a id={"Title"}>{title}</a>
            <a id={"Year"}>{year}</a>
            <div id={"Info"}>
              <a>{rated} |</a>
              <a>{runtime} |</a>
              <a>{genre}</a>
            </div>
          </div>
          <div className={"Movie-Detail-Image"}>
            <img className={"Movie-Image"} onClick={()=>{showImagePopup(true)}} src={poster}/>
          </div>
          <div className={"Movie-Detail-Plot"}>
            <a id={"Plot-Title"}>Plot</a>
            <a id={"Plot"}>{plot}</a>
          </div>
          <div className={"Movie-Detail-People"}>
            <div className={"Movie-Detail-People-Content"}>
              <span id={"Role"}>
                <a>Director</a>
              </span>
              <span id={"People"}>
                <a>{director}</a>
              </span>
            </div>
            <div className={"Movie-Detail-People-Content"}>
              <span id={"Role"}>
                <a>Writer</a>
              </span>
              <span id={"People"}>
                <a>{writer}</a>
              </span>
            </div>
            <div className={"Movie-Detail-People-Content"}>
              <span id={"Role"}>
                <a>Actors</a>
              </span>
              <span id={"People"}>
                <a>{actors}</a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ImageViewerModal actionClose={()=>{showImagePopup(false)}} visible={imageViewerModal} src={poster}/>
    </div>
    
  );
}
  
  export default DetailMovie;
  