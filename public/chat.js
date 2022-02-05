const socket = io();

new Vue({
    el: '#app',
    data: {
        step: 'nombre',
        nombre: null,
        mensaje: null,
        fecha: null,
        messages: []
    },
    methods: {
        getChats() {
            fetch("http://localhost:3000/Msgs/")
                .then((res) => res.json())
                .then((dataResponse) =>       
                {
                    console.log(dataResponse);
                    this.messages = dataResponse;
                    this.messages.forEach((element) => {
                        element.fecha = new Date(element.fecha).toDateString();
                    });
                })
        },
        send() {
            socket.emit('chat-message', {
                nombre: this.nombre,
                mensaje: this.mensaje,
                fecha: new Date(Date.now())
            });

            this.mensaje = null;
        },
        signIn() {
            if (!this.nombre) {
                return;
            }
            this.getChats();
            this.step = 'chat';
        }
    },
    mounted() {
        socket.on('chat-message', (msg) => {            
            msg.fecha = new Date(msg.fecha).toDateString();
            this.messages.push(msg);
            setTimeout(() => {
                // boton
                const chatContainer = document.querySelector(".chat-container");
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 10);
        });
    }
});