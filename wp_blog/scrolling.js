let last_known_scroll_position = 0;
let ticking = false;
let before_scroll_position = 0;
let nav = document.getElementsByClassName("top-nav");

function doSomething(scroll_pos) {
  console.log(nav);

  if (scroll_pos >= before_scroll_position) {
    nav[0].classList.add("down");
    nav[0].classList.remove("up");
  } else {
    nav[0].classList.add("up");
    nav[0].classList.remove("down");
  }
}

window.addEventListener("scroll", function (e) {
  before_scroll_position = last_known_scroll_position;
  last_known_scroll_position = window.scrollY;
  if (last_known_scroll_position == 0) {
    nav[0].classList.remove("up");
    nav[0].classList.remove("down");
  } else {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        doSomething(last_known_scroll_position);
        ticking = false;
      });

      ticking = true;
    }
  }
});
