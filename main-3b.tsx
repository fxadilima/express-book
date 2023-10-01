/** @jsxImportSource https://esm.sh/preact */
import express from "https://esm.sh/v132/express@4.18.2";
//import serveStatic from 'https://esm.sh/serve-static@1.15.0';
import renderToString from "https://esm.sh/v132/preact-render-to-string@6.2.1/src/index.js";

const PORT = 4000;
const app = express();
//app.use("/modules", express.static(Deno.cwd() + "/public"));
//app.use(logger());

//app.use(serveStatic(Deno.cwd() + "/public"));

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
            <main class="w3-main w3-padding-32">
                <div class="w3-content w3-card-4 w3-round-large" style="width:50%;">
                    <header class="w3-container">
                        <h1>{props.title}</h1>
                        <p>{props.message}</p>
                    </header>
                    <div class="w3-panel w3-black" id="hello"></div>
                    <div class="w3-container w3-card">
                        <img src="/book.svg" alt="Book SVG Image" width="100%"/>
                    </div>
                </div>
            </main>
            <script src="/modules/test1.js"></script>
        </body>
        </html>
    );
}


app.get("/", (req: Request, res: Response) => {
    res.type("text/html");
    res.send("<!doctype html>\n" + renderToString(<Home title="😁 Hello" message="Apa kabar?"/>));
})
.get("/modules/*.js", async (req: Request, res: Response) => {
    const txt = await Deno.readTextFile(Deno.cwd() + "/public/" + req.url);
    res.type("text/javascript");
    res.send(txt);
})
.get("/book.svg", async (req, res) => {
    const img = await Deno.readFile("./public/book.svg");
    res.type("image/svg+xml");
    res.send(img);
})
.get("/book.png", async (req, res) => {
    const img = await Deno.readFile("./public/book.png");
    res.type("image/png");
    res.send(img);
});

console.log(`Listening to port: ${PORT}`);
app.listen(PORT);
