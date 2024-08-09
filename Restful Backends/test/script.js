var req = XMLHttpRequest();

req.addeventListener("load", function () {
  const data = JSON.parse(this.responseText);
  document.body.append(document.createTextNode(data.kraut));
});

req.open("GET", "https://krautipsum.com/api/kraut");

req.send();
