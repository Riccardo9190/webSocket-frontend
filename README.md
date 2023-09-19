# WebSocket Front-End

Real-time web chat app powered by [Socket.io](https://socket.io/). 

### Technologies Used:

- React
- [Vite](https://vitejs.dev/)
- [Socket.io](https://socket.io/)

### To Run Locally (Needs the download of [WebSocket Back-End](https://github.com/Riccardo9190/webSocket-backend))

- Clone this repository with ```git clone https://github.com/Riccardo9190/webSocket-frontend.git```

- Access the app folder with ```cd webSocket-frontend```

- Install all dependencies with ```npm install```

- Set the environment variable to connect with [WebSocket Back-End](https://github.com/Riccardo9190/webSocket-backend):
```shell
echo "VITE_API_URL=http://localhost:3000" > .env
```

- Run the app with ```npm run dev``` and open the URL ```localhost:5173```

<hr/>

### How it Works?

In this web chat application, multiple users can engage concurrently in multiple topic rooms in real-time using WebSocket. For this example, we will use two users:

<img src="https://github.com/Riccardo9190/webSocket-frontend/blob/master/public/home.png"/>

After creating a user, we are directed to the topics page. It will initially be empty, as there are no topics upon first use. However, next time, the topics will persist even if you close the app. In this example, we will create a unique topic, specifically to discuss NodeJs:

<img src="https://github.com/Riccardo9190/webSocket-frontend/blob/master/public/topics1.png"/>

After clicking the 'Criar' button, our first topic room appears in the topics list:

<img src="https://github.com/Riccardo9190/webSocket-frontend/blob/master/public/topics2.png"/>

In the topic room, we can engage in real-time chat with other users. We can also view the timestamps of their messages and when they join the topic discussion:

<img src="https://github.com/Riccardo9190/webSocket-frontend/blob/master/public/chat1.png"/>

We can also observe when a user has left the topic discussion:

<img src="https://github.com/Riccardo9190/webSocket-frontend/blob/master/public/chat2.png"/>
