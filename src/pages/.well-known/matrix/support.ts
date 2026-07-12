const supportWellKnown = {
	contacts: [
		{
			matrix_id: "@gujial:gujial.cc",
			role: "m.role.admin",
            email_address: "gujial@gujial.cc"
		},
	],
	support_page: "https://matrix.to/#/@gujial:gujial.cc",
};

export function GET() {
	return new Response(JSON.stringify(supportWellKnown), {
		headers: {
			"content-type": "application/json; charset=utf-8",
			"access-control-allow-origin": "*",
		},
	});
}