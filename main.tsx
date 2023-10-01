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
        <link rel="icon" type="image/png" href="/book.png"/>
        </head>
        <body>
            <div class="w3-content w3-padding-64" style="width:50%;">
                <Card title={props.title} message={props.message}/>
                <div class="w3-display-container w3-hover-opacity w3-padding-16">
                    <div class="w3-container w3-border w3-animate-top w3-round-large" id="hello"></div>
                </div>
                <div class="w3-bar-block">
                    <p><a class="w3-bar-item w3-btn w3-hover-red" href="/sub/test1">Go to test1</a></p>
                    <p><button class="w3-btn w3-bar-item" 
                        type="button" 
                        id="btnTest"
                        onClick={() => {
                            document.getElementById("hello").innerHTML = "Direct test succeeded";
                        }}>Test Event</button></p>
                    <p><button class="w3-btn w3-bar-item" type="button" id="btnErase">Clear</button></p>
                </div>
                <div class="w3-card w3-round">
                    <img src="/book.svg" alt="Book" width="100%"/>
                </div>
                <script src="/modules/test1.js"></script>
            </div>
        </body>
        </html>
    );
}

const app = express();
app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
    const html = `<!DOCTYPE html>${render(<Home title="😁 Hello" message="Apa kabar?"/>)}`;
    res.send(html);
})
.get("/book.png", async (req: Request, res: Response) => {
    const d = await Deno.readFile(Deno.cwd() + "/public/book.png");
    console.log(`req.url: ${req.url}`);
    res.type("image/png");
    res.send(d);
})
.get("/sub/test1", async (req: Request, res: Response) => {
    const d = await Deno.readTextFile(Deno.cwd() + "/public/modules/test1.js");
    res.type("text/html");
    res.send(`<div><strong>Isi test1.js:</strong><pre><code>${d}</code></pre></div><a href="/">Back Home</a>`);
})
.get("/modules", async (req: Request, res: Response) => {
    const d = await Deno.readTextFile(Deno.cwd() + "/public/modules/test1.js");
    res.type("text/javascript");
    res.send(d);
})
.get("/book.svg", async (req: Request, res: Response) => {
    const d = await Deno.readFile(Deno.cwd() + "/public/book.svg");
    console.log(`req.url: ${req.url}`);
    res.type("image/svg+xml");
    res.send(d);
})
.get("/images/*.png", async (req: Request, res: Response) => {
    const d = await Deno.readFile(Deno.cwd() + "/public" + req.path);
    res.type("image/png");
    res.send(d);
});

console.log("Listening to PORT 4000");
app.listen(3000);
