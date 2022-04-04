import React, { useRef, useState }  from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';

import { useMovieContext } from './MovieContext';

const DispMovie = () => {

  const japaneseTitleInput = useRef(null);
  const originalTitleInput = useRef(null);
  const directorInput = useRef(null);
  const releaseDateInput = useRef(null);
  const runningTimeInput = useRef(null);
  const countriesInput = useRef(null);
  const boxNoInput = useRef(null);
  const diskNoInput = useRef(null);
  const resultRequest = useRef(null);

  const { movieRecord, setMovie } = useMovieContext();

  const initialDate = new Date();
  const [startDate, setStartDate] = useState(initialDate);

  const handleChangeDate = (date) => {
    setStartDate(date);
  }

  function successRequest(result) {

    resultRequest.current.innerText = japaneseTitleInput.current.value + ' は登録されました。';

  }

  async function handleClick() {

    const padStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1).toString().padStart(2,'0') + "-" + startDate.getDate().toString().padStart(2,'0');

    console.log(padStartDate);

    const MovieRecord = {japaneseTitle:"",originalTitle:"",director:"",releaseDate:"",runningTime:"",countries:"",boxNo:"",diskNo:""};

    MovieRecord["japaneseTitle"] = japaneseTitleInput.current.value;
    MovieRecord["originalTitle"] = originalTitleInput.current.value;
    MovieRecord["director"] = directorInput.current.value;
    MovieRecord["releaseDate"] = padStartDate;
    MovieRecord["runningTime"] = runningTimeInput.current.value;
    MovieRecord["countries"] = countriesInput.current.value;
    MovieRecord["boxNo"] = boxNoInput.current.value;
    MovieRecord["diskNo"] = diskNoInput.current.value;

    console.log(MovieRecord);

    setMovie({...MovieRecord});

    console.log(movieRecord);

    // appSyncの設定画面から取得
    const API_URL = 'https://473muw3yrrdv5iojmmkajsfiky.appsync-api.us-west-2.amazonaws.com/graphql';
    
    const QueryData =  "mutation createRecordedMoviesDB {createRecordedMoviesDB(input: " +
            "{countries: \"" +  MovieRecord["countries"] + 
            "\" , runningTime: " + MovieRecord["runningTime"] + 
            ", director: \"" + MovieRecord["director"] + 
            "\" , diskNo: " + MovieRecord["diskNo"] +
            ", releaseDate: \"" + MovieRecord["releaseDate"] +
            "\" , boxNo: " + MovieRecord["boxNo"] + 
            ", japaneseTitle: \"" + MovieRecord["japaneseTitle"] + 
            "\" , originalTitle: \"" + MovieRecord["originalTitle"] +
        "\" }) {id japaneseTitle}}"
        
    console.log(QueryData);

      

    const data = await axios.post(
      API_URL,
      {
        query: QueryData
      },
      {
        headers: {
          // header に APIキーを渡す。 appSync設定画面から取得
          "x-api-key": "da2-f3dd2euyljatbdleqhlzfcxseq"
        }
      }
    )
    .then(result => successRequest(result))
    .catch(error => console.log('error', error));


  }

  return (
    <div>
        <div>
            <label>日本語タイトル　：　</label>
            <input type="text" name="JapaneseTitle" ref={japaneseTitleInput} defaultValue={""} size="50" />
        </div>
        <div>
            <label>原語タイトル　　：　</label>
            <input type="text" name="Title" ref={originalTitleInput} defaultValue={""} size="50" />
        </div>
        <div>
            <label>監督　　　　　　：　</label>
            <input type="text" name="Author" ref={directorInput} defaultValue={""} size="50" />
        </div>
        <div>
            <label>公開日　　　　　：　
                <DatePicker dateFormat="yyyy-MM-dd" ref={releaseDateInput} selected={startDate} onChange={handleChangeDate} />
            </label>
        </div>
        <div>
            <label>上映時間　　　　：　</label>
            <input type="text" name="CatalogPrice" ref={runningTimeInput} defaultValue={""} size="50" />
        </div>
        <div>
            <label>製作国　　　　　：　</label>
            <input type="text" name="Publisher" ref={countriesInput} defaultValue={""} size="50" />
        </div>
        <div>
            <label>ボックスNo  　　：　</label>
            <input type="text" name="PublicationDate" ref={boxNoInput} defaultValue={""} size="50" />
        </div>
         <div>
            <label>ディスクNo  　　：　</label>
            <input type="text" name="PurchaseLocation" ref={diskNoInput} defaultValue={""} size="50" />
        </div>

        <input
          type="button"
          value="Set"
          onClick={handleClick}
        />
        <div>
            <label ref={resultRequest}></label>
        </div>



    </div>

  )
}

export default DispMovie;