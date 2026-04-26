/* script.js */

/* script.js */

async function checkNews(){

    let input = document.getElementById("newsInput").value.trim();
    let result = document.getElementById("result");

    if(input === ""){
        result.innerHTML = "⚠️ Please enter a news claim.";
        result.style.color = "orange";
        return;
    }

    result.innerHTML = "🔍 Verifying from multiple sources...";
    result.style.color = "black";

    let newsKey = "YOUR_NEWSAPI_KEY";
    let factKey = "YOUR_GOOGLE_FACTCHECK_KEY";

    try{

        /* NEWS API */
        let newsURL =
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(input)}&language=en&pageSize=5&apiKey=${newsKey}`;

        let newsRes = await fetch(newsURL);
        let newsData = await newsRes.json();

        /* FACT CHECK API */
        let factURL =
        `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(input)}&key=${factKey}`;

        let factRes = await fetch(factURL);
        let factData = await factRes.json();

        let newsCount = newsData.articles ? newsData.articles.length : 0;
        let factCount = factData.claims ? factData.claims.length : 0;

        let confidence = 20;

        if(newsCount >= 3) confidence += 40;
        else if(newsCount >= 1) confidence += 20;

        if(factCount >= 1) confidence += 40;

        if(confidence > 100) confidence = 100;

        /* Final Decision */

        if(confidence >= 75){

            let title = newsCount > 0 ? newsData.articles[0].title : "Trusted sources found";

            result.innerHTML =
            `✅ VERIFIED CLAIM<br>
            Confidence: ${confidence}%<br><br>
            📰 ${title}<br>
            Sources Found: ${newsCount + factCount}`;

            result.style.color = "green";

        }
        else if(confidence >= 45){

            result.innerHTML =
            `⚠️ PARTIALLY VERIFIED<br>
            Confidence: ${confidence}%<br>
            Some sources mention this claim.`;

            result.style.color = "orange";

        }
        else{

            result.innerHTML =
            `❌ UNVERIFIED / POSSIBLY FALSE<br>
            Confidence: ${confidence}%<br>
            No strong evidence found.`;

            result.style.color = "red";
        }

    }
    catch(error){

        result.innerHTML =
        "⚠️ Error fetching sources. Check API keys.";

        result.style.color = "orange";
    }
}
