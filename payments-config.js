/* CARVE Plus display defaults. Live price/mode come from /api/dodo/config.
   Copy dodo-secrets.example.json → dodo-secrets.json and paste:
     api_key          Dashboard → Developer → API Keys
     webhook_secret   Dashboard → Developer → Webhooks
     product_id       Dashboard → Products (monthly subscription)
     mode             "test" or "live"
*/
window.CARVE_PLUS_PRICE_LABEL = "₹1500";
window.CARVE_PLUS_PRICE_INTERVAL = "/mo";
window.CARVE_API_ORIGIN = "";
