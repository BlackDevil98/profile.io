
class TypeWriter{
  constructor(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type(){
    //Current index
    const current = this.wordIndex % this.words.length;
    //full text of surrent word
    const fulltxt = this.words[current];

    if(this.isDeleting){
      //remove
      this.txt = fulltxt.substring(0, this.txt.length - 1);
    }
    else{
      //add
      this.txt = fulltxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 200;
    if(this.isDeleting){
      typeSpeed /= 1;
    }

    if(!this.isDeleting && this.txt === fulltxt){
      //puse and end
      typeSpeed = this.wait;
      //delete to getAttribute
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}


//Load
document.addEventListener('DOMContentLoaded', init);

//App
function init(){
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  //TypeWriter
  new TypeWriter(txtElement, words, wait);
}


//html file
/*<div class="container">
  <div class="row">
    <h1>I'm Black Devil, a<br>
      <span class="txt-type" data-wait="3000" data-words='["Developer","Designer","Creator"]'></span>
    </h1>
  </div>
</div>*/
