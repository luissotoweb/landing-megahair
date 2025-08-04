document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initCTAButtons();
    initSmoothScrolling();
    initScrollAnimations();
    startCountdown();
    // WhatsApp removido
});

// Ejemplo reducido de funciones principales

function startCountdown() {
  const countdownElement = document.getElementById('countdown');
  if (!countdownElement) return;
  let hours = 23, minutes = 59, seconds = 59;
  setInterval(function(){
    if(seconds>0) seconds--;
    else {seconds=59; if(minutes>0) minutes--; else {minutes=59; if(hours>0) hours--; else {hours=23; minutes=59; seconds=59;}}}
    countdownElement.textContent = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  },1000);
}

function initFAQ(){
  const faqItems=document.querySelectorAll('.faq__item');
  faqItems.forEach(item=>{
    const q=item.querySelector('.faq__question');
    const a=item.querySelector('.faq__answer');
    q.addEventListener('click',()=>{
      const active=item.classList.contains('active');
      faqItems.forEach(i=>{if(i!==item){i.classList.remove('active'); i.querySelector('.faq__answer').style.maxHeight='0';}});
      if(active){item.classList.remove('active'); a.style.maxHeight='0';} else {item.classList.add('active'); a.style.maxHeight=a.scrollHeight+'px';}
    });
  });
}

function initCTAButtons(){
  document.querySelectorAll('.cta-button').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.preventDefault();
      btn.style.transform='scale(0.95)';
      setTimeout(()=>{btn.style.transform='scale(1)';},150);
      window.open('https://pay.hotmart.com/your-product-link','_blank');
    });
  });
}

function initSmoothScrolling(){
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click',function(e){
      e.preventDefault();
      const target=document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
}

function initScrollAnimations(){
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.style.opacity='1';entry.target.style.transform='translateY(0)';}
    });
  },{threshold:0.1});
  document.querySelectorAll('.problem__item, .audience__item, .testimonial, .value__item').forEach(el=>{
    el.style.opacity='0';el.style.transform='translateY(30px)';el.style.transition='opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
