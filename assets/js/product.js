var products = []
function productData() {
  fetch(`https://delip-engineers.onrender.com/product`)
    .then((r) => {
      return r.json();
    })
    .then((res) => {
      console.log(res);
        products = res
      document.getElementById("box").innerHTML = view(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function view(arr) {
  //  if (arr.length === 0) {
  //   return <p class="text-center text-red-500 font-bold">No Products Found</p>;
  // }
  return arr
    .map((ele) => {
      return ` <div class="productBox wow animate__animated animate__fadeIn">
      <a href="singleproduct.html?id=${ele.id}">
                <div class="img p-10">
                    <img src="${ele.img1}" alt="${ele.title}">
                </div>
                <div class="relative p-20 h-full">
                    <div class="shap"></div>
                    <div class="title title-bold relative">
                        <h3>${ele.title}</h3>
                    </div>
                    <div class="content text-body-3 pt-10 gray-2">
                        <p><span class="font-bold">Details: </span>${ele.des}</p>
                    </div>
                    <div class="custom-btn flex justify-center items-center pt-20">
                        <a href="singleproduct.html?id=${ele.id}" class="btn btn-orange read-more">Read More</a>
                    </div>
                </div>
                  </a>
            </div>`;
    })
    .join("");
}

productData();

document.getElementById("searchInput").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = products.filter((p) => 
    p.title.toLowerCase().includes(keyword) 
  );
  document.getElementById("box").innerHTML = view(filtered);
});

