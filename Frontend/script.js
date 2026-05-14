// ================= CONTACT FORM =================

document.addEventListener("DOMContentLoaded", () => {

  const form =
  document.getElementById("contactForm");

  if(form){

    form.addEventListener("submit",
    async (e) => {

      e.preventDefault();

      const data = {

        name:
        document.getElementById("name").value,

        email:
        document.getElementById("email").value,

        message:
        document.getElementById("message").value

      };

      try {

        const response = await fetch(
          "http://localhost:8000/contact",

        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify(data)

        });

        const result =
        await response.json();

        if(response.ok) {
          alert("✅ " + result.success);
          form.reset();
        } else {
          alert("❌ " + result.error);
        }

      }

      catch (error) {

        console.error(error);

        alert(
          "Failed to send message"
        );

      }

    });

  }

});

// ================= MOBILE MENU =================

const menuToggle =
document.getElementById("menuToggle");

const navMenu =
document.getElementById("navMenu");

if(menuToggle){

  menuToggle.addEventListener("click", ()=>{

    navMenu.classList.toggle("active");

  });

}

// ================= LOADER =================

window.addEventListener("load", ()=>{

  const loader =
  document.getElementById("loader");

  if(loader){

    setTimeout(()=>{

      loader.style.opacity="0";

      loader.style.visibility="hidden";

    },1200);

  }

});

// ================= SCROLL REVEAL =================

ScrollReveal().reveal('.hero-content', {

  distance:'60px',

  duration:1800,

  origin:'bottom',

  delay:200

});

ScrollReveal().reveal('.card', {

  interval:200,

  distance:'40px',

  origin:'bottom'

});

ScrollReveal().reveal('.about-image', {

  origin:'left',

  distance:'80px',

  duration:1800

});

ScrollReveal().reveal('.about-content', {

  origin:'right',

  distance:'80px',

  duration:1800

});

ScrollReveal().reveal('.testimonial-card', {

  interval:200

});

ScrollReveal().reveal('.gallery-grid img', {

  interval:120

});

ScrollReveal().reveal('.contact-left', {

  origin:'left',

  distance:'80px'

});

ScrollReveal().reveal('.contact-right', {

  origin:'right',

  distance:'80px'

});

// ================= NAVBAR SCROLL EFFECT =================

window.addEventListener("scroll", ()=>{

  const header =
  document.querySelector("header");

  if(window.scrollY > 50){

    header.style.background =
    "rgba(0,0,0,0.92)";

    header.style.boxShadow =
    "0 10px 30px rgba(0,0,0,0.3)";

  }

  else{

    header.style.background =
    "rgba(0,0,0,0.45)";

    header.style.boxShadow =
    "none";

  }

});