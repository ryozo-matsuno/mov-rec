import React, { useRef, useState }  from "react";
import axios from 'axios';
import { CSVLink } from "react-csv";

const DispListMovies = () => {
  // ref が参照できるように、textInput をここで宣言する必要があります。
  const textInput = useRef(null);
  const resultSearch = useRef(null);
  const listMoviesTable = useRef(null);
  const [csvData, setCSVData] = useState([]);

  const csvHeaders = [
    { label: "ID", key: "ID" },
    { label: "日本語タイトル", key: "JapaneseTitle" },
    { label: "原語タイトル", key: "OriginalTitle" },
    { label: "監督", key: "Director" },
    { label: "公開日", key: "ReleaseDate" },
    { label: "上映時間", key: "RunningTime" },
    { label: "製作国", key: "Counties" },
    { label: "ボックスNo", key: "BoxNo" },
    { label: "ディスクNo", key: "DiskNo" },
  ];

  const csvDataTemp = [];

  console.log("Head of appl");

  function setMovieRecords(response) {

    const result = response.data.listTestBIS01S.items
    console.log(result);
    console.log(result.length);
    

    if (result.length === 0) {
      resultSearch.current.innerText = "対象となる映画がありません。";
      console.log("item is zero.");
    } else {

        const table = listMoviesTable.current;

        for (let i = 0; i < result.length; i++) {

            const row = table.insertRow();
            row.insertCell().appendChild(document.createTextNode(result[i].id));
            row.insertCell().appendChild(document.createTextNode(result[i].titleJapanese));
            row.insertCell().appendChild(document.createTextNode(result[i].titleOriginal));
            row.insertCell().appendChild(document.createTextNode(result[i].director));
            row.insertCell().appendChild(document.createTextNode(result[i].releaseDate));
            row.insertCell().appendChild(document.createTextNode(result[i].RunningTime));
            row.insertCell().appendChild(document.createTextNode(result[i].Countries));
            row.insertCell().appendChild(document.createTextNode(result[i].set));
            row.insertCell().appendChild(document.createTextNode(result[i].no));

            csvDataTemp.push({
              ID : result[i].id,
              JapaneseTitle : result[i].titleJapanese,
              OriginalTitle : result[i].titleOriginal,
              Director : result[i].director,
              ReleaseDate : result[i].releaseDate,
              RunningTime : result[i].RunningTime,
              Counties : result[i].Countries,
              BoxNo : result[i].set,
              DiskNo : result[i].no
            });

        }

        setCSVData(csvDataTemp);

    }
  }

  
  async function handleClick() {

    const count = listMoviesTable.current.rows.length;

    if (count > 1) {
        for (let i = 1; i < count; i++) {
            listMoviesTable.current.deleteRow(1);
        }
    } 

    resultSearch.current.innerText = "";

    // appSyncの設定画面から取得
    const API_URL = 'https://b3234ugjizcvfko6c2mzllo44y.appsync-api.us-west-2.amazonaws.com/graphql';
    
    const QueryData = "query MyQuery {listTestBIS01S(filter: {set: {eq: " + 
         textInput.current.value + 
         "}}) { nextToken  " +
          "items { Countries RunningTime director id no releaseDate set titleJapanese titleOriginal " +
        "}}}";

    console.log(QueryData);

    const data = await axios.post(
      API_URL,
      {
        query: QueryData
        
      },
      {
        headers: {
          // header に APIキーを渡す。 appSync設定画面から取得
          "x-api-key": "da2-jwftawh5ojgbxd2mhkjvdzffti"
        }
      }
    )
    .then(result => setMovieRecords(result.data))
    .catch(error => console.log('error', error));

  }

  return (

    <div>
      <div>
        <input
          type="text"
          placeholder="対象のボックスNoを入力してください。"
          ref={textInput} />
        <input
          type="button"
          value="Listup"
          onClick={handleClick}
        />
      </div>
      <div>
        <label ref = {resultSearch}></label>
      </div>

      <div>
            <table border="1">
                <thead>
                    <tr>
                        <th colSpan="11">Book Information List</th>
                    </tr>
                </thead>
                <tbody  ref = {listMoviesTable} >
                    <tr><th>ID</th><th>日本語タイトル</th><th>原語タイトル</th><th>監督</th><th>公開日</th><th>上映時間</th><th>製作国</th><th>ボックスNo</th><th>ディスクNo</th></tr>
                </tbody>
            </table>
            <CSVLink data={csvData} headers={csvHeaders}>CSV出力</CSVLink>
      </div>
    </div>
  );
}

export default DispListMovies;