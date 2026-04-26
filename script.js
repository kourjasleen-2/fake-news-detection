/* FINAL script.js
   Uses GNews API
   GitHub Pages Friendly
*/

async function checkNews() {

    let input = document.getElementById("newsInput").value.trim();
    let result = document.getElementById("result");

    if (input === "") {
        result.innerHTML = "⚠️ Please enter a news claim.";
        result.style.color = "orange";
        return;
    }

    result.innerHTML = "🔍 Checking live news sources...";
    result.style.color = "black";

    /* YOUR GNEWS API KEY */
    let apiKey = "110ec0eecf1aacb8e7d51508346083be";

    /* Clean Search Query */
    let searchQuery = input
        .replace(/is|are|was|were|now|the|a|an|in|on|at|to|of/gi, "")
        .replace(/\s+/g, " ")
        .trim();

    let url =
    `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=en&max=5&apikey=${apiKey}`;

    try {

        let response = await fetch(url);
        let data = await response.json();

        /* Error Handling */
        if (data.errors) {
            result.innerHTML =
            "⚠️ API Error: " + data.errors[0];
            result.style.color = "orange";
            return;
        }

        let count = data.articles ? data.articles.length : 0;

        if (count === 0) {

            result.innerHTML =
            `⚪ No clear confirmation found.<br>
            Confidence: 20%<br>
            No matching reports found.`;

            result.style.color = "gray";
            return;
        }

        /* Headlines */
        let headlines = "";

        for (let i = 0; i < Math.min(3, count); i++) {

            headlines +=
            (i + 1) + ". " +
            data.articles[i].title +
            "<br>";
        }

        /* Confidence */
        let confidence = 30;

        if (count >= 1) confidence += 20;
        if (count >= 3) confidence += 20;
        if (count >= 5) confidence += 15;

        if (confidence > 95) confidence = 95;

        /* Final Result */

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

    } catch(error) {

        result.innerHTML =
        "⚠️ Unable to fetch news. Check API key or internet.";

        result.style.color = "orange";
    }
}
