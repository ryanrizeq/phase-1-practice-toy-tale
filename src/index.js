let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyCollection = document.getElementById('toy-collection');
  
  // Create Toy Collection
  function fetchToyList () {
    fetch('http://localhost:3000/toys')
    .then((response) => response.json())
    .then((data) => {
      const toyData = Object.values(data);
      for (let i = 0; i < data.length; i++) {
        const toyCard = document.createElement('div');
        const name = document.createElement('h2');
        const img = document.createElement('img');
        const likes = document.createElement('p');
        const likeButton = document.createElement('button');

        toyCard.className = 'card';
        toyCollection.appendChild(toyCard);

        name.textContent = toyData[i]['name'];
        toyCard.appendChild(name);

        img.src = toyData[i]['image'];
        img.className = 'toy-avatar';
        toyCard.appendChild(img);

        likes.textContent = `${toyData[i]['likes']} Likes`
        toyCard.appendChild(likes);

        likeButton.className = 'like-btn';
        likeButton.id = `${toyData[i]['id']}`;
        likeButton.textContent = 'Like ❤️';
        toyCard.appendChild(likeButton);

        likeButton.addEventListener('click', () => {
          console.log('I have been clicked')
          newLikes = ['likes'] + 1;
          fetch('http://localhost:3000/toys', {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              likes: newLikes
            })
          })
      })
      }
      
    })
  }

  fetchToyList();
  
  
  // Submit New Toy
  const newToyForm = document.getElementsByClassName('add-toy-form');
  newToyForm[0].addEventListener('submit', (event) => {
    event.preventDefault();
    newToyName = event.target.children[1].value;
    newToyWebsite = event.target.children[3].value;

    const formData = {
      name: newToyName,
      image: newToyWebsite,
      likes: 0
    }

    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch('http://localhost:3000/toys', configurationObject);

      const toyCard = document.createElement('div');
      const name = document.createElement('h2');
      const img = document.createElement('img');
      const likes = document.createElement('p');
      const likeButton = document.createElement('button');

      toyCard.className = 'card';
      toyCollection.appendChild(toyCard);

      name.textContent = newToyName;
      toyCard.appendChild(name);

      img.src = newToyWebsite;
      img.className = 'toy-avatar';
      toyCard.appendChild(img);

      likes.textContent = `0 Likes`
      toyCard.appendChild(likes);

      likeButton.className = 'like-btn';
      likeButton.id = '[toy_id]';
      likeButton.textContent = 'Like ❤️';
      toyCard.appendChild(likeButton);
  })

  
})
