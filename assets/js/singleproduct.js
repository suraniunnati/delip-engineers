// Wait for DOM to be ready
function initProductPage() {
    var a = new URLSearchParams(window.location.search)
    let id = a.get("id")
    
    if (!id) {
        document.getElementById("shown").innerHTML = '<p class="text-center text-red-500">Product not found. <a href="../pages/product.html">Browse all products</a></p>';
        return;
    }

    fetch(`https://delip-engineers.onrender.com/product?id=${id}`)
        .then((res) => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json()
        })
        .then((res) => {
            if (!res || res.length === 0) {
                document.getElementById("shown").innerHTML = '<p class="text-center text-red-500">Product not found. <a href="../pages/product.html">Browse all products</a></p>';
                return;
            }
            
            const product = res[0];
            const shownElement = document.getElementById("shown");
            if (shownElement) {
                shownElement.innerHTML = view(res);
                
                // Update page title and meta tags for SEO
                updatePageMeta(product);
                
                // Initialize Swiper after content is loaded
                if (typeof Swiper !== 'undefined') {
                    new Swiper(".mySwiper", {
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        },
                        loop: true,
                    });
                }
            }
        })
        .catch((err) => {
            console.error('Error loading product:', err);
            const shownElement = document.getElementById("shown");
            if (shownElement) {
                shownElement.innerHTML = '<p class="text-center text-red-500">Unable to load product. Please try again or <a href="../pages/contact.html">contact us</a>.</p>';
            }
        });
}

function updatePageMeta(product) {
    const title = product.title || 'Industrial Machine';
    const description = product.des ? (product.des.length > 160 ? product.des.substring(0, 160) + '...' : product.des) : 'High-quality industrial machine from Dilip Engineers';
    
    // Update page title
    document.title = `${title} | Dilip Engineers`;
    const productTitleElement = document.getElementById("product-title");
    if (productTitleElement) {
        productTitleElement.textContent = title;
    }
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;
    
    // Update OG tags
    updateMetaTag('property', 'og:title', `${title} | Dilip Engineers`);
    updateMetaTag('property', 'og:description', description);
    if (product.img1) {
        updateMetaTag('property', 'og:image', product.img1);
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    const urlParams = new URLSearchParams(window.location.search);
    canonical.href = `https://www.dilipengineers.com/pages/singleproduct.html?id=${urlParams.get('id')}`;
    
    // Add structured data
    addProductStructuredData(product);
}

function updateMetaTag(attr, value, content) {
    let meta = document.querySelector(`meta[${attr}="${value}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, value);
        document.head.appendChild(meta);
    }
    meta.content = content;
}

function addProductStructuredData(product) {
    // Remove existing product schema if any
    const existingSchema = document.querySelector('script[type="application/ld+json"][data-product-schema]');
    if (existingSchema) {
        existingSchema.remove();
    }
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.title || "Industrial Machine",
        "description": product.des || "",
        "image": product.img1 || "",
        "brand": {
            "@type": "Brand",
            "name": "Dilip Engineers"
        },
        "manufacturer": {
            "@type": "Organization",
            "name": "Dilip Engineers"
        },
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "INR",
            "url": window.location.href
        }
    };
    
    if (product.Material) {
        schema.material = product.Material;
    }
    if (product.Productioncapacity) {
        schema.additionalProperty = [
            {
                "@type": "PropertyValue",
                "name": "Production Capacity",
                "value": product.Productioncapacity
            }
        ];
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-product-schema', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    
    // Add breadcrumb
    addBreadcrumbSchema(product);
}

function addBreadcrumbSchema(product) {
    const existingBreadcrumb = document.querySelector('script[type="application/ld+json"][data-breadcrumb-schema]');
    if (existingBreadcrumb) {
        existingBreadcrumb.remove();
    }
    
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.dilipengineers.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "https://www.dilipengineers.com/pages/product.html"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": product.title || "Product",
                "item": window.location.href
            }
        ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb-schema', 'true');
    script.textContent = JSON.stringify(breadcrumb);
    document.head.appendChild(script);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductPage);
} else {
    initProductPage();
}

function view(arr) {
    return arr.map((ele) => {
        const title = ele.title || 'Product';
        const description = ele.des || '';
        
        return `<article id="singlemain" itemscope itemtype="https://schema.org/Product">
                <div class="lg:w-6/12 w-full flex justify-center items-center p-20 wow animate__animated animate__fadeInLeft">
                 <div class="swiper mySwiper" role="region" aria-label="Product images">
                        <div class="swiper-wrapper">
                        <div class="swiper-slide"><div class="img"><img src="${ele.img1}" alt="${title} - Image 1" itemprop="image" loading="lazy" width="600" height="400"></div></div>
                        <div class="swiper-slide"><div class="img"><img src="${ele.img2}" alt="${title} - Image 2" loading="lazy" width="600" height="400"></div></div>
                        <div class="swiper-slide"><div class="img"><img src="${ele.img3}" alt="${title} - Image 3" loading="lazy" width="600" height="400"></div></div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
               </div>
                <div class="lg:w-6/12 w-full pl-20 wow animate__animated animate__fadeInRight">
                <div class="title title-bold relative mb-20 pb-5">
                <h3 itemprop="name">${title}</h3>
                </div>
                <div class="content gray text-body-3 mt-20">
                <p itemprop="description">${description}</p>
                </div>
                <table class="table-auto block max-1023:hidden">
                    <tbody>
                        <tr>
                        <td>Material</td>
                        <td>:</td>
                        <td>${ele.Material}</td>
                        </tr>
                        <tr>
                        <td>ProductionCapacity</td>
                        <td>:</td>
                        <td>${ele.Productioncapacity}</td>
                        </tr>
                        <tr>
                        <td>PowerRequirement</td>
                        <td>:</td>
                        <td>${ele.Powerrequirement}</td>
                        </tr>
                          <tr>
                        <td>Automation</td>
                        <td>:</td>
                        <td>${ele.Automation}</td>
                        </tr>
                        <tr>
                        <td>CoolingSystem</td>
                        <td>:</td>
                        <td>${ele.Coolingsystem}</td>
                        </tr>
                        <tr>
                        <td>Voltage</td>
                        <td>:</td>
                        <td>${ele.Voltage}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="hidden max-1023:block">
                <ul>
                    <li><span>Material: </span><p>${ele.Material}</p></li>
                    <li><span>ProductionCapacity: </span><p>${ele.Productioncapacity}</p></li>
                    <li><span>PowerRequirement: </span><p>${ele.Powerrequirement}</p></li>
                    <li><span>Automation: </span><p>${ele.Automation}</p></li>
                    <li><span>CoolingSystem: </span><p>${ele.Coolingsystem}</p></li>
                    <li><span>Voltage: </span><p>${ele.Voltage}</p></li>
                </ul>
                </div>
                
                <div class="flex flex-col gap-10 mt-30">
                    <div class="titlwe title-bold mb-10">
                      <h5>Click the button above to complete your purchase.</h5>
                    </div>
                    <a href="contact.html" class="btn btn-orange" aria-label="Contact us to purchase ${title}">Purchase Now</a>
                </div>
                    </div>
        </article>`;
    })
        .join("");
}