
/*Courses show more*/

<script>
  function _f(id) {
    return document.getElementById(id);
  }

  let div = _f("maindiv");
  let btn = _f("btn");

  btn.onclick = function () {
    if (div.className == "cls") {
      div.className = "";
      btn.innerHTML = "Show More";
    } else {
      div.className = "cls";
      btn.innerHTML = "Show Less";
    }
  };
</script>