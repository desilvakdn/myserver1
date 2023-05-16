const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));
const express = require("express");
const mysql = require("mysql2");
const rateLimit = require("express-rate-limit");
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
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

const limiter = rateLimit({
  windowMs: 100000, // 1 minute
  max: 280, // limit each user to 100 requests per windowMs
});

app.use("/reveal", limiter);
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
  fetch(
    "https://raw.githubusercontent.com/desilvakdn/notice/main/fiverrmate.json"
  )
    .then((el) => el.json())
    .then((data) => res.json({ data: data }));
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
            var username = data["response"]["user_nicename"];
            var userreg = data["response"]["user_registered"];

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
                  res.json({ response: "lobster", userreg: userreg });
                } else if (
                  f_name.toLowerCase() === req.params.fname &&
                  l_name.toLowerCase() === req.params.lfname &&
                  email.toLowerCase() === req.params.usermail &&
                  username.toLowerCase() === req.params.username &&
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
            var f_name = data["response"]["first_name"];
            var l_name = data["response"]["last_name"];
            var email = data["response"]["user_email"];
            var username = data["response"]["user_nicename"];
            var userreg = data["response"]["user_registered"];

            fetch(
              `https://syntaximos.com/?ihc_action=api-gate&ihch=klOxPZlK7Nw5XPMOlMgbhRNQ3gZp8dU1Ev&action=get_user_levels&uid=${user_id}`
            )
              .then((el432) => el432.json())
              .then((data743) => {
                var response_ = data743["response"];
                const firstKey = Object.keys(response_)[0];
                let plan__ = response_[firstKey]["level_id"];
                if (
                  f_name.toLowerCase() === req.params.fname &&
                  l_name.toLowerCase() === req.params.lfname &&
                  email.toLowerCase() === req.params.usermail &&
                  username.toLowerCase() === req.params.username &&
                  plan__ === "1"
                ) {
                  res.json({ response: "lobster", userreg: userreg });
                } else if (
                  f_name.toLowerCase() === req.params.fname &&
                  l_name.toLowerCase() === req.params.lfname &&
                  email.toLowerCase() === req.params.usermail &&
                  username.toLowerCase() === req.params.username &&
                  (plan__ === "4" || plan__ === "5")
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

app.get("/reveal/:usermail", async (req, res) => {
  if (req.rateLimit.remaining === 0) {
    res.json({ error: "ratelimit" });
  } else {
    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Create a new Google Sheets API client with the loaded credentials
    const sheets = google.sheets({ version: "v4", auth });

    try {
      // Load the values from the Google Sheet
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: "1ySFcbZ3VYqL64esOtoWfhpQwvxv50sLH3BOwsBA1xS0",
        range: "Sheet1!A:B", // Replace with your sheet name and range
      });

      // Search for the user email in the loaded values
      const values = response.data.values;
      const index = values.findIndex((row) => row[0] === req.params.usermail);

      // If the user email exists, return the corresponding quota value
      if (index !== -1) {
        const obj = JSON.parse(values[index][1]);
        res.json({ obj: obj });
      } else {
        await writeToGoogleSheet(req.params.usermail, {
          main_mate: 0,
          gig_mate: 0,
          mate_ai: 0,
          auto_gig: 0,
        });
        res.json({
          obj: {
            main_mate: 0,
            gig_mate: 0,
            mate_ai: 0,
            auto_gig: 0,
          },
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
