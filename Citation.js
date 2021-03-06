let button = document.querySelector('button');
let citation = document.querySelector('#citation');
let auteur = document.querySelector('#auteur');

let dernier = 0;
let nombreAleatoire=0;

let calculateAngle = function(e, item, parent) {
  let dropShadowColor = `rgba(0, 0, 0, 0.3)`
  // If the button has a data-filter-color attribute, then use this for the shadow's color
  if(parent.getAttribute('data-filter-color') !== null) {
      dropShadowColor = parent.getAttribute('data-filter-color');
  }

  // If the button has a data-custom-perspective attribute, then use this as the perspective.
  if(parent.getAttribute('data-custom-perspective') !== null) {
      parent.style.perspective = `${parent.getAttribute('data-custom-perspective')}`
  }

  // Get the x position of the users mouse, relative to the button itself
  let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
  // Get the y position relative to the button
  let y = Math.abs(item.getBoundingClientRect().y - e.clientY);

  // Calculate half the width and height
  let halfWidth  = item.getBoundingClientRect().width / 2;
  let halfHeight = item.getBoundingClientRect().height / 2;

  // Use this to create an angle. I have divided by 6 and 4 respectively so the effect looks good.
  // Changing these numbers will change the depth of the effect.
  let calcAngleX = (x - halfWidth) / 6;
  let calcAngleY = (y - halfHeight) / 4;

  // Set the items transform CSS property
  item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${calcAngleY}deg) scale(1.15)`;
      
  // And set its container's perspective.
  parent.style.perspective = `${halfWidth * 2}px`
  item.style.perspective = `${halfWidth * 3}px`

  // Reapply this to the shadow, with different dividers
  let calcShadowX = (x - halfWidth) / 3;
  let calcShadowY = (y - halfHeight) / 3;
      
  // Add a filter shadow - this is more performant to animate than a regular box shadow.
  item.style.filter = `drop-shadow(${-calcShadowX}px ${calcShadowY}px 15px ${dropShadowColor})`;
}

  document.querySelectorAll('.nouveau').forEach(function(item) {
    // Add on mouseenter
    item.addEventListener('mouseenter', function(e) {
        calculateAngle(e, this.querySelector('span'), this);
    });
    // Add on mousemove
    item.addEventListener('mousemove', function(e) {
        calculateAngle(e, this.querySelector('span'), this);
    });

    // Reset everything on mouse leave
    item.addEventListener('mouseleave', function(e) {
        let dropShadowColor = `rgba(0, 0, 0, 0.3)`
        if(item.getAttribute('data-filter-color') !== null) {
            dropShadowColor = item.getAttribute('data-filter-color')
        }
        item.querySelector('span').style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
        item.querySelector('span').style.filter = `drop-shadow(0 10px 15px ${dropShadowColor})`;
    });
})


let citations = [
    ["La vie est un myst??re qu'il faut vivre, et non un probl??me ?? r??soudre.", "Gandhi"],
    ["Le plus grand risque est de ne prendre aucun risque.", "Mark Zuckerberg"],
    ["M??ritez votre statut de leader chaque jour.", "Mickael Jordan"],
    ["Soyez le changement que vous voulez voir dans le monde.", "Gandhi"],
    ["A chaque fois que vous vous retrouvez du m??me c??t?? que la majorit??, il est temps de prendre du recul, et de r??fl??chir.", "Mark Twain"],
    ["Seulement ceux qui prendront le risque d???aller trop loin d??couvriront jusqu???o?? on peut aller.", "T.S Elliot"],
    ["Le succ??s c???est tomber sept fois, se relever huit.", "Proverbe japonais"],
    ["Dans vingt ans vous serez plus d????us par les choses que vous n???avez pas faites que par celles que vous avez faites. Alors sortez des sentiers battus. Mettez les voiles. Explorez. R??vez. D??couvrez.", "Mark Twain"],
    ["Si vous attendez pour agir, tout ce que vous gagnerez, avec le temps, c???est de l?????ge.", "Brian Tracy"],
    ["Quand on concentre son attention sur un seul projet, l???esprit sugg??re constamment des id??es et des am??liorations qui lui ??chapperaient s???il ??tait occup?? avec plusieurs projets en m??me temps.", "P.T. Barnum"],
    ["Se d??dier ?? faire tout ce que l???on peut pour aider les autres ?? obtenir ce qu???ils veulent, c???est la cl?? du succ??s.", "Brian Sher"],
    ["Si vous pensez que vous ??tes trop petit pour avoir de l???impact, essayez d???aller au lit avec un moustique.", "Anita Roddick"],
    ["Ne jugez pas chaque jour sur ce que vous r??coltez, mais sur les graines que vous semez.", "Robert Louis Stevenson"],
    ["L???action est la cl?? fondamentale de tout succ??s.", "Pablo Picasso"],
    ["Le succ??s, c???est se promener d?????checs en ??checs tout en restant motiv??.", "Winston Churchill"],
    ["Votre avenir est cr???? par ce que vous fa??tes aujourd???hui, pas demain.", "Robert T. Kiyosaki"],
    ["Ne vous d??couragez pas, c???est souvent la derni??re clef du trousseau qui ouvre la porte.", "Zig Ziglar"],
    ["Pour gagner votre vie, apprenez ?? l?????cole. Pour gagner une fortune, apprenez par vous-m??me.", "Brian Tracy"],
    ["Les gagnants trouvent des moyens, les perdants des excuses???", "F. D. Roosevelt"],
    ["Vous n?????tes jamais trop vieux pour vous fixer de nouveaux buts, ou rendre vos r??ves r??alit??.", "C.S. Lewis"],
    ["Un pessimiste voit la difficult?? dans chaque opportunit??. Un optimiste voit une opportunit?? dans chaque difficult??.", "Winston Churchill"]
  ];



  function genererNombreEntier(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  
button.addEventListener('click', ()=>{
  do {
   nombreAleatoire = genererNombreEntier(citations.length)
   } while (nombreAleatoire==dernier)

   citation.textContent=citations[nombreAleatoire][0]
   auteur.textContent=citations[nombreAleatoire][1]
   dernier= nombreAleatoire;
})

  
