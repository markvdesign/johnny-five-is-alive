const app = new Vue({
  el: "#app",
  data: {
    projectName: [
      {
        url:
          "https://teamcity.siama.com.au/app/rest/builds/buildType:(id:Works_CI)/status",
        name: "Works CI",
        failed: false
      },
      {
        url:
          "https://teamcity.siama.com.au/app/rest/builds/buildType:(id:Works_CI)/status",
        name: "Works CI",
        failed: false
      }
    ],
    ledStatus: ""
  },
  methods: {
      getBuild : function() {
          axios.get("/led")
          .then((res) => {
              this.ledStatus = res.data.ledState;
          })
          .catch((err) => {
              this.ledStatus = 'Error fetching LED status';
            });
      },
      ledStatusIO : function() {
        if (this.ledStatus === 'on') {
          this.ledStatus = 'off';
        } else {
          this.ledStatus = 'on';
        }

        socket.emit('toggle LED', this.ledStatus);
        
      }
  }
});
