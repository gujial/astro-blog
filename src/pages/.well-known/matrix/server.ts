const serverWellKnown = {
	"m.server": "matrix.gujial.cc:443",
};

export function GET() {
	return new Response(JSON.stringify(serverWellKnown), {
		headers: {
			"content-type": "application/json; charset=utf-8",
			"access-control-allow-origin": "*",
		},
	});
}