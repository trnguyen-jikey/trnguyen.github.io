var titles = [
  "@",
  "@K",
  "@Kr",
  "@Kru",
  "@Kru_",
  "@Kru_a",
  "@Kru_al",
  "@Kru_ali",
  "@Kru_alie",
  "@Kru_alien",
  "@Kru_alie",
  "@Kru_ali",
  "@kru_al",
  "@kru_a",
  "@Kru_",
  "@Kru",
  "@Kr",
  "@k"
];

function changeTitle() {
  var index = 0;

  setInterval(function() {
      document.title = titles[index];
      index = (index + 1) % titles.length;
  }, 1000);
}

changeTitle();
