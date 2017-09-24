const app = new Vue({
  el: "#app",
  data: {
    ledStatus: "",
    isActive: false
  },
  created: function() {
    socket.on('led status', (state) => {
      this.isActive = this.ledStatus === "on" ? true : false;
    });
  },
  methods: {
      getBuild : function() {
          axios.get("/led")
          .then((res) => {
              this.ledStatus = res.data.ledState; 
              this.isActive = res.data.ledState === "on" ? true : false; 
          })
          .catch((err) => {
              this.ledStatus = 'Error fetching LED status';
            });
      },
      ledStatusIO : function() {
        if (this.ledStatus === 'on') {
          this.ledStatus = 'off';
          this.isActive = false;
        } else {
          this.ledStatus = 'on';
          this.isActive = true;
        }

        socket.emit('toggle LED', this.ledStatus);
        
      }
  }
});
