/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

// This is an axios get request
axios.get('http://api.github.com/users/brownbatz')
  .then( response => {
    // Response is an object, response.data is an array
    console.log('This is the response', response);
    console.log('This is the response data', response.data);
  })
  .catch( err => {
    console.log('Error: ', err);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

// This is the git request that will kick of the creation of the cards
axios.get('http://api.github.com/users/brownbatz')
  .then( response => {
    // If successful create new card and add it to the DOM
    let newCard = cardCreator(response.data);
    let cards = document.querySelector('.cards');
    cards.appendChild(newCard);
  })
  .catch( err => {
    console.log('Error: ', err);
  });

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

// Iterating over all instructors to create cards for them
followersArray.forEach( (item) => {
  axios.get(`http://api.github.com/users/${item}`)
  .then( response => {
    // If successful create new card and add it to the DOM
    let newCard = cardCreator(response.data);
    let cards = document.querySelector('.cards');
    cards.appendChild(newCard);
  })
  .catch( err => {
    console.log('Error: ', err);
  });
});


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function cardCreator(object){
  // Div setup
  let card = document.createElement('div');
  card.classList.add('card');

  // img setup
  let userImg = document.createElement('img');
  userImg.setAttribute('src', object.avatar_url);
  card.appendChild(userImg);

  // inner div
  let cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');
    //Name
    let name = document.createElement('h3');
    name.classList.add('name');
    name.textContent = object.name;
    cardInfo.appendChild(name);
    //Username
    let username = document.createElement('p');
    username.classList.add('username');
    username.textContent = object.login;
    cardInfo.appendChild(username);
    //Location
    let location = document.createElement('p');
    location.textContent = `Location: ${object.location}`;
    cardInfo.appendChild(location);
    //profile
    let profile = document.createElement('p');
    profile.textContent = 'Profile: ';
      //Profile Link
      let profileLink = document.createElement('a');
      profileLink.setAttribute('href', object.html_url);
      profileLink.textContent = object.html_url;
      profile.appendChild(profileLink);
    cardInfo.appendChild(profile);
    // Followers
    let followers = document.createElement('p');
    followers.textContent = `Followers: ${object.followers}`;
    cardInfo.appendChild(followers);
    // Following
    let following = document.createElement('p');
    following.textContent = `Following: ${object.following}`;
    let bio = document.createElement('p');
    bio.textContent = `Bio: ${object.bio}`;
  
  card.appendChild(cardInfo);

  return card;

}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
