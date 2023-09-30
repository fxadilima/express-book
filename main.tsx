/** @jsxImportSource https://esm.sh/preact */
import express from "npm:express@4.18.2";
import render from "https://esm.sh/preact-render-to-string@6.2.1";
import runtime from "https://esm.sh/preact/jsx-runtime";

function Card(props) {
    return (
    <div class="w3-container w3-card w3-round">
    <h1>{props.title}</h1>
    <p>{props.message}</p>
    </div>
    );
}

function Home(props) {
    return (
        <html lang="en">
        <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>{props.title}</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        <link rel="icon" type="image/svg+xml" href="/book.svg"/>
        </head>
        <body>
            <div class="w3-content w3-padding-64" style="width:50%;">
                <Card title={props.title} message={props.message}/>
                <div class="w3-display-container w3-hover-opacity w3-padding-16">
                    <div class="w3-container w3-border w3-animate-top w3-round-large" id="hello"></div>
                </div>
                <div class="w3-bar-block">
                    <p><a class="w3-bar-item w3-btn w3-hover-red" href="/sub/test1">Go to test1</a></p>
                    <p><button class="w3-btn w3-bar-item" type="button" id="btnTest" onClick={() => {
                        document.getElementById("hello")?.innerHTML = "SUCCEEDED...!";
                    }}>Test Event</button></p>
                    <p><button class="w3-btn w3-bar-item" type="button" id="btnErase">Clear</button></p>
                </div>
            </div>
            <script src="/modules/test1.js" type="module"></script>
        </body>
        </html>
    );
}

const app = express();
const router = express.Router();
app.use(express.static("public"));

router.get("/", (req: Request, res: Response) => {
    console.log(`Referrer: ${req.referrer}`);
    const html = `<!DOCTYPE html>${render(<Home title="Hello" message="This is a test from Deno."/>)}`;
    res.send(html);
})
.get("/sub/test1", async (req: Request, res: Response) => {
    const d = await Deno.readTextFile(Deno.cwd() + "/public/modules/test1.js");
    res.type("text/html");
    res.send(`<p>Isi test1.js:<br/>${d}</p>`);
});

app.use(router);

console.log("Listening to PORT 3000");
app.listen(3000);
