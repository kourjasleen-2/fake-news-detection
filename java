/* script.js */

async function checkNews() {

    let input = document.getElementById("newsInput").value.trim();
    let result = document.getElementById("result");

    if(input === ""){
        result.innerHTML = "⚠️ Please enter a headline.";
        result.style.color = "orange";
        return;
    }

    result.innerHTML = "🔍 Checking real news sources...";
    result.style.color = "black";

    let apiKey = "YOUR_API_KEY_HERE";

    let url =
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(input)}&language=en&sortBy=publishedAt&pageSize=3&apiKey=${apiKey}`;

    try{

        let response = await fetch(url);
        let data = await response.json();

        if(data.articles && data.articles.length > 0){

            let article = data.articles[0];

            result.innerHTML =
            `✅ Real News Found <br><br>
            📰 ${article.title}<br>
            🌐 Source: ${article.source.name}<br>
            📅 Published: ${article.publishedAt.substring(0,10)}`;

            result.style.color = "green";

        }else{

            result.innerHTML =
            `❌ No trusted source found.<br>
            Possible fake / unverified news.`;

            result.style.color = "red";
        }

    }catch(error){

        result.innerHTML =
        "⚠️ Error fetching news. Check API key.";

        result.style.color = "orange";
    }
}
