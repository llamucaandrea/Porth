const socket = io();

new Vue({
    el: '#app',
    data: {
        step: 'nombre',
        nombre: null,
        message: null,
        messages: []
    },
    methods: {
        send() {
            socket.emit('chat-message', {
                nombre: this.nombre,
                message: this.message,
                date: new Date().getTime()
            });

            this.message = null;
        },
        signIn() {
            if (!this.nombre) {
                return;
            }

            this.step = 'chat';
        }
    },
    mounted() {
        socket.on('chat-message', (msg) => {
            this.messages.push(msg);

            setTimeout(() => {
                // boton
                const chatContainer = document.querySelector(".chat-container");
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 10);
        });
    }
});