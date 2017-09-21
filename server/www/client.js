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
    buildStatus: ""
  },
  methods: {
      getBuild : function() {
          axios.get("/led")
          .then((res) => {
              console.log(res.data);
              this.buildStatus = res.data.ledState;
          })
          .catch((err) => {
              console.log(err);
              this.buildStatus = 'Error fetching build';
            });
      }
  }
});
