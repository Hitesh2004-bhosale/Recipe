import { CronJob } from "cron";
import https from "https";

const job = new CronJob("14 * * * *", function () {
  console.log("Cron job executed at minute 14");

  // Example request to your backend or an API
  https.get("https://your-api-url.com/trigger-task", (res) => {
    console.log(`API responded with status code: ${res.statusCode}`);
  }).on("error", (err) => {
    console.error("Error calling API:", err.message);
  });
});

job.start();

export default job;
