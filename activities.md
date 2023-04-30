
<h1>Breaking News!!</h1>
<br/>

<table  style="width:100%" id = "table">
  <thead>
  <tr>
    <th>Item</th>
    <th>City</th>
    <th>Network</th>
    <th>News</th>
  </tr>
  </thead>
  <tbody id="result">
    <!-- javascript generated data -->
  </tbody>
</table>

<script>

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

//fetch("http://127.0.0.1:8086/api/breakingnews", requestOptions)
fetch("https://fnvs.duckdns.org/api/breakingnews", requestOptions)
  .then(response => response.json())
  .then(r => {
    r.forEach(ev => {
      const row = document.createElement("tr")
      const itemData = document.createElement("td")
      itemData.innerHTML = `${ev.id}`
      row.appendChild(itemData)

      const cityData = document.createElement("td")
      cityData.innerHTML = `${ev.city}`
      row.appendChild(cityData)

      const networkData = document.createElement("td")
      networkData.innerHTML = `${ev.network}`
      row.appendChild(networkData)

      const titleData = document.createElement("td")
      titleData.innerHTML = `<a href=${ev.link}> ${ev.title} </a>`
      row.appendChild(titleData)

      document.getElementById("table").appendChild(row)
    })
  })
  .catch(error => console.log('error', error))

function reset() {
  window.location.reload();
}
</script>

<script>
const resultContainer = document.getElementById("result");
  // prepare URL's to allow easy switch from deployment and localhost
//const url = "http://127.0.0.1:8086/api/breakingnews"
const url = "https://fnvs.duckdns.org/api/breakingnews"
const create_fetch = url + '/create';
const read_fetch = url + '/';
read_users();

function read_users() {
    // prepare fetch options
    const read_options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
    };     // fetch the data from API
    fetch(read_fetch, read_options)
      // response is a RESTful "promise" on any successful fetch
      .then(response => {
        // check for response errors
        if (response.status !== 200) {
            const errorMsg = 'Database read error: ' + response.status;
            //console.log(errorMsg);
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.innerHTML = errorMsg;
            tr.appendChild(td);
            return;
        }
        // valid response will have json data
        response.json().then(data => {
            console.log(data);
            for (let row in data) {
              console.log(data[row]);
              //add_row(data[row]);
            }
        })
    }) 
      // catch fetch errors (ie ACCESS to server blocked)
    .catch(err => {
      //console.error(err);
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.innerHTML = err;
      tr.appendChild(td);
      resultContainer.appendChild(tr);
    });
  }
</script>

		
<br/>
<h2>Add Breaking News!!</h2>

<form action="javascript:create_user()">
    <p><label>
        News:
        <input type="text" name="addnews" id="addnews" required>
    </label></p>
    <p><label>
        Network:
        <input type="text" name="addnetwork" id="addnetwork" value="CNN" required>
    </label></p>
    <p><label>
        City:
        <input type="text" name="addcity" id="addcity" value="San Diego" required>
    </label></p>

    <p>
        <button>Input Breaking News</button>
    </p>
</form>

<script>
 function create_user(){
    const body = {
        title: document.getElementById("addnews").value,
        network: document.getElementById("addnetwork").value,
        city: document.getElementById("addcity").value        
    };

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer my-token',
        },
    };

//fetch("http://127.0.0.1:8086/api/breakingnews/create", requestOptions)
  fetch("https://fnvs.duckdns.org/api/breakingnews/create", requestOptions)
    .then(response  => {
       if (response.status == 200) {
          const errorMsg = 'POST SUCCESS: ' + response.status;
          console.log(errorMsg);
          reset(); 
          return;
        }
    })
    .catch(error => console.log('error', error))
 }

</script>


<br/>
<h2>Delete Breaking News!!</h2>

<form action="javascript:delete_news()">
    <p><label>
        News Item:
        <input type="text" name="deletenews" id="deletenews" required>
    </label></p>

    <p>
        <button>Delete Breaking News</button>
    </p>
</form>

<script>
 function delete_news(){
    const body = {
        id: document.getElementById("deletenews").value,
    };

    const requestOptions = {
        method: 'DELETE',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit	
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer my-token',
        },
    };

//fetch("http://127.0.0.1:8086/api/breakingnews/delete", requestOptions)
 fetch("https://fnvs.duckdns.org/api/breakingnews/delete", requestOptions)
    .then(response  => {
       if (response.status == 200) {
          const errorMsg = 'DELETE SUCCESS: ' + response.status;
          console.log(errorMsg);
          reset(); 
          return;
        }
    })
    .catch(error => console.log('error', error))
 }

</script>
