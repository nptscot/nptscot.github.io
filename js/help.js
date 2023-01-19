function show_help(help) {
  switch (help) {
      case 'purpose':
        document.getElementById("helpcontent").innerHTML = `
        <h3>Trip purpose</h3>
        <p>Help for trip purpose</p>
        `;
        break;
      case 'type':
        document.getElementById("helpcontent").innerHTML = `
        <h3>Route type</h3>
        <p>Help for route type</p>
        `;
        break;
      case 'scenario':
        document.getElementById("helpcontent").innerHTML = `
        <h3>Scenarios</h3>
        <p>Help for scenarios</p>
        `;
        break;
      default:
        console.log('unknown help selected');
  }
  document.getElementById("help").style.display = "block";
  toggle_overlay(true)

}

