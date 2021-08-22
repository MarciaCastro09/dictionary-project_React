import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./Dictionary.css";


export default function Dictionary(props)   {
    let [keyword, setKeyword] = useState(props.defaultKeyword);
    let [results, setResults] = useState(null);
    let [loaded, setLoaded] = useState(false);
    let [photos, setPhotos] = useState(null);

    function handleResponse(response) {
        setResults(response.data[0]);
    }

    function handlePexelsResponse(response) {
        setPhotos(response.data.photos);
    }


    function search() {
        let apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
        axios.get(apiURL).then(handleResponse);

        let pexelsApiKey = "563492ad6f91700001000001a7e60a6360b8432093f625e065c24391";
        let pexelsApiURL =`https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
        let headers = {Authorization: `Bearer ${pexelsApiKey}` };

        axios.get(pexelsApiURL, {headers: headers }).then(handlePexelsResponse);
       
    }

    



    function handleSubmit(event) {
        event.preventDefault();
        search();
        
    }

    
    function handleKeywordChange(event) {
        setKeyword(event.target.value);
    }

    function load() {
        setLoaded(true);
        search();
    }


    if (loaded) {
        return (
            <div className="Dictionary"> 
            <section>
                <h1>What word do you want to look up?</h1>
            <form onSubmit={handleSubmit}>
                <input type="search" onChange={handleKeywordChange}
                defaultValue={props.defaultKeyword} />
            </form>
            <div className="hint">
                suggested words: wand, spell, potion, enchantment...
            </div>
            </section>
            <Results results={results} />
            <Photos photos={photos} />
            </div>
            );

    } else {
        load();
        return "Loading";

    }

}
