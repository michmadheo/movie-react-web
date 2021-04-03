let data = "Batman"

const searchStore = (state = data,action) =>{
    // alert(action.data)
    switch(action.type){
        case 'search_movie':
            return state = action.data;
        default:
            return state;
    }
    
};

export default searchStore;