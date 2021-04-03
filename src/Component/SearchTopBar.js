import { useState } from 'react';
import '../Styles/SearchTopBar.css';
import {search_movie} from '../Store/Action';
import {useSelector, useDispatch} from 'react-redux';
import {server} from '../API/server';
import {searchMovieParam} from '../API/apiEndpoint';
import axios from 'axios';

const api = axios.create()


function SearchTopBar(props){
    const searchStore = useSelector(state => state.searchStore)
    const [inputText, setInputText] = useState("")
    const [autoCompleteResult, setAutoCompleteResult] = useState([])
    const dispatch = useDispatch()

    function search(e){
        if(e.key === "Enter"){
            e.preventDefault()
            dispatch(search_movie(inputText.replace(/\s/g, '+')))
            searchMovie()
        }
    }

    async function searchMovie(){
        setAutoCompleteResult([])
        props.actionSearch()
    }

    const getMovieList = async(input)=>{
        if(input.length>2){
            try{
                api.get(server+searchMovieParam+input+'&page=1').then(async(res)=>{
                  if(res.data.Response === "True"){
                      setAutoCompleteResult(res.data.Search)
                  }
                  else{
                    console.log(res.data.Error)
                    setAutoCompleteResult([])
                  }
                })
              }
              catch(err){
                alert(err)
            }
        }
        else{
            setAutoCompleteResult([])
        }
      }

    return(
        <div className={"Top-Bar-Container"}>
            <div className={"Top-Bar-Input-Container"}>
                <form autoComplete={"off"}>
                    <input
                        onKeyDown={(e)=>{
                            search(e)
                        }}
                        onFocus={()=>{getMovieList(inputText)}}
                        value={inputText}
                        onChange={
                            (e)=>{
                                setInputText(e.target.value)
                                dispatch(search_movie(e.target.value.replace(/\s/g, '+')))
                                getMovieList(e.target.value)
                            }
                        }
                        placeholder={"Find Movie Here..."}/>
                    {autoCompleteResult.length > 0 && inputText.length > 0?
                        <ul className={"Autocomplete-Container"}>
                            {autoCompleteResult.map((data,index)=>{
                                return(
                                    <li onClick={()=>{
                                        setInputText(data.Title)
                                        dispatch(search_movie(data.Title.replace(/\s/g, '+')))
                                        setAutoCompleteResult([])
                                    }}>{data.Title}</li>
                                )
                            })}
                    </ul>:null
                    }
                </form>
                <div onClick={()=>{searchMovie()}} className={"Top-Bar-Find-Button"}>
                    <a>Find</a>
                </div>
            </div>
        </div>
    )
}

export default SearchTopBar;