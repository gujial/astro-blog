const clientWellKnown = {
	"m.homeserver": {
		base_url: "https://matrix.gujial.cc",
	},
	"org.matrix.msc2965.authentication": {
		issuer: "https://matrix.gujial.cc/auth/",
		account: "https://matrix.gujial.cc/auth/account/",
	},
	"org.matrix.msc4143.rtc_foci": [
		{
			type: "livekit",
			livekit_service_url: "https://matrix.gujial.cc/livekit/jwt",
		},
	],
};

export function GET() {
	return new Response(JSON.stringify(clientWellKnown), {
		headers: {
			"content-type": "application/json; charset=utf-8",
			"access-control-allow-origin": "*",
		},
	});
}