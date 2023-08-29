const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));
const express = require("express");
const { google } = require("googleapis");

const { Configuration, OpenAIApi } = require("openai");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.get("/getf", async (req, res) => {
  try {
    fetch(
      "https://raw.githubusercontent.com/desilvakdn/notice/main/fiverrmate.json"
    )
      .then((el) => el.json())
      .then((data) => res.json({ data: data }))
      .catch((error) => {
        res.json({
          data: {
            quick_: [
              "dashboard_",
              "profile_",
              "subscription_",
              "contact_",
              "logout_",
            ],
            url_set: [
              "https://syntaximos.com/my-account/?ihc_ap_menu=overview",
              "https://syntaximos.com/my-account/?ihc_ap_menu=profile",
              "https://syntaximos.com/my-account/?ihc_ap_menu=subscription",
              "https://syntaximos.com/contact-us/",
              "https://syntaximos.com/my-account/?ihcdologout=1",
            ],
          },
        });
      });
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/sugge/:fname/:lname/:email/:suggestion", async (req, res) => {
  try {
    const key = require("./service.json"); // Replace with your service account JSON file
    const spreadsheetId = "11TpquhxsbLUFNXXeOGk2Jwjrmfn_ff8A9_tYD6-0Zts"; // Replace with the ID of your Google Sheet
    const sheetName = "Sheet1"; // Replace with the name of your sheet
    const columns = ["First Name", "Last Name", "Email", "Suggestion"]; // Define the column names
    const firstName = req.params.fname;
    const lastName = req.params.lname;
    const email = req.params.email;
    const suggestion = req.params.suggestion;

    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    // Get the last row number of the sheet
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:A`,
      majorDimension: "COLUMNS",
    });
    const lastRow = result.data.values[0].length + 1;

    // Create a new row with the provided data
    const values = [[firstName, lastName, email, suggestion]];
    const range = `${sheetName}!A${lastRow}:${String.fromCharCode(
      64 + columns.length
    )}${lastRow}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });
    res.json({ response: `Data appended to ${sheetName}!${range}` });
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/api/:hash", async (req, res) => {
  try {
    fetch("https://raw.githubusercontent.com/desilvakdn/notice/main/hash.json")
      .then((dl) => dl.json())
      .then((data) => {
        let u = data.data;

        if (u.includes(req.params.hash)) {
          res.json({ val: true });
        } else {
          res.json({ val: false });
        }
      });
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/announcements", (req, res) => {
  try {
    fetch("https://raw.githubusercontent.com/desilvakdn/notice/main/news.json")
      .then((el) => el.json())
      .then((data) => {
        res.json(data);
      });
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/titlesai/:words/:api", async (req, res) => {
  try {
    const openAi = new OpenAIApi(
      new Configuration({
        apiKey: req.params.api,
      })
    );

    let word_ = req.params.words;
    const command = `match the words and generate 5 most appropriate titles that starts with "I will". Title should include most of the words. Please don't use your own words.  Title character length should be no more than 65. Word List: [${word_}] `;

    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: command }],
    });

    let response0 = response.data.choices[0].message.content.split("\n");

    const removeBeforeIWill = response0.map((str) => {
      const startIndex = str.indexOf("I will");
      if (startIndex !== -1) {
        return str.slice(startIndex);
      }
      return str;
    });
    res.json({ resp: removeBeforeIWill });
  } catch (error) {
    res.status(500).send();
  }
});

app.post("/desai", async (req, res) => {
  try {
    const { words, inspired, api_key } = req.body;

    const openAi = new OpenAIApi(
      new Configuration({
        apiKey: api_key,
      })
    );

    const command = `Analyze the following fiverr gig description and style of writing. Then create new gig description with well written structure and include  all of the following keywords naturally in the gig description. Don't include unnecessary contents. Make it little shorter.
  
  Keywords to be included:
  
  ${words}
  
  logo design, business logo, minimalist logo, custom logo, minimalist, unique, minimal, luxury, modern
  
  Sample Gig Description:
  
  ${inspired}
  `;

    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: command }],
    });

    let response0 = response.data.choices[0].message.content;

    res.json({ resp: response0 });
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/target/:fname/:lfname/:usermail/:username/:plan", (req, res) => {
  try {
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
              var f_name = arrangephrase(data["response"]["first_name"]);
              var l_name = arrangephrase(data["response"]["last_name"]);
              let full_name1 = arrangephrase(`${f_name} ${l_name}`.trim());
              var email = arrangephrase(data["response"]["user_email"]);
              var username = arrangephrase(data["response"]["user_login"]);
              var userreg = data["response"]["user_registered"];

              fetch(
                `https://syntaximos.com/?ihc_action=api-gate&ihch=klOxPZlK7Nw5XPMOlMgbhRNQ3gZp8dU1Ev&action=get_user_levels&uid=${user_id}`
              )
                .then((el432) => el432.json())
                .then((data743) => {
                  var response_ = data743["response"];
                  const firstKey = Object.keys(response_);
                  //let plan__ = response_[firstKey]["level_id"];

                  let a = arrangephrase(req.params.fname);
                  let b = arrangephrase(req.params.lfname);
                  let full_name = arrangephrase(`${a} ${b}`.trim());
                  if (b === "*") {
                    full_name = a;
                  }

                  let c = arrangephrase(req.params.usermail);
                  let d = arrangephrase(req.params.username);

                  //full_name1.toLowerCase() === full_name.toLowerCase() &&

                  if (
                    full_name1.toLowerCase() === full_name.toLowerCase() &&
                    email.toLowerCase() === c.toLowerCase() &&
                    username.toLowerCase() === d.toLowerCase() &&
                    (firstKey.includes("4") ||
                      firstKey.includes("5") ||
                      firstKey.includes("6") ||
                      firstKey.includes("7"))
                  ) {
                    if (firstKey.includes("4")) {
                      let expired = data743["response"]["4"].is_expired;
                      if (!expired) {
                        let expiretime = data743["response"]["4"].expire_time;

                        res.json({
                          response: "lion",
                          userreg: userreg,
                          end: expiretime,
                        });
                      } else {
                        res.json({
                          response: "lobster",
                          userreg: userreg,
                          end: false,
                        });
                      }
                    } else if (firstKey.includes("6")) {
                      let expired = data743["response"]["6"].is_expired;
                      if (!expired) {
                        let expiretime = data743["response"]["6"].expire_time;

                        res.json({
                          response: "lion",
                          userreg: userreg,
                          end: expiretime,
                        });
                      } else {
                        res.json({
                          response: "lobster",
                          userreg: userreg,
                          end: false,
                        });
                      }
                    } else if (firstKey.includes("7")) {
                      let expired = data743["response"]["7"].is_expired;
                      if (!expired) {
                        let expiretime = data743["response"]["7"].expire_time;

                        res.json({
                          response: "lion",
                          userreg: userreg,
                          end: expiretime,
                        });
                      } else {
                        res.json({
                          response: "lobster",
                          userreg: userreg,
                          end: false,
                        });
                      }
                    } else {
                      res.json({
                        response: "lion",
                        userreg: userreg,
                        end: false,
                      });
                    }
                  } else if (
                    full_name1.toLowerCase() === full_name.toLowerCase() &&
                    email.toLowerCase() === c.toLowerCase() &&
                    username.toLowerCase() === d.toLowerCase() &&
                    firstKey.includes("1")
                  ) {
                    res.json({
                      response: "lobster",
                      userreg: userreg,
                      end: false,
                    });
                  } else {
                    res.json({ response: "lam", userreg: userreg, end: false });
                  }
                });
            });
        } else {
          res.json({ response: "usernotfound", userreg: "" });
        }
      })
      .catch((error) => res.json({ response: "usernotfound", userreg: "" }));
  } catch (error) {
    res.status(500).send();
  }
});

app.post("/openai/ask", async (req, res) => {
  try {
    const { command, text, api_key, model, temperature, max_tokens } = req.body;

    const configuration = new Configuration({
      apiKey: api_key,
    });
    const openai = new OpenAIApi(configuration);

    const requestParams = {
      model: model,
      prompt: `${command}:${text}`,
      temperature: parseInt(temperature),
      max_tokens: parseInt(max_tokens),
    };

    // Send the request to the OpenAI API and return the generated text

    openai
      .createCompletion(requestParams)
      .then((resp_) => {
        if (resp_.status === 200) {
          res.json({
            status: resp_.status,
            message: "Data processed successfully.",
            question: command,
            body: text,
            answer: resp_.data.choices[0].text.trim(),
          });
        } else {
          res.json({
            status: resp_.status,
            message: "Not Good",
            question: command,
            body: text,
            answer: resp_.status,
          });
        }
      })
      .catch((err) => {
        res.json({
          message: "Something Went Wrong",
          question: command,
          body: text,
          answer: err,
        });
      });
  } catch (error) {
    res.status(500).send();
  }
});

function arrangephrase(str) {
  // Remove empty spaces
  const stringWithoutSpaces = str.replace(/\s+/g, "");

  // Remove leading and trailing spaces
  const trimmedString = stringWithoutSpaces.trim();

  // Convert to lowercase
  const lowercaseString = trimmedString.toLowerCase();

  return lowercaseString;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
