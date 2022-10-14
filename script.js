const divs = document.querySelectorAll(".card");
const scoreText = document.getElementById("score");
const attemptsText = document.getElementById("attempts");
const overText = document.getElementById("over");
const retryBtn = document.getElementById("retry");
const wrongText = document.getElementById("wrong");
const pairs = [
  [
    `<img src="media/img-1.png" alt="" width="200" height="200" class="img" />`,
    `<img src="media/img-1.png" alt="" width="200" height="200" class="img" />`,
  ],
  [
    `<img src="media/img-2.png" alt="" width="200" height="200" class="img" />`,
    `<img src="media/img-2.png" alt="" width="200" height="200" class="img" />`,
  ],
  [
    `<img src="media/img-3.png" alt="" width="200" height="200" class="img" />`,
    `<img src="media/img-3.png" alt="" width="200" height="200" class="img" />`,
  ],
];
const matchPairsDiv = [];
const matchPairsImg = [];
let randNum, images;
let score = 0;
let attempts = 0;
let isOver = false;

overText.style.display = "none";
retryBtn.style.display = "none";
wrongText.style.display = "none";

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 2; j++) {
    do {
      randNum = Math.floor(Math.random() * 6);
    } while (divs[randNum].innerHTML != "");
    divs[randNum].innerHTML = pairs[i][j];
  }
}

images = document.querySelectorAll(".img");
images.forEach((e) => {
  e.style.display = "none";
});

const checkDisplay = () => {
  images.forEach((e) => {
    if (e.style.display != "none") {
      return true;
    }
  });
  return false;
};

const checkSimilar = (img, ind, e) => {
  for (let i = 0; i < divs.length; i++) {
    if (
      img.style.display != "none" &&
      e.innerHTML == divs[i].innerHTML &&
      i != ind
    ) {
      return i;
    }
  }
  return null;
};

const checkClicks = (img, ind) => {
  for (let i = 0; i < divs.length; i++) {
    if (
      img.style.display != "none" &&
      images[i].style.display != "none" &&
      i != ind
    ) {
      return true;
    }
  }
  return false;
};

const clearCards = () => images.forEach((e) => (e.style.display = "none"));

const showCards = () =>
  images.forEach((e) => (e.style.display = "inline-block"));

const unclickableAll = () =>
  divs.forEach((e) => (e.style.pointerEvents = "none"));

const whitenPair = () =>
  matchPairsDiv.forEach((mp) => (mp.style.backgroundColor = "white"));

const clearImages = () =>
  matchPairsImg.forEach((e) => (e.style.display = "none"));

divs.forEach((e, ind) => {
  e.addEventListener("click", () => {
    images[ind].style.display = "inline-block";
    if (checkClicks(images[ind], ind)) {
      checkSimilar(images[ind], ind, e) != null
        ? setTimeout(() => {
            let otherIndex = checkSimilar(images[ind], ind, e);
            images[ind].style.display = "inline-block";
            images[otherIndex].style.display = "inline-block";
            matchPairsDiv.push(divs[ind], divs[otherIndex]);
            matchPairsImg.push(images[ind], images[otherIndex]);
            setTimeout(() => {
              clearImages();
              whitenPair();
            }, 500);
            score++;
            scoreText.textContent = score;
            setTimeout(() => {
              if (score >= 3) {
                unclickableAll();
                showCards();
                overText.style.display = "block";
                retryBtn.style.display = "inline-block";
                isOver = true;
              }
            }, 501);
          }, 50)
        : setTimeout(() => {
            attempts++;
            attemptsText.textContent = attempts;
            wrongText.style.display = "block";
            setTimeout(() => {
              wrongText.style.display = "none";
            }, 1000);
          }, 50);

      setTimeout(() => {
        if (!isOver) {
          clearCards();
        }
      }, 1000);
    }
  });
});

retryBtn.addEventListener("click", () => location.reload());
