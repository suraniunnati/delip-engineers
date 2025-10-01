var a = new URLSearchParams(window.location.search)
let id = a.get("id")
console.log(id)

fetch(`http://localhost:3000/product?id=${id}`)
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        console.log(res)
        console.log("return product")
        document.getElementById("shown").innerHTML = view(res)

         new Swiper(".mySwiper", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        loop: true,
    })
    })

function view(arr) {
    return arr.map((ele) => {
        return `<div id="singlemain">
                <div class="lg:w-6/12 w-full flex justify-center items-center p-20 wow animate__animated animate__fadeInLeft">
                 <div class="swiper mySwiper">
                        <div class="swiper-wrapper">
                        <div class="swiper-slide"><div class="img"><img src="${ele.img1}"></div></div>
                        <div class="swiper-slide"><div class="img"><img src="${ele.img2}"></div></div>
                        <div class="swiper-slide"><div class="img"><img src="${ele.img3}"></div></div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
               </div>
                <div class="lg:w-6/12 w-full pl-20 wow animate__animated animate__fadeInRight">
                <div class="title title-bold relative mb-20 pb-5">
                <h3>${ele.title}</h3>
                </div>
                <div class="content gray text-body-3 mt-20">
                <p>${ele.des}</p>
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
                    <a href="contact.html" class="btn btn-orange">Purchase Now</a>
                </div>
                    </div>
        </div>`;
    })
        .join("");
}