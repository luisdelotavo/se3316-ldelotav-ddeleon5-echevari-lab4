import logo from './logo.svg';
import './App.css';

function App() {
  
  return (
    <div>
    <div className="intro">

        <table className= "search-bar">
            <tr>
                <td>
                    <label className="trackSearchText">Search By Track Name:</label>
                    <input id="trackSearch" type="text" placeholder="Enter Track"/>
                    <button id = "trackButton" type="button">Search</button>
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
        <ul id="tracks"></ul>
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
    <script src="app.js" defer></script>   
</div>
  );
}

export default App;
