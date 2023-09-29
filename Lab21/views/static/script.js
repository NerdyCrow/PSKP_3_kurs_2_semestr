function Add() {
    let name = document.getElementById('name').value
    let number = document.getElementById('number').value
    fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'text/html' },
        body: JSON.stringify({ name: name, number: number })
    })
        .then(response => { return response.text() })
        .then((body) => {
            var newHTML = document.open("text/html", "replace");
            newHTML.write(body);
            newHTML.close();
            document.location = '/'
        })
}


function Edit() {
    let name = document.getElementById('name').value
    let number = document.getElementById('number').value
    fetch('/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'text/html' },
        body: JSON.stringify({ name: name, number: number })
    })
        .then(response => { return response.text() })
        .then((body) => {
            var newHTML = document.open("text/html", "replace");
            newHTML.write(body);
            newHTML.close();
            document.location = '/'
        })
}

function Delete() {
    let name = document.getElementById('name').value
    console.log(name);
    fetch('/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'text/html' },
        body: JSON.stringify({ name: name })
    })
        .then(response => { return response.text() })
        .then((body) => {
            var newHTML = document.open("text/html", "replace");
            newHTML.write(body);
            newHTML.close();
            document.location = '/'
        })
}