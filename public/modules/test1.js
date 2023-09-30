

document.getElementById("btnTest").addEventListener("click", () => {
    document.getElementById("hello").innerHTML = "<p>Hi, there! 😎<br/>This is a test...</p>";
    document.getElementById("hello").style.display = "block";
});

document.getElementById("btnErase").addEventListener("click", () => {
    document.getElementById("hello").style.display = "none";
});
