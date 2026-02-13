var titles = [
  "@",
  "@T",
  "@Tr",
  "@Trn",
  "@Trng",
  "@Trngu",
  "@Trnguy",
  "@Trnguye",
  "@Trnguyen",
  "@Trnguye",
  "@Trnguy",
  "@Trngu",
  "@Trng",
  "@Trn",
  "@Tr",
  "@T"
];

function changeTitle() {
  var index = 0;

  setInterval(function() {
      document.title = titles[index];
      index = (index + 1) % titles.length;
  }, 1000);
}

changeTitle();
