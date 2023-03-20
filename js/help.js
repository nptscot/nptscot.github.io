function show_help(help) {
  console.log("Trigger help");
  fetch('/manual/index.html')
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const otherPage = parser.parseFromString(html, 'text/html');
      const otherDiv = otherPage.querySelector('#' + help);
      console.log(otherDiv.innerHTML);
      document.getElementById("helpcontent").innerHTML = otherDiv.innerHTML;
    });
  document.getElementById("help").style.display = "block";
  toggle_overlay(true)

}