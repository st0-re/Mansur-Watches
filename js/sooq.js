
let cards = document.getElementById("cards");
const imgUrl = "http://aliemadhadi-001-site1.htempurl.com/Content/imgs/";


// backend
function fetchData() {
    // Make a GET request using fetch
  return fetch(`http://aliemadhadi-001-site1.htempurl.com/Product/GetAll`)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the JSON data in the response and return it
            return response.json();
        });
}
fetchData()
    .then(data => {
      console.log(data);
      Display(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

function Display(data) {
  cards.innerHTML = "";
  if (data !== null || data.length !== 0) {
 
    for (let i = 0; i < data.length; i++) {
      cards.innerHTML += `<div class="product">
        <img class="prodImg" src="${imgUrl}${data[i].img}" />
        <button class="btn" id="${data[i].id}" onclick="buy(${data[i].id})">اشترى الان</button>
        
      </div>`
    }
    
  }
}

function buy(id) {
  let ordersArr = JSON.parse(localStorage.getItem("orders")) || [];
  let index = ordersArr.indexOf(id);
  if (index !== -1) {
    ordersArr.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(ordersArr));
    let clickedButton = document.getElementById(id);
    if (clickedButton) {
      clickedButton.classList.remove("clickedButton");
    }
    
  } else {
    ordersArr.push(id);
    localStorage.setItem("orders", JSON.stringify(ordersArr));
    for (let i = 0; i < ordersArr.length; i++) {
      let item = document.getElementById(ordersArr[i])
      item.classList.add("clickedButton");
    }
  }
 
}

let Order = new FormData();
let submit = document.getElementById("submit");
submit.addEventListener("click", function (e) {
  e.preventDefault();
  let ordersArr = JSON.parse(localStorage.getItem("orders")) || [];
  if (ordersArr.length < 3 || ordersArr.length > 3) {
    alert("Please Select Three Products");
    return;
  }
  console.log(ordersArr);
  let Name = document.getElementById("name");
  let Address = document.getElementById("address");
  let PhoneNo = document.getElementById("phone");
  Order.append('Name', Name.value);
  Order.append('Address', Address.value);
  Order.append('PhoneNo', PhoneNo.value);
  Order.append('prdId', ordersArr);
  console.log("prdId:", ordersArr);
  SetData();
})


function SetData() {
  // backend
  function fetchData() {
    // Make a GET request using fetch
    return fetch(`http://aliemadhadi-001-site1.htempurl.com/Purchases/Add`, {
      method: 'POST',
      body: Order
    })
      .then(response => {
        console.log(response)
     
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON data in the response and return it
        return response.json();
      });
  }
  fetchData()
    .then(data => {
      console.log(data);
      alert(data);
      localStorage.removeItem("orders")
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

























// let sliderImages = document.querySelectorAll(".slide"),
//   arrowLeft = document.querySelector("#arrow-left"),
//   arrowRight = document.querySelector("#arrow-right"),
//   current = 0;

// // Clear all images
// function reset() {
//   for (let i = 0; i < sliderImages.length; i++) {
//     sliderImages[i].style.display = "none";
//   }
// }

// // Init slider
// function startSlide() {
//   reset();
//   sliderImages[0].style.display = "block";
// }

// // Show prev
// function slideLeft() {
//   reset();
//   sliderImages[current - 1].style.display = "block";
//   current--;
// }

// // Show next
// function slideRight() {
//   reset();
//   sliderImages[current + 1].style.display = "block";
//   current++;
// }

// // Left arrow click
// arrowLeft.addEventListener("click", function() {
//   if (current === 0) {
//     current = sliderImages.length;
//   }
//   slideLeft();
// });

// // Right arrow click
// arrowRight.addEventListener("click", function() {
//   if (current === sliderImages.length - 1) {
//     current = -1;
//   }
//   slideRight();
// });

// startSlide();
