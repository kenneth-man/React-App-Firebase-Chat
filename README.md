# React App Firebase Chat

React app to learn firebase with. Using Context, React Hooks, Firebase+Firestore CRUD, ES6+ Javascript, Functional components

![Alt text](./src/Res/Images/sampleScreenshot1.png?raw=true "SampleScreenshot1")
![Alt text](./src/Res/Images/sampleScreenshot2.png?raw=true "SampleScreenshot2")
![Alt text](./src/Res/Images/sampleScreenshot3.png?raw=true "SampleScreenshot3")
![Alt text](./src/Res/Images/sampleScreenshot4.png?raw=true "SampleScreenshot4") 

<br/>
<br/>

The main features of this app include: 'global chat', 'global feed' and 'private chat'. Users can sign up or register via their google credentials. 

-In global chat, users can send a message which is visible to all users; messages contain name, timestamp, message text; messages sent by the user are shown to the right whereas messages sent by other users are shown to the left. Users can delete their own messages, but not other user's messages. Messages are ordered by the time created; latest messages shown at the bottom

-In private chat, users have a two person conversation in the same format as in global chat; chat will only be visible to the two recipients.

-In global feed, users can create posts which show the likes, dislikes, post text, timestamp, name. Users cannot like/dislike their own post. Other users can either like/dislike a post once; if a post is like/disliked by a user already, likes/dislikes will be reset based on what they chose previously

<br/>
<br/>

NPM packages used: firebase, react-firebase-hooks, react-router-dom, react-lazy-load-image-component