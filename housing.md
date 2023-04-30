<h1>On This Day: What Happened?</h1>


<html>
<body>


<table style="width:100%" id="table">
  <tr>
    <th>Interesting Event that has happened on a day of this Week</th>
  </tr>
</table>




<script>




var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


fetch("https://fnvs.duckdns.org/api/fact", requestOptions)
  .then(response => response.json())
  .then(r => {
  r.forEach(ev => {
    const row = document.createElement("tr")
    const data = document.createElement("td")
    data.innerHTML = `${ev.date}, ${ev.year}: ${ev.fact}`
    row.appendChild(data)
    document.getElementById("table").appendChild(row)
  })
  })
  .catch(error => console.log('error', error))




function reset() {
  window.location.reload();
}




</script>


<table>
  <thead>
  <tr>
    <th>User ID</th>
    <th>New Fact for this Week</th>
  </tr>
  </thead>
  <tbody id="result">
    <!-- javascript generated data -->
  </tbody>
</table>


<script>


const resultContainer = document.getElementById("result");
  // prepare URL's to allow easy switch from deployment and localhost
const url = "https://fnvs.duckdns.org/api/fact"
  //const url = "https://flask.nighthawkcodingsociety.com/api/users"
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
            console.log(errorMsg);
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
              add_row(data[row]);
            }
        })
    })
      // catch fetch errors (ie ACCESS to server blocked)
    .catch(err => {
      console.error(err);
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.innerHTML = err;
      tr.appendChild(td);
      resultContainer.appendChild(tr);
    });
  }
</script>


<form action="javascript:create_user()">
 <p><label>
        Tell Us Something that Happened on Your Favorite Day!
        <input type="text" name="fact" id="fact" placeholder="fact" required>
        <input type="text" name="fact" id="date" placeholder="day/month" required>
        <input type="number" name="fact" id="year" placeholder="year" required>


    </label></p>
    <p><button>Add</button></p>
</form>


<script>
  function create_user() {
    fetch("https://fnvs.duckdns.org/api/fact/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({fact:document.getElementById("fact").value,date:document.getElementById("date").value,year:document.getElementById("year").valueAsNumber})
    }).then(e => console.log(
     
      "yay"
    ));
  }
</script>


</body>


</html>