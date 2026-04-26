/* FINAL script.js */

async function checkNews() {

    let input = document.getElementById("newsInput").value.trim();
    let result = document.getElementById("result");

    if (input === "") {
        result.innerHTML = "⚠️ Please enter a news claim.";
        result.style.color = "orange";
        return;
    }

    result.innerHTML = "🔍 Checking trusted news sources...";
    result.style.color = "black";

    /* YOUR NEWSAPI KEY ADDED */
    let newsKey = "44727397302343d79f37ed0f140c26af";

    /* Better search query */
    let searchQuery = input
        .replace(/is|are|was|were|now|the|a|an|in|on|at|to|of/gi, "")
        .replace(/\s+/g, " ")
        .trim();

    let url =
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&language=en&pageSize=5&sortBy=publishedAt&apiKey=${newsKey}`;

    try {

        let response = await fetch(url);
        let data = await response.json();

        /* API error handling */
        if (data.status === "error") {
            result.innerHTML =
            "⚠️ API Error: " + data.message;
            result.style.color = "orange";
            return;
        }

        let count = data.articles ? data.articles.length : 0;

        if (count === 0) {
            result.innerHTML =
            `⚪ No clear confirmation found.<br>
            Confidence: 20%<br>
            No matching trusted headlines found.`;

            result.style.color = "gray";
            return;
        }

        /* Build top headlines */
        let headlines = "";

        for (let i = 0; i < Math.min(3, count); i++) {
            headlines +=
            (i + 1) + ". " +
            data.articles[i].title +
            "<br>";
        }

        /* Confidence logic */
        let confidence = 30;

        if (count >= 1) confidence += 20;
        if (count >= 3) confidence += 20;
        if (count >= 5) confidence += 15;

        if (confidence > 95) confidence = 95;

        /* Final output */

        if (confidence >= 70) {

            result.innerHTML =
            `✅ Supported by current reports<br>
            Confidence: ${confidence}%<br><br>
            Related Headlines:<br>${headlines}`;

            result.style.color = "green";

        } else {

            result.innerHTML =
            `⚠️ Needs confirmation<br>
            Confidence: ${confidence}%<br><br>
            Related Headlines:<br>${headlines}`;

            result.style.color = "orange";
        }

    } catch (error) {

        result.innerHTML =
        "⚠️ Unable to fetch news. Check internet or API key.";

        result.style.color = "orange";
    }
}
