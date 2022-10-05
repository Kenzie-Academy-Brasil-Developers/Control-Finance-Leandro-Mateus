const btnCloseModal = document.querySelectorAll(".btnCloseModal");
const btnOpenModal = document.querySelector(".btnOpenModal");
const modalWrapper = document.querySelector(".modalWrapper");

function openAndcloseModal() {
  
    btnOpenModal.addEventListener("click", (e) => {
      e.preventDefault();
      modalWrapper.classList.remove("hidden");
    });
  

  btnCloseModal.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      modalWrapper.classList.add("hidden");
    });
  });
}

openAndcloseModal();
