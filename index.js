const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));
const express = require("express");
const mysql1 = require("mysql");
const crypto = require("crypto");
const mysql = require("mysql2");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = {
  type: "service_account",
  project_id: "blissful-canto-383209",
  private_key_id: "6a05c00110c46a4ef108fc6e09d89edfb1cba6ab",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCay4g4JcvjUb6z\nS56jdvuEAev/A1sR0Milse3vEFY8SeBpG/WxDcO5d/cjHSpC+8PaV65lTjzQWyXb\nfce29tBJ5PMwOLmOih9zhxHuLzVO3c4nKRHVcTzZ3zs3UCrEuSMSKqrjpMDComxj\ngQOl9K18XZ5gvRnEaqUjbpcOMmf5Gphrg3UpJG/0U+b0Zlwy2NKftdXNScPcLt7O\n9DZLOEKNpkscq+eJ2fXWdjMjh9F/jyZQPEYYpCMVz4jmWhtTIxozJKl81WyG4QH7\nGb6Yqv4mr+Ik6CoA9mWD4UMJAqi62+/3KOwgo07lN1ptW0L9XP53KtfC6qIu7o/Z\njUefRM+tAgMBAAECggEABy8R89UhOLwG9yg3xQtVEePK8YtU0ydW4IW47qLZ9bNS\nBF7FUMG8RyO/pvQIDZLEnKH8GHyAiwTn5V9ZgO7EbOGAvcisJ+bWHdTzapPrS+00\nT5Hy326BbfUTuPXx/i4/Z+zuAGGZho7mK9oFctK/qGlp28B67Sgr4NCVlxWUyLU2\nQn9kz7LWlA4yKWuDa/1OzJBx5xFaV0jW42i4NiOyvmHdlNf+VG7Pn5GNLEYpXggj\n5XVnR5eRPE5uoIG1Ol7ytm/AHbPsioPEZo/Kz/WYay/t6YArY2XejD/Xd+77CWXp\nbcj4mHjKIz/LMg+CD9gw3vOkBGVPe8SHTxEzdiDokQKBgQDS/VfGNe33O/wzuY7r\nzPVzBzQvkRsC98aRepSTlU1a14FTLtEu9imGKwCVYBaiTjcd6cE8h/2cAos3DjiW\n3jgfgBZMxsbd3o8jJEuItYHK3WXHxlbJSYbYDNRA5tY+s4kAVgrGLsyTCB370IqC\nsAo6nnBrncw757lNBIjijtU6FQKBgQC70URG3ggc/B4cOI3jf7VvWJoE4c5C6/er\nXhYFCCiG04KcCoHzP7gBto4W0Cpi5fhL8AeUXC8bOSu/esJi/i7FOEGzaL6Iuo77\n+dh9XiO9V3wXTZnYnA8kPmoUtjBfZDVzCu02yIWAZR85VoRmS7PrhTCDoAUd7aa2\n5KEy/3ydOQKBgQCfBalJUE5aAFEW3y10VhdNKknP7CsSspNsBJrFHUufQzxK6Mdr\nAMfNQs3+x9xnWlI6bnthVxHzqwsoZMSMGVLtkwm7tjoe8Waq0ulHUZ5Qu0vCJaA1\nuAA1CH5VqGYj/gctRKx8MLupuf13VPeAhpQ/GDmdMuLC5+UGwns1Xvgg/QKBgQC0\nnCKaO3110gRqgv//G5ov/vXtZ+9fb2b1xj5KjHPcY50fzQL2Ffouu4yb54Y7IIbL\nD4Faa+NovGuTcMtpQqFbSiP0EO/Yr/471SEYPeUEeRJ9nkQphrkQ02xTinet48F6\nZbGDkwS+WX/TNZ2QeZAFFkl26fTBuP0ut2FEl2cQEQKBgHHY4Ss2lDMmaEk9+8ZR\nZzvXbbHX5YiP/EDvpG5W6eQalhwrQym+S9D6qySwXLU00Po4CrJlA31oI1iko7nm\nXOuZKym5FnHg0W86PnwzKzmfhMkFcVqMh2DNQR7SLVzI7x689KGk7nBOKiI9BJN3\nPBY/M/lgxTbZJV6Q0ix/x8d8\n-----END PRIVATE KEY-----\n",
  client_email: "fiverrmate@blissful-canto-383209.iam.gserviceaccount.com",
  client_id: "115188836877549196740",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/fiverrmate%40blissful-canto-383209.iam.gserviceaccount.com",
};
const doc = new GoogleSpreadsheet(
  "1ySFcbZ3VYqL64esOtoWfhpQwvxv50sLH3BOwsBA1xS0"
);
const { google } = require("googleapis");

const { Configuration, OpenAIApi } = require("openai");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

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

app.get(
  "/checkset/:useremail/:useregistered/:lastreset/:status",
  async (req, res) => {
    const email = req.params.useremail;

    const pool = mysql
      .createPool({
        host: "89.117.9.154",
        user: "u327402158_admin",
        password: "Dinuka@1999",
        database: "u327402158_user",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      })
      .promise();

    try {
      // check if user exists in database
      const [rows] = await pool.query(
        "SELECT * FROM `userdetails` WHERE `user_email` = ?",
        [email]
      );

      if (rows.length > 0) {
        // user exists, return entire row
        res.json({ data: rows[0] });
      } else {
        const [result] = await pool.query(
          "INSERT INTO `userdetails`(`user_email`, `user_registered`, `user_last_reset`, `status`) VALUES (?, ?, ?,?)",
          [
            email,
            req.params.useregistered,
            req.params.lastreset,
            req.params.status,
          ]
        );

        // return the inserted row
        const [insertedRow] = await pool.query(
          "SELECT * FROM `userdetails` WHERE id = ?",
          [result.insertId]
        );
        res.json({ data: insertedRow[0] });
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);

app.get("/getf", async (req, res) => {
  try {
    fetch(
      "https://raw.githubusercontent.com/desilvakdn/notice/main/fiverrmate.json"
    )
      .then((el) => el.json())
      .then((data) => res.json({ data: data }));
  } catch (error) {
    res.json({ data: "" });
  }
});

app.get("/sugge/:fname/:lname/:email/:suggestion", async (req, res) => {
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
});

app.get("/getnotice", async (req, res) => {
  fetch("https://raw.githubusercontent.com/desilvakdn/notice/main/notice.txt")
    .then((el) => el.text())
    .then(async (data) => {
      const secret = data.split("|");
      const s = secret[0].trim();

      const message = secret[1].trim();
      const pool = mysql
        .createPool({
          host: "89.117.9.154",
          user: "u327402158_admin",
          password: "Dinuka@1999",
          database: "u327402158_user",
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        })
        .promise();
      try {
        // Execute the SELECT query to check if the message is available in the first row of the table
        const [rows] = await pool.query(
          "SELECT message FROM `notice` WHERE id = 1"
        );

        // If the message is available in the first row, return it to the user
        if (rows.length > 0 && rows[0].message === message) {
          res.json({ message: "old" });
        } else {
          const [result] = await pool.query(
            "UPDATE `notice` SET message = ? WHERE id = 1",
            [message]
          );

          res.json({ message: s });
        }
      } catch (err) {
        res.json({ error: err });
      }
    });
});

app.get("/api/:hash", async (req, res) => {
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
});

app.get("/checkupdate/:useremail/:resetdate/:status", async (req, res) => {
  const email = req.params.useremail;

  const pool = mysql
    .createPool({
      host: "89.117.9.154",
      user: "u327402158_admin",
      password: "Dinuka@1999",
      database: "u327402158_user",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })
    .promise();

  try {
    // check if user exists in database
    const [rows] = await pool.query(
      "SELECT * FROM `userdetails` WHERE `user_email` = ?",
      [email]
    );

    if (rows.length === 0) {
      res.json({});
    }

    if (rows.length > 0) {
      const id = rows[0].id;
      const [updateResult] = await pool.query(
        "UPDATE `userdetails` SET `user_last_reset` = ?, `status` = ? WHERE id = ?",
        [req.params.resetdate, req.params.status, id]
      );
      if (updateResult.affectedRows === 0) {
        return {};
      }
      const [updatedRows] = await pool.query(
        "SELECT * FROM `userdetails` WHERE id = ?",
        [id]
      );
      res.json({ data: updatedRows[0] });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/getnoti", (req, res) => {
  fetch("https://raw.githubusercontent.com/desilvakdn/notice/main/notice.txt")
    .then((el) => el.text())
    .then((data) => {
      const l = data.split("|");
      const s = new Date(l[1].trim());
      res.json({ noti: l[0].trim, datemodi: s });
    });
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
            var username = data["response"]["user_login"];
            var userreg = data["response"]["user_registered"];

            fetch(
              `https://syntaximos.com/?ihc_action=api-gate&ihch=klOxPZlK7Nw5XPMOlMgbhRNQ3gZp8dU1Ev&action=verify_user_level&uid=${user_id}&lid=${req.params.plan}`
            )
              .then((el432) => el432.json())
              .then((data743) => {
                var response_ = String(data743["response"]);

                let a = req.params.fname;
                let b = req.params.lfname;
                let c = req.params.usermail;
                let d = req.params.username;
                if (
                  f_name.toLowerCase() === a.toLowerCase() &&
                  l_name.toLowerCase() === b.toLowerCase() &&
                  email.toLowerCase() === c.toLowerCase() &&
                  username.toLowerCase() === d.toLowerCase() &&
                  response_ === "1" &&
                  req.params.plan === "1"
                ) {
                  res.json({ response: "lobster", userreg: userreg });
                } else if (
                  f_name.toLowerCase() === a.toLowerCase() &&
                  l_name.toLowerCase() === b.toLowerCase() &&
                  email.toLowerCase() === c.toLowerCase() &&
                  username.toLowerCase() === d.toLowerCase() &&
                  response_ === "1" &&
                  req.params.plan != "1"
                ) {
                  res.json({ response: "lion", userreg: userreg });
                } else {
                  res.json({ response: "lam", userreg: userreg });
                }
              });
          });
      } else {
        res.json({ response: "usernotfound", userreg: "" });
      }
    })
    .catch((error) => res.json({ response: "usernotfound", userreg: "" }));
});

app.get("/announcements", (req, res) => {
  fetch("https://raw.githubusercontent.com/desilvakdn/notice/main/news.json")
    .then((el) => el.json())
    .then((data) => {
      res.json(data);
    });
});

app.get("/titlesai/:words/:api", async (req, res) => {
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
});

app.post("/desai", async (req, res) => {
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
});

app.get("/target/:fname/:lfname/:usermail/:username/:plan", (req, res) => {
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
                  full_name1.toLowerCase() &&
                  full_name.toLowerCase() &&
                  email.toLowerCase() === c.toLowerCase() &&
                  username.toLowerCase() &&
                  d.toLowerCase() &&
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
                  full_name1.toLowerCase() &&
                  full_name.toLowerCase() &&
                  email.toLowerCase() === c.toLowerCase() &&
                  username.toLowerCase() &&
                  d.toLowerCase() &&
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
});

app.post("/openai/ask", async (req, res) => {
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
});

async function writeToGoogleSheet(userEmail, quota) {
  async function accessSpreadsheet() {
    await doc.useServiceAccountAuth({
      client_email: creds.client_email,
      private_key: creds.private_key,
    });

    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]; // assumes data will be written to the first sheet

    await sheet.addRow({ User: userEmail, Quota: JSON.stringify(quota) });
    console.log(`Data written to sheet successfully!`);
  }

  accessSpreadsheet().catch(console.error);
}

app.get("/chklogin/:usermail/:loginstatus", async (req, res) => {
  let email = req.params.usermail;

  const connection = mysql1.createConnection({
    host: "89.117.9.154",
    user: "u327402158_admin",
    password: "Dinuka@1869434",
    database: "u327402158_user",
  });

  connection.on("error", function (err) {
    if (err.code === "ECONNRESET") {
      res.json({ error: err });
    } else {
      res.json({ error: err });
    }
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: " + err.stack);
      return;
    }
    console.log("Connected to the database");

    connection.query(
      `SELECT * FROM loginstatus WHERE useremail=?`,
      [email],
      (err, results, fields) => {
        if (err) {
          console.error("Error querying the database: " + err.stack);

          res.json({ error: true });
          return endConnection();
        }

        if (results && results.length > 0) {
          if (
            req.params.loginstatus === "1" ||
            req.params.loginstatus === "0"
          ) {
            let loginstatus = parseInt(req.params.loginstatus);
            connection.query(
              "UPDATE loginstatus SET loginstatus = ? WHERE useremail = ?",
              [loginstatus, email],
              (err, results, fields) => {
                if (err) {
                  console.error("Error updating login status: " + err.stack);

                  res.json({ error: true });
                  return endConnection();
                }

                res.json({ loginstatus: parseInt(req.params.loginstatus) });
                endConnection();
              }
            );
          } else {
            res.json({ loginstatus: results[0].loginstatus });
            endConnection();
          }
        } else {
          const newRow = { useremail: email };
          connection.query(
            "INSERT INTO loginstatus SET ?",
            [newRow],
            (err, results, fields) => {
              if (err) {
                console.error("Error inserting new row: " + err.stack);

                res.json({ error: true });
                return endConnection();
              }
              let loginstatus = parseInt(req.params.loginstatus);
              if (req.params.loginstatus === "1") {
                connection.query(
                  "UPDATE loginstatus SET loginstatus = ? WHERE useremail = ?",
                  [loginstatus, email],
                  (err, results, fields) => {
                    if (err) {
                      console.error(
                        "Error updating login status: " + err.stack
                      );

                      res.json({ error: true });
                      return endConnection();
                    }

                    res.json({ loginstatus: 1 });
                    endConnection();
                  }
                );
              } else {
                res.json({ loginstatus: 0 });
                endConnection();
              }
            }
          );
        }
      }
    );
  });

  function endConnection() {
    connection.end((err) => {
      if (err) {
        console.error("Error ending MySQL connection:", err);
      } else {
        console.log("MySQL connection ended successfully.");
      }
    });
  }
});

app.get("/chkvalid/:hash", async (req, res) => {
  let response = checkhash(req.params.hash);
  res.json({ valid: response });
});

function checkhash(hash) {
  const SECRET_KEY =
    "~!h0K/mUiX~|(p8`A2]54|@zY/7<NP)3sQE+|-7n3$92R-|K71kx%C=0M%@+kz5;r0U5_U;kM62TDQsF+f4v*37c0sbnIg3EIm~?9sm0`JDT;9[o_LIrdxqp*`H4b(Tn0@]x*FPzH117eH-@d[o52LYVHk&qaJgW16acPs{}1M=0M{?kr9xB4v'o*6s#}v*>9x6(PJ$";
  const [receivedHash, tokenValidityPeriod] = hash.split(":");
  const currentTime = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
  const data = `${SECRET_KEY}:${tokenValidityPeriod}`;

  const generatedHash = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(data)
    .digest("hex");

  if (receivedHash !== generatedHash) {
    // Hash mismatch
    return false;
  }

  const receivedTokenValidityPeriod = parseInt(tokenValidityPeriod, 10);
  if (isNaN(receivedTokenValidityPeriod)) {
    // Invalid token validity period
    return false;
  }

  if (receivedTokenValidityPeriod < currentTime) {
    // Token has expired
    return false;
  }

  return true;
}

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
