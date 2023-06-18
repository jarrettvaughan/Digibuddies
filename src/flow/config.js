import * as fcl from "@onflow/fcl";
import { init } from "@onflow/fcl-wc"

fcl.config({
  "app.detail.title": process.env.REACT_APP_DETAIL_TITLE || "Digibuddies", // this adds a custom name to our wallet
  'flow.network': "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org", // this is for the local emulator
  "app.detail.icon": window.location.origin + "/Logo.svg",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // this is for the local dev wallet
  "discovery.authn.endpoint":
    "https://fcl-discovery.onflow.org/api/testnet/authn",
  "discovery.authn.include": ["0x82ec283f88a62e65"],
});


