const boardEl = document.querySelector('.board');
let check = true;


document.querySelectorAll('.col').forEach(el => {
  el.addEventListener('click', e => {
    console.log(Array.from(el.classList));
    console.log(Array.from(el.closest('.row').classList));


    // 중복된 돌 놓을 수 없다고 알려주기
    console.log(el.length);

    // 흑돌, 백돌 번갈아 가며 놓기(클래스 추가)
    // el.classList.add(check ? 'black' : 'white');
    // check = !check;




  })
})
