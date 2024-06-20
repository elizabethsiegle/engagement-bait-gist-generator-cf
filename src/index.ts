import { Hono } from  "hono"
type Env = {
	AI : Ai
}

const app = new Hono<{ Bindings: Env}>();

function createGist(title, code, fileName) {

}

app.post('/bait', async (c) => {
	//const payload = await c.req.json();
	const answer = await c.env.AI.run(
		'@hf/nousresearch/hermes-2-pro-mistral-7b',
		{
			messages: [{role: "system", content: "You are a software engineer social media influencer known for writing bad code in order to get more comments and increase engagement"}, { role: "user", content: "Create ternary example in JavaScript" }],
			tools: [
			  {
				name: "createGist",
				description: "Create a GitHub Gist in a specific programming language",
				parameters: {
				  type: "object",
				  properties: {
					title: {
					  type: "string",
					  description: "The title of the Gist",
					},
					code: {
					  type: "string",
					  description: "The code for the Gist",
					},
					fileName: {
						type: "string",
						description: "The file name of the Gist"
					}
				  },
				  required: ["title", "code", "fileName"],
				},
			  },
			],
		});
	  console.log(`answer ${answer}`);
	  return c.json(answer);

})  


export default app;