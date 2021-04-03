import '../Styles/HomeMovie.css';
import { useEffect, useState, useRef, useReducer } from 'react';
import {server} from '../API/server';
import {searchMovieParam} from '../API/apiEndpoint';
import axios from 'axios';
import ImageViewerModal from '../Component/ImageViewerModal';
import SearchTopBar from '../Component/SearchTopBar';
import {screenScrollable} from '../Util/Functions';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const api = axios.create()

function HomeMovie() {

  const searchStore = useSelector(state => state.searchStore)
  const [search, _setSearch] = useState(searchStore);
  const [paging, _setPaging] = useState(1);
  const [movieList, _setMovieList] = useState([]);
  const [imageViewerModal, setImageViewerModal] = useState(false)
  const [imageView, setImageView] = useState("")
  const [loading, _setLoading] = useState(false);

  const searchRef = useRef(search)
  const setSearch = data => {
    searchRef.current = data
    _setSearch(data)
  }

  const movieListRef = useRef(movieList)
  const setMovieList = data => {
    movieListRef.current = data;
    _setMovieList(data);
  };

  const pagingRef = useRef(paging)
  const setPaging = data => {
    pagingRef.current = data
    _setPaging(data)
  }

  const loadingRef = useRef(loading)
  const setLoading = data => {
    loadingRef.current = data
    _setLoading(data)
  }
  
  useEffect(()=>{
    document.title = 'Home Movie';
    getMovieList()
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll);
  },[])

  const handleScroll =()=>{
    if ((window.scrollY + window.innerHeight) >= document.body.scrollHeight-100) {
      getMoreMovieList()
    }
  }

  const getMovieList = async()=>{
    if(!loadingRef.current){
      setLoading(true)
      await setMovieList([])
      try{
        api.get(server+searchMovieParam+searchRef.current+'&page=1').then(async(res)=>{
          if(res.data.Response === "True"){
            let data = await res.data.Search
            let page = paging
            page++
            await setMovieList(data)
            await setPaging(page)
            await setSearch(searchStore)
            setLoading(false)
          }
          else{
            setLoading(false)
            console.log(res.data.Error)
          }
        })
      }
      catch(err){
        alert(err)
        setLoading(false)
      }
    }
  }

  const searchMovieList = async()=>{
    setSearch(searchStore)
    if(!loadingRef.current){
      setLoading(true)
      await setMovieList([])
      try{
        api.get(server+searchMovieParam+searchRef.current+'&page=1').then(async(res)=>{
          if(res.data.Response === "True"){
            let data = await res.data.Search
            let page = 1
            page++
            await setMovieList(data)
            await setPaging(page)
            setLoading(false)
          }
          else{
            setLoading(false)
            console.log(res.data.Error)
          }
        })
      }
      catch(err){
        alert(err)
        setLoading(false)
      }
    }
  }

  const getMoreMovieList = async()=>{
    if(!loadingRef.current){
      setLoading(true)
      try{
        api.get(server+searchMovieParam+searchRef.current+'&page='+pagingRef.current).then(async(res)=>{
          if(res.data.Response === "True"){
            let data = await res.data.Search
            let page = pagingRef.current
            page++
            await setMovieList(movieListRef.current.concat(data))
            await setPaging(page)
            await setLoading(false)
          }
          else{
            await setLoading(false)
            console.log(res.data.Error)
          }
        })
      }
      catch(err){
        setLoading(false)
        alert(err)
      }
    }
  }

  function showImagePopup(status,image){
    if(status){
      screenScrollable(true)
      setImageViewerModal(true)
      setImageView(image)
    }
    else{
      screenScrollable(false)
      setImageViewerModal(false)
      setImageView("")
    }
  }

  const findButton = ()=>{
    setSearch(searchStore)
    searchMovieList()
  }

  return (
    <div>
      <SearchTopBar actionSearch={findButton}/>
      <div className={"Movie-List-Container"}>
        <div className={"Movie-List"}>
          {movieListRef.current.map((data,index)=>{
          return(
            <div className={"Movie-Item-Container"}>
              <span className={"Movie-Item"}>
                <span className={"Movie-Item-Image-Container"}>
                  <img onClick={()=>{showImagePopup(true, data.Poster)}} src={data.Poster}/>
                </span>
                <span className={"Movie-Item-Text-Container"}>
                  <span className={"Movie-Item-Text"}>
                    <a>{data.Title} <span>{data.Year}</span></a>
                  </span>
                  <Link style={{textDecoration:'none'}} to={`/movie/${data.imdbID}`}>
                    <div className={"Movie-Item-Info-Button-Container"}>
                      <span className={"Movie-Item-Info-Button"}>More Info</span>
                    </div>
                  </Link>
                </span>
              </span>
            </div>
          )
          })}
        </div>
      </div>
      <ImageViewerModal 
      actionClose={()=>{showImagePopup(false)}} 
      src={imageView} 
      visible={imageViewerModal} tes={"WEW"}/>
    </div>
  );
}

export default HomeMovie;
