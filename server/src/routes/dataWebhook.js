export function dataWebhookHandler() {
  return async (req, res) => {
    console.log("Data webhook received:", req.body);
    res.status(200).send("Data webhook received");
  };
}
