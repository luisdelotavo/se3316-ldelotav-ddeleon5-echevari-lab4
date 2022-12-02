import { useEffect, useState } from 'react';
import './App.css';

function App() {
  

  const [tracks, setTrack] = useState([]);

  let lastSearch = "";

  // useEffect(async () =>{
  //   const 
  // },[])

  // var lettersRegex = /[\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/; //charcater list

  // function sanitization(input){
  //   if(input.value.length > 20 || lettersRegex.test(input.value)){
  //     alert("ERROR: Character length too long or invalid characters!");
  //     input1.value = ""; //clears the textbox
  //     // input2.value = "";
  //     // input3.value = "";
  //     // input4.value = ""; //clears the textbox
  //     // input5.value = "";
  //     // input6.value = "";
  //     return false;
  //   }
  //   else return true;
  // }

  async function searchTracks(){
    alert(document.getElementById('trackSearch').value)
    const res = await fetch(`/trackName/${document.getElementById('trackSearch').value}`);
    const data = await res.json();

    setTrack([...data])
  }

  const mapTracks = tracks.map(data =>(
    <li className='list-elements'>
          <table className='search-table'>
            <tr className='search-row'>
              <td className='search-data'>
                {`${data.track_title}`}
              </td>
              <td className='search-data'>
                {`${data.artist_name}`}
              </td>
              <td className='search-data'>
                {`${data.album_title}`}
              </td>
            </tr>
          </table>
        </li>
  ));
    // lastSearch = `/trackNo/${input1.value.toLowerCase()}`;

    //Grab list
    // const l = document.getElementById('tracks');

    // //If list is populated clear list
    // if(l.childNodes[0]){
    //   for(let j = 0; j < 10; j++){
    //     l.removeChild(l.childNodes[0]);
    //   }
    // }
  
    
    //Populating list
  //   fetch(`/lists/trackNo/${input1.value}`)
  //   .then(res => res.json()
  //   .then(data => {
  //     console.log(data);
  //     data.forEach(e => { //ERROR ANONYMOUS
        
  //       // const item = document.createElement('li');
  //       // item.classList.add('list-elements');
  //       // const table = document.createElement('table');
  //       // table.classList.add("search-table");
  //       // item.appendChild(table);
  //       // const tr = document.createElement('tr');
  //       // tr.classList.add("search-row")
  //       // table.appendChild(tr);

  //       // const td = document.createElement('td');
  //       // td.classList.add("search-data");
  //       // tr.appendChild(td);
  //       // td.appendChild(document.createTextNode(`${e.track_title}`));

  //       // const td2 = document.createElement('td');
  //       // td2.classList.add("search-data");
  //       // tr.appendChild(td2);
  //       // td2.appendChild(document.createTextNode(`${e.artist_name}`));

  //       // const td3 = document.createElement('td');
  //       // td3.classList.add("search-data");
  //       // tr.appendChild(td3);
  //       // td3.appendChild(document.createTextNode(`${e.album_title}`));

  //       // // const td4 = document.createElement('td');
  //       // // td4.classList.add("search-data");
  //       // // tr.appendChild(td4);
  //       // // td4.appendChild(document.createTextNode(`${e.track_duration}`));
        
  //       // // l.appendChild(item);
  //     });
  //   }))
  //   input1.value = ""; //clears the textbox
  //   // input2.value = "";
  //   // input3.value = "";
  // }

  // let listArray = [];

  return (
    <div>
    <div className="intro">
        <table className= "search-bar">
            <tr>
                <td>
                    <label className="trackSearchText">Search By Track Name:</label>
                    <input id="trackSearch" type="text" placeholder="Enter Track"/>
                    <button id = "trackButton" type="button" onClick={searchTracks}>Search</button>
                </td>
                <td>
                    <label  className="artistSearchText">Search By Artist Name:</label>
                    <input id="artistSearch" type="text" placeholder="Enter Artist"/>
                    <button id = "artistButton" type="button">Search</button>
                </td>
                <td>
                    <label className="albumSearchText">Search By Album Name:</label>
                    <input id="albumSearch" type="text" placeholder="Enter Album"/>
                    <button id = "albumButton" type="button">Search</button>
                </td>
            </tr>
        </table>

        <table className= "header-table">
            <tr className = "search-row">
                <th><button id = "titleSort" type="button">Track Title</button></th>
                <th><button id = "artistSort" type="button">Artist Name</button></th>
                <th><button id = "albumSort" type="button">Album Title</button></th>
                <th><button id = "durationSort" type="button">Track Duration</button></th>
            </tr>
        </table>
        <ul id="tracks">{mapTracks}</ul>
    </div>
    <div className = "info">
        <h2>Create/Delete List</h2>
        <span className="infoContent">
            List Name: <input type="text" id="listName"/>
            <button id="addList">Add</button>
            <button id="deleteList">Delete</button>
        </span>
        <h2>Add tracks</h2>
        <span>
            List Name: <input type="text" id="listName2"/>
            Track ID: <input type="number" id="trackID"/>
            <button id="addtrack">Add</button>
        </span>
        <div id="lists"></div>
    </div>   
</div>
  );
}
export default App;
