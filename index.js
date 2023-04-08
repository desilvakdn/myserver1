const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.get("/checkuser/:fname/:lfname/:usermail/:username", (req, res) => {
  fetch(
    "https://raw.githubusercontent.com/desilvakdn/cjdcdcj4tgt55t53vr3f3fev/main/dejdejde.json"
  )
    .then((res12) => res12.json())
    .then((data7382) => {
      const api_ = data7382["random"];
      fetch(
        `https://syntaximos.com/?ihc_action=api-gate&ihch=${api_}&action=search_users&term_name=user_email&term_value=${req.params.usermail}`
      )
        .then((res23) => res23.json())
        .then((data) => {
          try {
            const data1 = data["response"][0]["ID"];
            fetch(
              `https://syntaximos.com/?ihc_action=api-gate&ihch=${api_}&action=search_users&term_name=user_login&term_value=${req.params.username}`
            )
              .then((res0) => res0.json())
              .then((data0) => {
                var data12 = "";
                try {
                  data12 = data0["response"][0]["ID"];
                } catch (error) {
                  res.json({ subscription: "usernotfound" });
                }

                if (data1 === data12) {
                  fetch(
                    `https://syntaximos.com/?ihc_action=api-gate&ihch=${api_}&action=get_user_levels&uid=${data1}`
                  )
                    .then((res1) => res1.json())
                    .then((data1) => {
                      var b = "";
                      try {
                        b = data1["response"]["3"]["level_id"];
                      } catch (error) {
                        try {
                          b = data1["response"]["2"]["level_id"];
                        } catch (error) {
                          b = "";
                        }
                      }

                      if (b === "3") {
                        res.json({ subscription: "premiumlifetime" });
                      } else if (b === "2") {
                        res.json({ subscription: "premiummonthly" });
                      } else {
                        res.json({ subscription: "free" });
                      }
                    });
                }
              });
          } catch (error) {
            res.json({ subscription: "usernotfound" });
          }
        })
        .catch((error) => res.json({ subscription: "usernotfound" }));
    })
    .catch((error) => res.json({ subscription: "usernotfound" }));
});

app.get("/verify/:fname/:lfname/:usermail/:username/:plan", (req, res) => {
  fetch(
    `https://syntaximos.com/?ihc_action=api-gate&ihch=klOxPZlK7Nw5XPMOlMgbhRNQ3gZp8dU1Ev&action=search_users&term_name=user_email&term_value=${req.params.usermail}`
  )
    .then((el) => el.json())
    .then((data) => {
      if (data["response"] !== []) {
        var user_id = data["response"][0]["ID"];
        fetch(
          `https://syntaximos.com/?ihc_action=api-gate&ihch=klOxPZlK7Nw5XPMOlMgbhRNQ3gZp8dU1Ev&action=user_get_details&uid=${user_id}`
        )
          .then((el) => el.json())
          .then((data) => {
            var f_name = data["response"]["first_name"];
            var l_name = data["response"]["last_name"];
            var email = data["response"]["user_email"];
            var username = data["response"]["user_nicename"];

            fetch(
              `https://syntaximos.com/?ihc_action=api-gate&ihch=klOxPZlK7Nw5XPMOlMgbhRNQ3gZp8dU1Ev&action=verify_user_level&uid=${user_id}&lid=${req.params.plan}`
            )
              .then((el432) => el432.json())
              .then((data743) => {
                var response_ = String(data743["response"]);
                if (
                  f_name.toLowerCase() === req.params.fname &&
                  l_name.toLowerCase() === req.params.lfname &&
                  email.toLowerCase() === req.params.usermail &&
                  username.toLowerCase() === req.params.username &&
                  response_ === "1" &&
                  req.params.plan === "1"
                ) {
                  res.json({ response: "lobster" });
                } else if (
                  f_name.toLowerCase() === req.params.fname &&
                  l_name.toLowerCase() === req.params.lfname &&
                  email.toLowerCase() === req.params.usermail &&
                  username.toLowerCase() === req.params.username &&
                  response_ === "1" &&
                  req.params.plan != "1"
                ) {
                  res.json({ response: "lion" });
                } else {
                  res.json({ response: "lam" });
                }
              });
          });
      } else {
        res.json({ response: "usernotfound" });
      }
    })
    .catch((error) => res.json({ response: "usernotfound" }));
});

app.post("/openai/ask", async (req, res) => {
  const { command, text, api_key } = req.body;

  const configuration = new Configuration({
    apiKey: api_key,
  });
  const openai = new OpenAIApi(configuration);

  const requestParams = {
    model: "text-davinci-003",
    prompt: `${command}:${text}`,
    temperature: 0,
    max_tokens: 2048,
  };

  // Send the request to the OpenAI API and return the generated text
  const response = await openai.createCompletion(requestParams);
  res.status(200).json({
    message: "Data processed successfully.",
    question: command,
    body: text,
    answer: response.data.choices[0].text.trim(),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
