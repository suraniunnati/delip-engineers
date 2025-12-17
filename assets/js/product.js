var products = []
function productData() {
  fetch(`https://delip-engineers.onrender.com/product`)
    .then((r) => {
      return r.json();
    })
    .then((res) => {
      console.log(res);
        products = res
      const boxElement = document.getElementById("box");
      if (boxElement) {
        boxElement.innerHTML = view(res);
        // Update page title and meta description for better SEO
        if (res.length > 0) {
          document.title = `Industrial Machines - ${res.length} Products | Dilip Engineers`;
        }
      }
    })
    .catch((err) => {
      console.error('Error loading products:', err);
      const boxElement = document.getElementById("box");
      if (boxElement) {
        boxElement.innerHTML = '<p class="text-center text-red-500 font-bold">Unable to load products. Please refresh the page or contact us.</p>';
      }
    });
}

function view(arr) {
  if (arr.length === 0) {
    return '<p class="text-center text-red-500 font-bold">No Products Found</p>';
  }
  return arr
    .map((ele) => {
      // Escape HTML to prevent XSS
      const title = ele.title || 'Product';
      const description = ele.des || 'Industrial machine';
      const safeDescription = description.length > 150 ? description.substring(0, 150) + '...' : description;
      
      return ` <article class="productBox wow animate__animated animate__fadeIn" itemscope itemtype="https://schema.org/Product">
      <a href="singleproduct.html?id=${ele.id}" itemprop="url">
                <div class="img p-10">
                    <img src="${ele.img1}" alt="${title} - ${description}" itemprop="image" loading="lazy" width="400" height="300">
                </div>
                <div class="relative p-20 h-full">
                    <div class="shap"></div>
                    <div class="title title-bold relative">
                        <h3 itemprop="name">${title}</h3>
                    </div>
                    <div class="content text-body-3 pt-10 gray-2">
                        <p itemprop="description"><span class="font-bold">Details: </span>${safeDescription}</p>
                    </div>
                    <div class="custom-btn flex justify-center items-center pt-20">
                        <a href="singleproduct.html?id=${ele.id}" class="btn btn-orange read-more" aria-label="View details for ${title}">Read More</a>
                    </div>
                </div>
                  </a>
            </article>`;
    })
    .join("");
}

// Initialize products on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', productData);
} else {
  productData();
}

// Search functionality
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = products.filter((p) => 
      p.title.toLowerCase().includes(keyword) || 
      (p.des && p.des.toLowerCase().includes(keyword))
    );
    const boxElement = document.getElementById("box");
    if (boxElement) {
      boxElement.innerHTML = filtered.length > 0 ? view(filtered) : '<p class="text-center text-gray-500 font-bold">No products found matching your search.</p>';
    }
  });
}

