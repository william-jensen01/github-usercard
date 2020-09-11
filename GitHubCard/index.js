/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
import axios from 'axios';

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

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

function createCard(item) {
  // Create elements
  const myCard = document.createElement('div');
  const image = document.createElement('img');
  const cardInfo = document.createElement('div');
  const titleName = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const userURL = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  // apply class styles
  myCard.classList.add('card');
  cardInfo.classList.add('card-info');
  titleName.classList.add('name');
  username.classList.add('username');

  // setting the text content 
  image.src = item.avatar_url;
  titleName.textContent = item.name;
  username.textContent = item.login;
  location.textContent =  item.location;
  profile.textContent = 'Profile: ';
  userURL.setAttribute("href", item.html_url);
  userURL.textContent = item.html_url;
  followers.textContent = `Followers: ${item.followers}`;
  following.textContent = `Following: ${item.following}`;
  bio.textContent = `Bio: ${item.bio}`;

  // create structure
  myCard.append(image, cardInfo);
  cardInfo.append(titleName, username, location, profile, followers, following, bio);
  profile.append(userURL);

  return myCard
}
const cards = document.querySelector('.cards');

// create my personal github card
axios
  .get("https://api.github.com/users/william-jensen01")
  .then((r) => {
    console.log('success', r)
    const newCard = createCard(r.data)
    cards.appendChild(newCard);
    })
  .catch((err) => console.log(err))

// array with API link of LS Instructors
let followersArray = [
  "https://api.github.com/users/tetondan",
  "https://api.github.com/users/dustinmyers",
  "https://api.github.com/users/justsml",
  "https://api.github.com/users/luishrd",
  "https://api.github.com/users/bigknell",
];
followersArray.forEach((user) => {
  axios
    .get(user)
    .then((r) => {
      cards.appendChild(createCard(r.data))
    })
    .catch((error) => console.log(error))
});
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

// Stretch
// creating github cards programmatically by requesting followers data after receiving my data
// this is done by chaining promises
followersArray = axios
  .get('https://api.github.com/users/william-jensen01/followers')
  .then(r => {
    r.data.forEach(follower => {
      axios
        .get(`https://api.github.com/users/${follower.login}`)
        .then(r => {
          cards.append(createCard(r.data));
        })
        .catch(error => console.log(error))
    })
  })
  .catch(error => console.log(error))