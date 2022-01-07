## Spacestagram

Demo link: [https://www.dpmv.me/spacestagram/](https://www.dpmv.me/spacestagram/)

### Web application made for [Shopify's Frontend Development Challenge](https://docs.google.com/document/d/13zXpyrC2yGxoLXKktxw2VJG2Jw8SdUfliLM-bYQLjqE/edit?usp=sharing).

This single-page web app displays the past 30 features from [NASA's Photo of the Day](https://www.nasa.gov/multimedia/imagegallery/iotd.html).

### Tech

NASA APOD API, React, axios, GitHub Pages

### General flow

The user is brought to an empty state loading screen until the NASA API request is complete

![home-loading-light](https://user-images.githubusercontent.com/39651860/148599459-cdc03137-41db-473d-b7d0-d3183c015f24.png)

After the images load, the user is shown 30 posts in a grid that can be clicked on. Also shown is dark mode and light mode, which is toggleable by clicking the icon in the top right.

![home-light](https://user-images.githubusercontent.com/39651860/148599624-883e7073-4cd6-4434-a2c0-45bd2de497d6.png)
![home-dark](https://user-images.githubusercontent.com/39651860/148599634-7fd3f3ef-5535-4e1f-8386-0886940ca17a.png)

Clicking on a post brings up a modal that shows the NASA Photo of the day and some descriptive text on the right. The user can like (or unlike if already liked) this post, which is added to a list.

![modal-light](https://user-images.githubusercontent.com/39651860/148599784-3cbc2b7b-90c9-4062-ba12-96d7c9e43c7f.png)
![modal-unliked-light](https://user-images.githubusercontent.com/39651860/148599787-a781b62f-7570-4bf9-ab58-96b2406b3c3e.png)

If the user wishes to see their liked posts they can click on the "View likes" button. This changes the current view to show the users likes, and an empty-state screen if they haven't liked any posts yet.

![likes-empty-light](https://user-images.githubusercontent.com/39651860/148599893-98754255-fad9-4c60-a82a-e7206a6e3837.png)
![likes-light](https://user-images.githubusercontent.com/39651860/148599894-00a7d769-1916-45a8-9b93-acdb3e08e1a7.png)

### Notes

This was completed in less than 48 hours, for the purpose of Shopify's internship application.

Since this web app was created in React, hooks were used for all state management (which includes the toggle for dark mode)

The web app is deployed with GitHub Pages, as a subpage under my main [portfolio](https://www.dpmv.me/).


